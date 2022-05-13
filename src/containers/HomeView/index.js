import React, { Component } from 'react'
import FileUpload from './components/FileUpload'
import FileShare from './components/FileShare'
import EnhancedTable from './components/FileTableDemo'
import { styles } from './styles.scss'

class HomeView extends Component {
  render() {
    return (
      <div className="container">
        <div className={styles}>
          <FileUpload />
          <FileShare />
        </div>
        <h3>Uploaded files</h3>
        <EnhancedTable />
      </div>
    )
  }
}

export default HomeView
