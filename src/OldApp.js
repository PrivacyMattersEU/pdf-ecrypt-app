import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import { ipcRenderer } from 'electron'


export default class App extends Component {
  constructor() {
    super()
    this.state = {
      password: ''
    }
  }

  onDrop = (acceptedFiles) => {
    console.log("accepted Files",acceptedFiles);
    acceptedFiles.forEach((File) => {
      console.log("Path:", File.path, File)
      ipcRenderer.send('process-pdf', File.path)
    })
    
  }
  render() {
    return (
      <div>
        Hello
        <input type="text" name="" id="" onChange={(e) => { this.setState({ password: e.target.value })  }} value={this.state.password}/>

        <div style={{ backgroundColor: 'green', padding: 40 }}>
          <Dropzone onDrop={this.onDrop}>
            {({getRootProps, getInputProps}) => (
                <div {...getRootProps()}>
                <input {...getInputProps()} />
                  Click me to upload a file!
                </div>
            )}
          </Dropzone>
        </div>
      </div>
    )
  }
}
