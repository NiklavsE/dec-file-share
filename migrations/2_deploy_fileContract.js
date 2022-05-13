const FileContract = artifacts.require('./FileContract.sol')

module.exports = function(deployer) {
  deployer.deploy(FileContract)
}