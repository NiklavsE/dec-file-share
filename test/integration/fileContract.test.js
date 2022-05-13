const FileContract = artifacts.require('FileContract.sol')
const truffleAssert = require('truffle-assertions')
const { assert } = require('chai')

// test suite
contract('FileContract', (accounts) => {
  // Contract instance
  let fileContractInstance

  // A few owner accounts
  const owner = accounts[0]
  const bob = accounts[1]
  const sally = accounts[2]
  const randomDude = accounts[3]
  const randomDude2 = accounts[4]
  const randomDude3 = accounts[5]
  const randomDude4 = accounts[6]

  const emptyAddress = '0x0000000000000000000000000000000000000000'

  // Imaage 1 details
  const ipfsHash1 = 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t'
  const name1 = 'Columbia Deep.pdf'

  // Imaage 2 details
  const ipfsHash2 = 'QmWzQSuPMSa6XcBZKpEjPHPUZN2NjB3YrhJHTsV4X3bv1t'
  const name2 = 'Palacar Caves.txt'

  // Create a new instance of the contract before each test
  beforeEach('setup contract for each test', async () => {
    fileContractInstance = await FileContract.deployed()
  })

  // It should store an file on the blockchain
  it('should store an file', async () => {
    const success = await fileContractInstance.uploadFile.call(
      ipfsHash1,
      name1,
    )
    assert.equal(success, true, 'it returns true')
  })

  it('should emit a LogFileUploaded event when storing an file', async () => {
    const tx = await fileContractInstance.uploadFile(
      ipfsHash1,
      name1,
    )

    truffleAssert.eventEmitted(tx, 'LogFileUploaded', (ev) => {
      return (
        ev._owner === owner &&
        ev._ipfsHash === ipfsHash1 &&
        ev._name === name1 &&
        ev._uploadedOn.toNumber() !== 0
      )
    })
  })

  // It should return details of an file previously stored on the blockchain
  it('should return file details', async () => {
    await fileContractInstance.uploadFile(
      ipfsHash1,
      name1,
      {
        from: owner
      }
    )

    const file = await fileContractInstance.getFile(owner, 0)

    assert.equal(
      file[0],
      ipfsHash1,
      'the IPFS hash does not match the expected value'
    )
    assert.equal(
      file[1],
      name1,
      'the title does not match the expected value'
    )

    assert.notEqual(file[3], 0, 'the uploadedOn date should be non-zero')
  })

  // It should return the correct file count
  it('should return file count', async () => {
    await fileContractInstance.uploadFile(
      ipfsHash1,
      name1,
      {
        from: randomDude
      }
    )

    await fileContractInstance.uploadFile(
      ipfsHash2,
      name2,
      {
        from: randomDude
      }
    )

    const count = await fileContractInstance.getFileCount(randomDude)

    assert.equal(count.toNumber(), 2, 'file count should be 2')
  })

  // It should store files for any owner
  it('should store files for any number of owners', async () => {
    // Upload one file for randomDude2
    await fileContractInstance.uploadFile(
      ipfsHash1,
      name1,
      {
        from: randomDude2
      }
    )

    // Upload two files for bob
    await fileContractInstance.uploadFile(
      ipfsHash1,
      name1,
      {
        from: bob
      }
    )

    await fileContractInstance.uploadFile(
      ipfsHash2,
      name2,
      {
        from: bob
      }
    )

    // Upload one file for sally
    await fileContractInstance.uploadFile(
      ipfsHash1,
      name1,
      {
        from: sally
      }
    )

    assert.equal(
      (await fileContractInstance.getFileCount(randomDude2)).toNumber(),
      1,
      'file count should be 1 for primary owner'
    )

    assert.equal(
      (await fileContractInstance.getFileCount(bob)).toNumber(),
      2,
      'file count should be 2 for bob'
    )

    assert.equal(
      (await fileContractInstance.getFileCount(sally)).toNumber(),
      1,
      'file count should be 1 for sally'
    )
  })

  // It should require a valid IPFS hash
  it('should require a valid IPFS hash when uploading a file', async () => {
    const badIPFSHash = ipfsHash1.slice(0, ipfsHash1.length / 2)

    try {
      await fileContractInstance.uploadFile('', name1, {
        from: owner
      })
      assert.fail('Expected throw not received')
    } catch (error) {
      assert(
        error.message.indexOf('revert') >= 0,
        'error message must contain revert'
      )
    }

    try {
      await fileContractInstance.uploadFile(
        badIPFSHash,
        name1,
        {
          from: owner
        }
      )
      assert.fail('Expected throw not received')
    } catch (error) {
      assert(
        error.message.indexOf('revert') >= 0,
        'error message must contain revert'
      )
    }
  })

  // It should require a valid title where the length cannot be greater than 256
  it('should require a valid title when uploading a file', async () => {
    try {
      await fileContractInstance.uploadFile(
        ipfsHash1,
        '',
        {
          from: owner
        }
      )
      assert.fail('Expected throw not received')
    } catch (error) {
      assert(
        error.message.indexOf('revert') >= 0,
        'error message must contain revert'
      )
    }

    try {
      await fileContractInstance.uploadFile(
        ipfsHash1,
        'X'.repeat(257),
        {
          from: owner
        }
      )
      assert.fail('Expected throw not received')
    } catch (error) {
      assert(
        error.message.indexOf('revert') >= 0,
        'error message must contain revert'
      )
    }
  })

  // It should require an owner address when retriving the file count
  it('should require a valid address when retrieving file count', async () => {
    try {
      await fileContractInstance.getFileCount(emptyAddress)
      assert.fail('Expected throw not received')
    } catch (error) {
      assert(
        error.message.indexOf('revert') >= 0,
        'error message must contain revert'
      )
    }
  })

  it('should share a file to other account', async () => {
    await fileContractInstance.uploadFile(
      ipfsHash1,
      name1,
      {
        from: owner
      }
    )

    const success = await fileContractInstance.shareFile.call(randomDude3, 0)
    assert.equal(success, true, 'it returns true')
  })

  it('should emit a LogFileShared event when sharing an file', async () => {
    await fileContractInstance.uploadFile(
      ipfsHash1,
      name1,
      {
        from: owner
      }
    )

    const tx = await fileContractInstance.shareFile(
      randomDude4,
      0,
      {
        from: owner
      }
    )

    truffleAssert.eventEmitted(tx, 'LogFileShared', (ev) => {
      return (
        ev._owner === owner &&
        ev._receiver === randomDude4 &&
        ev._ipfsHash === ipfsHash1 &&
        ev._name === name1 &&
        ev._uploadedOn.toNumber() !== 0
      )
    })
  })

  it('should return shared file count', async () => {
    await fileContractInstance.uploadFile.call(
      ipfsHash1,
      name1,
    )

    await fileContractInstance.shareFile(
      randomDude3,
      0,
      {
        from: owner
      }
    )
    const count = await fileContractInstance.getSharedFileCount(randomDude3)
    assert.equal(count.toNumber(), 1, 'file count should be 1')
  })

  it('should get shared file', async () => {
    await fileContractInstance.uploadFile.call(
      ipfsHash1,
      name1
    )

    await fileContractInstance.shareFile(
      randomDude3,
      1,
      {
        from: owner
      }
    )

    const file = await fileContractInstance.getSharedFile(randomDude3, 1)

    assert.equal(
      file[0],
      ipfsHash1,
      'the IPFS hash does not match the expected value'
    )
    assert.equal(
      file[1],
      name1,
      'the title does not match the expected value'
    )
    assert.notEqual(file[3], 0, 'the uploadedOn date should be non-zero')
  })
})
