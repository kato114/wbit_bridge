var express = require("express");
var app = express();
var cors = require("cors");
var swap = require("./app/swap.js");
var history = require("./app/history.js");
var config = require("./app/config.js");

app.use(cors({
    origin: '*',
    credentials: true,
    exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
app.use("/swap", swap);
app.use("/conf", config);
app.use("/history", history);

app.listen(3000);
