// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0; //Have to declare wich version wwe are using

contract Transactions {
    uint256 transactionCount; // number of transactions

    event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp, string keyword); // function that imit our call later on

    struct transferStruct {
        address from;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword; 
    } 

    // define array of structs

    transferStruct[] transactions;
    
    function addToBlockChain(address payable receiver, uint amount, string memory message, string memory keyword ) public { // message: passing data to blockchain
        transactionCount += 1; // increment the counter

        transactions.push(transferStruct({from: msg.sender, receiver: receiver, amount: amount, message: message, timestamp: block.timestamp, keyword: keyword})); // push to the array and store the transations

        emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword); // emit the event and transfer the amount
    }   

    function getallTransactions() public view returns(transferStruct[] memory) {
        return transactions;
    }    

    function getTransactionsCount() public view returns (uint256) {
        return transactionCount;
    }   

}