import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import { isEmail }          from 'validator'

/* component styles */
import { inputStyles } from './styles.scss'

class Input extends Component {
  static determineValidity(type, value) {
    switch (type) {
      case 'email':
        return {
          type,
          valid: isEmail(value),
          value
        }
      case 'text':
        return {
          type,
          valid: value.length > 0,
          value
        }
      default:
        return false
    }
  }

  componentDidUpdate() {
    const { autoFocus } = this.props
    if (autoFocus) { this.input.focus() }
  }

  onChange = (evt) => {
    const  { value, name } = evt.currentTarget
    const { type, checkIfValid, onChange } = this.props

    if (checkIfValid) {
      checkIfValid(Input.determineValidity(type, value))
    }

    if (onChange) { onChange(name, value) }
  }

  onKeyPress = (evt) => {
    const { onKeyPress } = this.props
    if (onKeyPress) { onKeyPress(evt) }
  }

  render() {
    const {
      name,
      type,
      placeholder,
      disabled,
      required,
      value
    } = this.props

    return (
      <div className={inputStyles}>
        <input
          name={name}
          type={type}
          required={required}
          value={value}
          ref={(input) => { this.input = input }}
          placeholder={placeholder}
          onChange={this.onChange}
          onBlur={this.onBlur}
          onKeyPress={this.onKeyPress}
          disabled={disabled}
        />
      </div>
    )
  }
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  onKeyPress: PropTypes.func,
  placeholder: PropTypes.string,
  checkIfValid: PropTypes.func,
  required: PropTypes.bool,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func
}

Input.defaultProps = {
  value: null,
  onChange: null,
  autoFocus: false,
  disabled: false,
  onKeyPress: null,
  placeholder: '',
  checkIfValid: null,
  required: false
}

export default Input
