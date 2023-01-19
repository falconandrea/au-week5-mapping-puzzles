const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers')
const { assert } = require('chai')

describe('Game4', function () {
  async function deployContractAndSetVariables () {
    const Game = await ethers.getContractFactory('Game4')
    const game = await Game.deploy()

    const [owner] = await ethers.getSigners()

    return { game, owner }
  }
  it('should be a winner', async function () {
    const { game, owner } = await loadFixture(deployContractAndSetVariables)

    // nested mappings are rough :}
    await game.write(owner.getAddress())

    await game.win(owner.getAddress())

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game')
  })
})
