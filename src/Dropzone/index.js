import React, { Component } from 'react'
import './Dropzone.css'
import Animation from '../Components/Animation'

class Dropzone extends Component {
  constructor(props) {
    super(props)
    this.state = { hightlight: false }
    this.fileInputRef = React.createRef()
  }

  openFileDialog = () => {
    if (this.props.disabled) return
    this.fileInputRef.current.click()
  }

  onFilesAdded = (evt) => {
    if (this.props.disabled) return
    const files = evt.target.files
    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files)
      this.props.onFilesAdded(array)
    }
  }

  onDragOver = (evt) => {
    evt.preventDefault()

    if (this.props.disabled) return

    this.setState({ hightlight: true })
  }

  onDragLeave = () => {
    this.setState({ hightlight: false })
  }

  onDrop = (event) => {
    event.preventDefault()

    if (this.props.disabled) return

    const files = event.dataTransfer.files
    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files)
      this.props.onFilesAdded(array)
    }
    this.setState({ hightlight: false })
  }

  fileListToArray = (list) => {
    const array = []
    for (var i = 0; i < list.length; i++) {
      array.push(list.item(i))
    }
    return array
  }

  render() {
    return (
      <div
        className={`Dropzone ${this.state.hightlight ? 'Highlight' : ''}`}
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
        onClick={this.openFileDialog}
        style={{ cursor: this.props.disabled ? 'default' : 'pointer' }}
      >
        <input
          ref={this.fileInputRef}
          className="FileInput"
          type="file"
          accept="application/pdf"
          multiple
          onChange={this.onFilesAdded}
        />
        <Animation />
        <h1 className="file-name">Drop PDF here, or click to choose</h1>
      </div>
    )
  }
}

export default Dropzone