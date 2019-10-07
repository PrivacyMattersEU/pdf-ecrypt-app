import React, { Component } from 'react'

export default class Settings extends Component {
    constructor() {
        super()
        this.fileInputRef = React.createRef()
        this.state = {
            path: '',
            name: '',
            isSet: false
        }
    }
    componentDidMount () {
        let path = localStorage.getItem('path')
        let name = localStorage.getItem('name')
        if(path && name) {
            this.setState({
                path,
                name,
                isSet: true
            })
        }
    }
    openFileDialog = () => {
        this.fileInputRef.current.click()
    }
    onDirectorySelected = (evt) => {
        const files = evt.target.files
        localStorage.setItem('path', files[0].path)
        localStorage.setItem('name', files[0].name)
        this.setState({
            path: files[0].path,
            name: files[0].name,
            isSet: true
        })
    }
    clearUserPath = () => {
        localStorage.removeItem('path')
        localStorage.removeItem('name')
        this.setState({
            path: '',
            name: '',
            isSet: false
        })
    }
    render() {
        return (
            <>
                <h3 className="window-title">Settings</h3>
                <div style={{ marginTop: 15 }}>
                    {/* <AwesomeButton size="auto">Default Output path</AwesomeButton> */}
                    {
                        this.state.isSet ?
                        <span className="app-text"><strong>{this.state.name}</strong> | {this.state.path}</span>
                        :
                        <span className="app-text">Default output path not set.</span>
                    }
                    
                    <input 
                        onChange={this.onDirectorySelected} 
                        ref={this.fileInputRef} 
                        webkitdirectory="true" 
                        directory="true" 
                        multiple={false} 
                        type="file" 
                        name="" 
                        id="" 
                        className="FileInput"
                    />
                    <span className="app-text" onClick={() => { this.openFileDialog() }} style={{ marginLeft: 10, textDecoration: 'underline', cursor: 'pointer' }}>Click here to set.</span>
                    {
                        this.state.isSet ?
                        <span className="app-text" onClick={() => { this.clearUserPath() }} style={{ marginLeft: 10, textDecoration: 'underline', cursor: 'pointer' }}>Clear</span>
                        :
                        null
                    }
                    
                    <p className="app-text">If not set, files will be saved the file directory.</p>
                    
                </div>
            </>
        )
    }
}
