import TextField from '@mui/material/TextField'
import { shareFiles } from 'core/actions/actions-sharedFiles'
import { InputModal } from 'components/Modals'
import web3 from 'web3'
import { useSelector, useDispatch } from 'react-redux'
import IosShareIcon from '@mui/icons-material/IosShare'
import React from 'react'
import Button from 'components/Button'
import { styles } from './styles.scss'


const FileShare = () => {
  const dispatch = useDispatch()
  const selectedFiles = useSelector(state => state.fileTable.selectedFiles)
  const [confirmationModal, setConfirmationModel] = React.useState(false)
  const [address, setAddress] = React.useState('')
  const [error, setError] = React.useState(false)

  const handleConfirmation = () => {
    if (address === '' || web3.utils.isAddress(address) === false) {
      setError(true)
      return
    }

    setConfirmationModel(false)
    dispatch(shareFiles(address))
    setAddress('')
  }

  const handleClick = () => {
    setConfirmationModel(true)
  }

  const handleCloseModal = () => {
    setConfirmationModel(false)
    setError(false)
  }

  const areFilesSelected = selectedFiles.length > 0

  return (
    <div className={styles}>
      {
      areFilesSelected &&
        <Button variant="contained" component="span" color="secondary" onClick={handleClick}>
          <IosShareIcon /> Share
        </Button>
    }
      <InputModal
        openModal={confirmationModal}
        confirmCallback={handleConfirmation}
        closeCallback={handleCloseModal}
        text="Please enter addressee wallet address!"
      >
        <TextField
          autoFocus
          required
          error={error}
          helperText="Please enter wallet address!"
          margin="dense"
          id="adress"
          label="Reciever Address"
          type="text"
          fullWidth
          variant="standard"
          value={address}
          onChange={e => setAddress(e.target.value)}
        />
      </InputModal>

    </div>
  )
}

export default FileShare
