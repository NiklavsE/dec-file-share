import constants from 'core/types'
import Web3      from 'web3'
import contract    from 'truffle-contract'
import FileContract from '../../../build/contracts/FileContract.json'

export const setProvider = () => async (dispatch) => {
  if (window.ethereum) {
    const { ethereum } = window
    const web3Provider = new Web3(ethereum)

    const FileStorageContract = contract(FileContract)
    FileStorageContract.setProvider(web3Provider.currentProvider)
    const storage = await FileStorageContract.deployed()
    await ethereum.enable()

    dispatch({
      type: constants.SET_PROVIDER,
      web3Provider,
      storage
    })
  }
}
