const ChainUtil = require('../chain-util')
const { DIFFICULTY, MINE_RATE } = require('../config')

class Block{
    constructor(timestamp, lastHash, hash, data, nonce, difficulty){
        this.timestamp = timestamp
        this.lastHash = lastHash
        this.hash = hash
        this.data = data
        this.nonce = nonce
        this.difficulty = difficulty || DIFFICULTY
    }

    toString(){
        return `Block -
        TimeStamp : ${this.timestamp}
        Last Hash : ${this.lastHash}
        Hash      : ${this.hash}
        Nonce     : ${this.nonce}
        Difficulty: ${this.difficulty}
        Data      : ${this.data}`
    }

    static genesis(){
        return new this('Genesis time', '------', 'bu3jawd67f', [], 0)
    }

    static mineBlock(lastBlock, data){
        const lastHash = lastBlock.hash

        let { difficulty } = lastBlock

        let hash, timestamp
        let nonce = 0

        do{
            nonce++
            timestamp = Date.now()
            difficulty = this.adjustDifficulty(lastBlock, timestamp)
            hash = Block.hash(timestamp, lastHash, data, nonce, difficulty)
        }while(hash.substring(0, difficulty) !== '0'.repeat(difficulty))

        return new this(timestamp, lastHash, hash, data, nonce, difficulty);
    }

    static hash(timestamp, lastHash, data, nonce, difficulty){
        return ChainUtil.hash(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString()
    }

    static blockHash(block){
        const { timestamp, lastHash, data, nonce, difficulty } = block;
        return this.hash(timestamp, lastHash, data, nonce, difficulty);
    }

    static adjustDifficulty(lastBlock, currentTime){
        let { difficulty } = lastBlock
        difficulty = currentTime - lastBlock.timestamp < MINE_RATE ? difficulty + 1 : difficulty - 1
        return difficulty
    }
}

module.exports = Block