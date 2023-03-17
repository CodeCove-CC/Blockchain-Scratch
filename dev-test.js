// const Block = require('./block');

// const block = new Block('4 Feb', '12hfgd4', 'iyga68awd', 'codecove', '69');
// console.log(block.toString());

// console.log(Block.genesis().toString());

// const minedBlock = Block.mineBlock(Block.genesis(), [1,2,3])
// console.log(minedBlock.toString())

// const Blockchain = require('./block_chain/blockchain')

// const bc = new Blockchain()

// for(let i=0;i<10;i++){
//     console.log(bc.addBlock(`codecove ${i}`).toString())
// }

const Wallet = require('./wallet')
const wallet = new Wallet()

console.log(wallet.toString())