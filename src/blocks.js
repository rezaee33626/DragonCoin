const SHA256 = require('crypto-js/sha256');

class Blocks {
  constructor(timestamp, transactions, previousHash = '') {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.nonce = 0;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(this.timestamp + this.previousHash + JSON.stringify(this.transactions) + this.nonce).toString(); 
  }

  mineBlock(difficulty) {
    while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    console.log("Block mined: " + this.hash); 
  }

  hasValidTransactions(){
    for(const tx of this.transactions){
      if(!tx.isValid()){
        return false;
      }
    }

    return true;
  }
} 

module.exports.Block = Blocks;