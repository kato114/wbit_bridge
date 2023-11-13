// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import "./interfaces/IVBridgeERC20.sol";
import "./interfaces/IWrappedNativeToken.sol";

contract VBridgeRouter is Initializable, OwnableUpgradeable {
    using SafeERC20Upgradeable for IERC20Upgradeable;

    address public wNativeToken;

    event LogRouterSwapInEVM(address token, address from, address to, uint amount, uint fromChainID, uint toChainID, uint form);

    function initialize (address _wNativeToken) public initializer{
        require(_wNativeToken != address(0), "VBridgeRouter: Wrapped native token address can't be zero.");
        __Ownable_init();
        wNativeToken = _wNativeToken;
    }

    receive() external payable {
        assert(msg.sender == wNativeToken); // only accept Native via fallback from the wNativeToken contract
    }

    function chainID() public view returns (uint) {
        return block.chainid;
    }

    function changeRouter(address[] memory tokenList, address newRouter) external onlyOwner returns (bool) {
        for(uint i; i < tokenList.length; i++) {
            IVBridgeERC20(tokenList[i]).removeMinter(address(this));
            IVBridgeERC20(tokenList[i]).addMinter(newRouter);
            IVBridgeERC20(tokenList[i]).transferOwnership(newRouter);
        }
        return true;
    }

    function addMinter(address token, address _minter) external onlyOwner returns (bool) {
        IVBridgeERC20(token).addMinter(_minter);
        return true;
    }

    function changeOrgToken(address token, address _orgtoken) external onlyOwner returns (bool) {
        IVBridgeERC20(token).changeOrgToken(_orgtoken);
        return true;
    }

    function removeMinter(address token, address _minter) external onlyOwner returns (bool) {
        IVBridgeERC20(token).removeMinter(_minter);
        return true;
    }

    function swapInNativeToken(address token, address to, uint toChainID) external payable returns (bool) {
        require(IVBridgeERC20(token).getOrgToken() == wNativeToken, "VBridgeRouter: Original token is not native token.");
        
        IWrappedNativeToken(wNativeToken).deposit{value: msg.value}();
        assert(IWrappedNativeToken(wNativeToken).transfer(token, msg.value));
        
        emit LogRouterSwapInEVM(token, msg.sender, to, msg.value, block.chainid, toChainID, 0);
        return true;
    }

    function swapInERC20Token(address token, address to, uint amount, uint toChainID) external returns (bool) {
        require(IVBridgeERC20(token).getOrgToken() != address(0), "VBridgeRouter: Have to call swapInOBToken function.");
        
        IERC20Upgradeable(IVBridgeERC20(token).getOrgToken()).transferFrom(msg.sender, token, amount);

        emit LogRouterSwapInEVM(token, msg.sender, to, amount, block.chainid, toChainID, 1);
        return true;
    }

    function swapInOBToken(address token, address to, uint amount, uint toChainID) external returns (bool) {
        IVBridgeERC20(token).burn(msg.sender, amount);

        emit LogRouterSwapInEVM(token, msg.sender, to, amount, block.chainid, toChainID, 2);        
        return true;
    }

    function swapOut(uint uID, address token, address to, uint256 amount) external onlyOwner returns (bool) {
        if(IVBridgeERC20(token).getOrgToken() == wNativeToken) {
            IVBridgeERC20(token).swapOut(uID, to, amount, 0);
        } else {
            IVBridgeERC20(token).swapOut(uID, to, amount, 1);
        }

        return true;
    }

    function mintOBToken(address token, address to, uint256 amount) external onlyOwner returns (bool) {
        IVBridgeERC20(token).mint(to, amount);
        return true;
    }

    function burnOBToken(address token, address from, uint256 amount) external onlyOwner returns (bool) {
        IVBridgeERC20(token).burn(from, amount);
        return true;
    }
}