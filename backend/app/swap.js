var express = require("express");
var router = express.Router();

var Web3 = require("web3");

var database = require("./database.js");

const keyList = require("../config/private.json");
const chainList = require("../config/chain.json");
const tokenList = require("../config/token.json");
const routerABI = require("../abis/OBridgeRounter.json");

router.post("/register/:cid/:tx_hash", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "https://www.vbitbridges.com/");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  console.log("start");
  let cid = req.params.cid;
  let tx_hash = req.params.tx_hash;

  console.log("cid: ", cid);
  console.log("tx_hash", tx_hash);


  if (chainList[cid] == null) {
    res.send({ status: "failed", msg: "register: wrong chain id" });
    console.log("wrong chain ID");

    return;
  }



  let web3 = new Web3(chainList[cid]["rpcUrl"]);
  // console.log("web3: ", web3);
  console.log("web3: ", chainList[cid]["rpcUrl"]);


  let rows = await database.select("transactions", {
    fChainID: cid,
    fTxnID: tx_hash,
  });

  console.log("rows: ", rows);


  if (rows.status == "failed") {
    res.send({ status: "failed", msg: "register: db error" });
  console.log("register: db error: ");

  } else if (rows.data.length < 0) {
    res.send({ status: "failed", msg: "register: registered transaction" });
  console.log("register: registered transaction");
    
  } else {
    console.log("------------");
    try {
      web3.eth.getTransactionReceipt(tx_hash, function (error, tx_info) {
        if (error != null) {
          console.log("tx_hash : ", tx_hash);
          res.send({
            status: "failed",
            msg: "register: tx hash is not correct 1",
          });
          console.log("register: tx hash is not correct 1");
          return;
        }

        if (
          tx_info.to.toLowerCase() !=
            chainList[cid]["routerAddress"].toLowerCase() ||
          tx_info.status === false
        ) {
          console.log("tx_info; ", tx_info.to.toLowerCase());
          console.log("chainList; ", chainList[cid]["routerAddress"].toLowerCase());
          res.send({
            status: "failed",
            msg: "register: tx hash is not correct 2",
          });
          return;
        }

        let fRouterContract = new web3.eth.Contract(
          routerABI,
          chainList[cid]["routerAddress"]
        );

        fRouterContract
          .getPastEvents("LogRouterSwapInEVM", {
            fromBlock: tx_info.blockNumber,
            toBlock: tx_info.blockNumber,
          })
          .then(async (events) => {
            let event = events.filter((event) => {
              return event.transactionHash === tx_hash;
            });

            if (event.length <= 0) {
              res.send({
                status: "failed",
                msg: "register: tx hash is not correct",
              });
              return;
            }

            let tChainToken = null;
            for (let key in tokenList) {
              if (
                tokenList[key][event[0]["returnValues"]["4"]] ==
                event[0]["returnValues"]["0"]
              ) {
                tChainToken = tokenList[key][event[0]["returnValues"]["5"]];
                console.log("tChainToken: ", tChainToken);
                break;
              }
            }

            console.log("tChainToken1: ", tChainToken);


            if (tChainToken === null || tChainToken === undefined) {
              res.send({
                status: "failed",
                msg: "register: swap to the tochain is not possible",
              });
              return;
            }

            let { status, uID } = await database.insertTransaction([
              [
                event[0]["returnValues"]["0"], // fchain any token contract address
                event[0]["returnValues"]["1"], // from address
                event[0]["returnValues"]["2"], // to address
                event[0]["returnValues"]["3"], // amount
                event[0]["returnValues"]["4"], // fchain id
                event[0]["returnValues"]["5"], // tchain id
                tx_hash, // txn hash
                event[0]["returnValues"]["6"], // form
              ],
            ]);

            if (status === "failed") {
              res.send({
                status: "failed",
                msg: "register: insertion failed",
              });
              return;
            }

            try {
              web3.setProvider(
                chainList[event[0]["returnValues"]["5"]]["rpcUrl"]
              );

              let account = web3.eth.accounts.privateKeyToAccount(
                keyList[event[0]["returnValues"]["5"]]
              );
              let tRouterContract = new web3.eth.Contract(
                routerABI,
                chainList[event[0]["returnValues"]["5"]]["routerAddress"]
              );

              const functionCall = tRouterContract.methods
                .swapOut(
                  uID,
                  tChainToken,
                  event[0]["returnValues"]["2"],
                  event[0]["returnValues"]["3"]
                )
                .encodeABI();
              console.log("functionCall = ", functionCall);

              const nonce = web3.eth.getTransactionCount(account.address);
              const gasPrice = await web3.eth.getGasPrice();
              const transactionBody = {
                to: chainList[event[0]["returnValues"]["5"]]["routerAddress"],
                nonce: nonce,
                data: functionCall,
                gas: 100000,
                gasPrice: gasPrice,
              };

              let signedTransaction = await web3.eth.accounts.signTransaction(
                transactionBody,
                keyList[event[0]["returnValues"]["5"]]
              );
              fulfillTx = await web3.eth.sendSignedTransaction(
                signedTransaction.rawTransaction
              );

              console.log("signedTransaction = ", signedTransaction);


              if (fulfillTx.status === true) {
                database.updateTransaction(uID, {
                  tToken: tChainToken,
                  tTxnID: signedTransaction.transactionHash,
                  status: 1,
                });

                res.send({
                  status: "success",
                  chainId: event[0]["returnValues"]["5"],
                  hash: signedTransaction.transactionHash,
                  msg: "swap completed",
                });

              console.log("swap completed");

                return;
              }
            } catch (error) {
              console.log(error);
            }

            try {
              web3.setProvider(chainList[cid]["rpcUrl"]);
              let account = web3.eth.accounts.privateKeyToAccount(keyList[cid]);

              const functionCall = fRouterContract.methods
                .mintOBToken(
                  event[0]["returnValues"]["0"],
                  event[0]["returnValues"]["2"],
                  event[0]["returnValues"]["3"]
                )
                .encodeABI();
              const nonce = web3.eth.getTransactionCount(account.address);
              const gasPrice = await web3.eth.getGasPrice();
              const transactionBody = {
                to: chainList[cid]["routerAddress"],
                nonce: nonce,
                data: functionCall,
                gas: 100000,
                gasPrice: gasPrice,
              };

              let signedTransaction = await web3.eth.accounts.signTransaction(
                transactionBody,
                keyList[cid]
              );
              fulfillTx = await web3.eth.sendSignedTransaction(
                signedTransaction.rawTransaction
              );

              if (fulfillTx.status === true) {
                database.updateTransaction(uID, {
                  tToken: tChainToken,
                  tTxnID: signedTransaction.transactionHash,
                  status: 2,
                });
              }

              res.send({
                status: "success",
                chainId: event[0]["returnValues"]["4"],
                hash: signedTransaction.transactionHash,
                msg: "anytoken minted",
              });
              return;
            } catch (error) {
              console.log(error);
            }
          });
      });
    } catch (error) {
      console.log(error);
      res.send({ status: "failed" });
    }
  }
});

router.get("/status/:chainID/:txnID", function (req, res) {
  res.json({res: true})
});

//export this router to use in our index.js
module.exports = router;
