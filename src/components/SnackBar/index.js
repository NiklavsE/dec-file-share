import * as React from 'react'
import Snackbar from '@mui/material/Snackbar'
import PropTypes from 'prop-types'

function SnackBar({ open, message, onCloseCallback }) {
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={open}
        onClose={onCloseCallback}
        message={message}
        key={message}
      />
    </div>
  )
}

SnackBar.propTypes = {
  onCloseCallback: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired

}

export default SnackBar
