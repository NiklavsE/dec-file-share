import * as React from 'react'
import Button from '@mui/material/Button'
import PropTypes from 'prop-types'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

function InputModal({
  confirmCallback, text, children, openModal, closeCallback
}) {
  const handleConfirmation = () => {
    confirmCallback()
    
  }

  return (
    <div>
      <Dialog open={openModal} onClose={closeCallback}>
        <DialogTitle>Share File</DialogTitle>
        <DialogContent>
          <DialogContentText>
            { text }
          </DialogContentText>
          {children}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeCallback}>Cancel</Button>
          <Button onClick={handleConfirmation}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

InputModal.propTypes = {
  confirmCallback: PropTypes.func.isRequired,
  closeCallback: PropTypes.func.isRequired,
  text: PropTypes.string,
  children: PropTypes.node,
  openModal: PropTypes.bool.isRequired
}

InputModal.defaultProps = {
  children: null,
  text: ''
}

export default InputModal

