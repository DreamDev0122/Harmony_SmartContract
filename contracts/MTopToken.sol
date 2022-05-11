// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MTopToken is ERC20, Ownable {
    mapping(address => bool) private controllers;

    modifier onlyController() {
        require(controllers[_msgSender()], "Caller is not the minter");
        _;
    }

    constructor() ERC20("MTop Token", "MTop") {
        _mint(msg.sender, 10**19 * 10**decimals());
        controllers[_msgSender()] = true;
    }

    function _mint(address to, uint256 amount) internal override(ERC20) {
        super._mint(to, amount);
    }

    function mint(address to, uint256 amount) external onlyController {
        _mint(to, amount);
    }

    function _burn(address account, uint256 amount) internal override(ERC20) {
        super._burn(account, amount);
    }

    function burn(address account, uint256 amount) external {
        _burn(account, amount);
    }

    function addController(address _controller) external onlyOwner {
        controllers[_controller] = true;
    }
}
