import React, { Component } from 'react'
import { ipcRenderer } from 'electron'

export default class Files extends Component {
    constructor() {
        super()
        this.state = {
            Files: []
        }
    }
    componentDidMount() {
        let response = ipcRenderer.sendSync('files')
        console.log("Response:", response)
        if(response.status) {
            this.setState({
                Files: response.docs 
            })
        }
        
    }
    render() {
        return (
            <>
                <h3 className="window-title">Files</h3>
                <ul className="files-ul">
                    {
                        this.state.Files.map((File) => {
                            return (
                                <li key={File._id} className="files-li">
                                    <span>{File.FileName}</span>
                                    <span style={{ marginLeft: 10 }}>{File.Password}</span>
                                </li>
                            )
                        })
                    }
                </ul>  
            </>
        )
    }
}
