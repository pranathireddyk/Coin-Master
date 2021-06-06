const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.noice = 0;
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.noice).toString();
    }

    mineBlock(difficulty){
        while(this.hash.substring(0,difficulty) !== Array(difficulty + 1).join("0")){
            this.noice++;
            this.hash = this.calculateHash();
        }

        console.log("Block mined: " + this.hash);
    }
}



class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
    }

    createGenesisBlock(){
        return new Block(0, "01/01/2017", "Genesis block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1]
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateHash())
            {
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash)
            {
                return false;
            }
        }
        return true;
    }
}

let PNR_Coin = new Blockchain();
console.log('Mining block 1...');
PNR_Coin.addBlock(new Block(1, "10/07/2017", { amount: 4}));
console.log('Mining block 2...');
PNR_Coin.addBlock(new Block(2, "12/07/2017", { amount: 10}));
console.log(JSON.stringify(PNR_Coin, null, 4));