import React, { Component } from 'react'
import Dropzone from './Dropzone'
import './App.css'
import 'react-awesome-button/dist/themes/theme-c137.css'
import ProcessingFiles from './ProcessingFiles'
import Settings from './Settings'
import Files from './Files'


export default class App extends Component {
    constructor() {
        super()
        this.state = {
            Files: [],
            isShowingDropper: true,
            isProcessingFiles: false,
            isShowingSettings: false,
            isShowingFiles: false
        }
    }
    onFilesAdded = (Files) => {
        this.setState({
            Files,
            isShowingDropper: false,
            isProcessingFiles: true,
            isShowingSettings: false,
            isShowingFiles: false
        })
    }
    showDropper = () => {
        this.setState({
            Files: [],
            isShowingDropper: true,
            isProcessingFiles: false,
            isShowingSettings: false,
            isShowingFiles: false
        })
    }
    showSettings = () => {
        this.setState({
            Files: [],
            isShowingDropper: false,
            isProcessingFiles: false,
            isShowingSettings: true,
            isShowingFiles: false
        })
    }
    showFiles = () => {
        this.setState({
            Files: [],
            isShowingDropper: false,
            isProcessingFiles: false,
            isShowingSettings: false,
            isShowingFiles: true
        })
    }
    render() {
        return (
            <div className="container">
                <div className="top-bar">
                    <span className="menu-item" onClick={this.showSettings}>Settings</span>
                    <span className="menu-item" onClick={this.showFiles}>Files</span>
                    <span className="menu-item" onClick={this.showDropper}>Encrypt</span>
                </div>
                {
                    this.state.isShowingDropper ? 
                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                        <Dropzone disabled={false} onFilesAdded={this.onFilesAdded} />
                    </div>
                    :
                    null
                }

                {
                    this.state.isProcessingFiles ? 
                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                        <span onClick={() => { this.setState({ Files: [], isShowingDropper: true, isProcessingFiles: false })}} className="back-button">&#x2190;</span>
                        <ProcessingFiles isCompleted={this.showDropper} Files={this.state.Files} />
                    </div>
                    :
                    null
                }

                {
                    this.state.isShowingSettings ?
                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: 10 }}>
                        <Settings />
                    </div>
                    :
                    null
                }

                {
                    this.state.isShowingFiles ? 
                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: 10 }}>
                        <Files />
                    </div>
                    :
                    null
                }
            </div>
        )
    }
}
