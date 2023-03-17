const Blockchain = require('../blockchain')
const Block = require('../block')

describe('Blockchain', () => {
    let bc, bc2;

    beforeEach(() => {
        bc = new Blockchain()
        bc2 = new Blockchain()
    })

    it('Starts with genesis block', () => {
        expect(bc.chain[0]).toEqual(Block.genesis())
    })

    it('Adds a new block', () =>{
        const data = 'codecove'
        bc.addBlock(data)

        expect(bc.chain[bc.chain.length-1].data).toEqual(data)
    })

    it('validates a valid chain', () => {
        bc2.addBlock('cove')
        expect(bc.isValidChain(bc2.chain)).toBe(true)
    })

    it('invalidates a chain with a corrupt genesis block', () => {
        bc2.chain[0].data = 'kachra'
        expect(bc.isValidChain(bc2.chain)).toBe(false)
    })

    it('invalidates a corrupt chain', () => {
        bc2.addBlock('cove')
        bc2.chain[1].data = 'kachra'
        expect(bc.isValidChain(bc2.chain)).toBe(false)
    })

    it('replaces the chain with a valid chain', () => {
        bc2.addBlock('codecove')
        bc.replaceChain(bc2.chain)

        expect(bc.chain).toEqual(bc2.chain)
    })

    it('does not replace the chain with less than or equal length', () => {
        bc.addBlock('chillcove')
        bc.replaceChain(bc2.chain)

        expect(bc.chain).not.toEqual(bc2.chain)
    })
})