pragma solidity >=0.8.0 <0.9.0;

import "./DeedRepository.sol";
//SPDX-License-Identifier: MIT

contract AuctionRepository {
    Auction[] public auctions;
    DeedRepository deedRepository;

    mapping(uint => Auction) deedToAuction;

    struct Bid {
        address from;
        uint amount;
    }

    struct Auction {
        string name;
        address owner;
        uint deedId;
        uint auctionId;
        uint startingPrice;
        uint expiryDate;
    }

    modifier isApproved(address _deedAddress, uint _deedId) {
        deedRepository = DeedRepository(_deedAddress);
        require(deedRepository.getApproved(_deedId) == address(this), "Not Approved");
        _;
    }

    function createAuction(address _deedRepositoryAddress, string memory _name, address _owner,
        uint _deedId, uint _startingPrice, uint _expiryDurationSec)
    external isApproved(_deedRepositoryAddress, _deedId) {
        uint newAuctionId = auctions.length;
        Auction memory newAuction = Auction(_name, _owner, _deedId, newAuctionId,
            _startingPrice, block.timestamp + _expiryDurationSec);
        auctions[newAuctionId] = newAuction;
        deedToAuction[_deedId] = newAuction;
    }

    function balance() public view returns(uint) {
        return address(this).balance;
    }

    receive() external payable {

    }
}
