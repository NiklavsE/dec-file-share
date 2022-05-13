import constants from 'core/types'
import contract    from 'truffle-contract'
import { create } from 'ipfs-http-client'
// import { ipfs } from '../libs/lib-ipfs'


const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

export const uploadFile = (
  buffer,
  name,
) => async (dispatch, getState) => {
  dispatch({ type: constants.UPLOAD_FILE })
  const { web3Provider } = getState().provider
  const { storage } = getState().provider

  const result = await ipfs.add(buffer)
  const ipfsHash = result.path

  const txReceipt = await storage.uploadFile(
    ipfsHash,
    name,
    {
      from: web3Provider.currentProvider.selectedAddress
    }
  )

  const {
    blockHash,
    blockNumber,
    transactionHash,
    transactionIndex,
    cumulativeGasUsed,
    gasUsed
  } = txReceipt.receipt

  const fileCount = await storage.getFileCount.call(
    web3Provider.currentProvider.selectedAddress,
    {
      from: web3Provider.currentProvider.selectedAddress
    }
  )

  const newFile = {
    index: fileCount,
    ipfsHash,
    name,
    uploadedOn: 'Pending',
    blockHash,
    blockNumber,
    transactionHash,
    transactionIndex,
    cumulativeGasUsed,
    gasUsed
  }

  dispatch({
    type: constants.UPLOAD_FILE_SUCCESS,
    payload: newFile
  })
}

export const getFiles = () => async (dispatch, getState) => {
  dispatch({ type: constants.GET_FILES })

  const { web3Provider } = getState().provider
  const { storage } = getState().provider

  const fileCount = await storage.getFileCount.call(
    web3Provider.currentProvider.selectedAddress,
    {
      from: web3Provider.currentProvider.selectedAddress
    }
  )

  const files = []

  for (let index = 0; index < fileCount.toNumber(); index += 1) {
    files.push(storage.getFile.call(
      web3Provider.currentProvider.selectedAddress,
      index,
      {
        from: web3Provider.currentProvider.selectedAddress
      }
    ))
  }

  const fileList = await Promise.all(files)

  const parsedFiles = fileList.map((file, index) => {
    return {
      index,
      ipfsHash: file[0],
      name: file[1],
      description: file[2],
      uploadedOn: file[3]
    }
  })

  dispatch({ type: constants.GET_FILES_SUCCESS, payload: parsedFiles })
}
