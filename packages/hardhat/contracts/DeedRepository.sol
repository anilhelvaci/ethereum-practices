pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT


contract DeedRepository {
    uint public test = 0;
    constructor() {

    }

    receive() external payable {

    }

    function sendEth(uint _amount) external payable {
        (bool sent, bytes memory data) = payable(address(this)).call{value: _amount}("");
        require(sent, "Failed to send Ether");
    }
}
