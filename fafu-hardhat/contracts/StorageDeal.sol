// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Simple Gnosis FVM storage deal event emitter
 * @dev Store the Piece CID & CID, and the DAO will make a payment tx in the same chain (not FVM), state actors will pick up and deploy on FVEM
 */
contract StorageDeal {

    struct INFO{
        string pcid;
        string cid;
        string provider;
        uint dealId;
    }

    mapping(address => INFO) daoDeals;
    event DealRequested(address dao, string pcid, string cid, string provider, uint dealId);
    /**
     * @dev Store Info in variable
     */
    function store(INFO memory _info) public payable {
        require(msg.value>0.0000001 ether, "Not enough fees!");
        daoDeals[msg.sender] = _info;
        emit DealRequested(msg.sender, _info.pcid, _info.cid, _info.provider, _info.dealId);
    }

    /**
     * @dev Return value 
     */
    function retrieve() public view returns (INFO memory){
        return daoDeals[msg.sender];
    }
}