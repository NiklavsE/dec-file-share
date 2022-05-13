import constants from 'core/types'
import contract    from 'truffle-contract'
import { create } from 'ipfs-http-client'
import { unselectAll } from 'core/actions/actions-fileTable'
// import { ipfs } from '../libs/lib-ipfs'


const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

export const getSharedFiles = () => async (dispatch, getState) => {
  dispatch({ type: constants.GET_SHARED_FILES })

  const { web3Provider } = getState().provider
  const { storage } = getState().provider

  const fileCount = await storage.getSharedFileCount.call(
    web3Provider.currentProvider.selectedAddress,
    {
      from: web3Provider.currentProvider.selectedAddress
    }
  )

  const files = []

  for (let index = 0; index < fileCount.toNumber(); index += 1) {
    files.push(storage.getSharedFile.call(
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

  dispatch({ type: constants.GET_SHARED_FILES_SUCCESS, payload: parsedFiles })
}

export const shareFiles = adress => async (dispatch, getState) => {
  dispatch({ type: constants.SHARE_FILE })

  const { selectedFiles } = getState().fileTable
  const { web3Provider } = getState().provider
  const { storage } = getState().provider

  const sharedFiles = []
  for (let index = 0; index < selectedFiles.length; index += 1) {
    sharedFiles.push(storage.shareFile(
      adress,
      selectedFiles[index],
      {
        from: web3Provider.currentProvider.selectedAddress
      }
    ))
  }

  await Promise.all(sharedFiles)

  dispatch(getSharedFiles())

  dispatch({
    type: constants.SHARE_FILE_SUCCESS
  })

  // unselect all files from file table
  dispatch(unselectAll())
}
