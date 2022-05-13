import { uploadFile } from 'core/actions/actions-files'
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from 'components/Button'
import { styles } from './styles.scss'
import UploadIcon from '@mui/icons-material/Upload'
import SnackBar from 'components/SnackBar'

const FileUpload = () => {
  const fileInputRef = useRef()
  const dispatch = useDispatch()

  const isLoading = useSelector(state => state.files.isUploadingFile)

  const hanldeCloseBar = () => {}

  const fileDispatch = (event) => {
    event.stopPropagation()

    const file = event.target.files[0]
    const { name } = event.target.files[0]

    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)

    reader.onloadend = () => {
      dispatch(uploadFile(
        Buffer.from(reader.result),
        name
      ))
    }
  }

  return (
    <div className={styles}>
      <label htmlFor="raised-button-file">
        <Button variant="contained" component="span" color="secondary">
          <UploadIcon /> Upload
        </Button>
      </label>
      <input
        id="raised-button-file"
        type="file"
        onChange={fileDispatch}
        multiple={false}
        ref={fileInputRef}
      />

      <SnackBar
        onCloseCallback={hanldeCloseBar}
        open={isLoading}
        message="Uploading file. Please confirm the transaction and wait..."
      />
    </div>
  )
}

export default FileUpload
