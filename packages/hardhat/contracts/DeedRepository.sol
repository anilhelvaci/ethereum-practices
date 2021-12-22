pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract DeedRepository is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {
    }

    function registerItem() public returns (uint256) {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
//        _setTokenURI(newItemId, "tokenURI"); Deal with this later
        emit DeedRegistered(msg.sender, newItemId);
        return newItemId;
    }

    event DeedRegistered(address _by, uint256 _tokenId);
}
