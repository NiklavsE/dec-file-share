import React, { Component } from 'react'
import { styles } from './styles.scss'
import SharedFileTable from './components/SharedFileTable'

class SharedFilesView extends Component {
  render() {
    return (
      <div className="container">
        <div className={styles}>
          <SharedFileTable />
        </div>
      </div>
    )
  }
}

export default SharedFilesView
