import React, { Component } from 'react'
import { AwesomeButtonProgress } from 'react-awesome-button'
import { ipcRenderer } from 'electron'
var QRCode = require('qrcode.react')

export default class ProcessingFiles extends Component {
    constructor() {
        super()
        this.state = {
            processingCompleted: false
        }
    }
    componentDidMount() {
        
    }
    processFiles = (next) => {
        let password = password_generator(15)
        console.log('Password:', password)
        this.props.Files.forEach((File) => {
            let result = ipcRenderer.sendSync('process-pdf', File.path, File.name, localStorage.getItem('path'), password)
            if(result.status) {
                next(true, 'Encrypted Successfully')
                this.setState({
                    processingCompleted: true,
                    password
                })
            } else {
                next(false, 'Error')
            }
        });
    }
    render() {
        return (
            <div style={{ flex: 1, display: 'flex', justifyContent:'center', alignItems:'center', flexDirection: 'column', width:'100%', overflow:'hidden' }}>
                {
                    !this.state.processingCompleted ?
                    <div>
                        <AwesomeButtonProgress
                        type="secondary"
                        size="large"
                        action={(element, next) => { this.processFiles(next) }}
                        >
                            Encrypt {this.props.Files.length} Files
                        </AwesomeButtonProgress>
                    </div>
                    :
                    null
                }

                {
                    this.state.processingCompleted ?
                    <div style={{ textAlign: 'center' }}>
                        <h3 className="window-title">Encryption Completed</h3>
                        <h3>{this.state.password}</h3>
                        <p style={{ color: '#596275', fontSize: 10 }}>Password used for Encryption</p>
                        <QRCode value={this.state.password} />
                    </div>
                    :
                    null
                }
           
                
            </div>
        )
    }
}


function password_generator( len ) {
    var length = (len)?(len):(10);
    var string = "abcdefghijklmnopqrstuvwxyz"; //to upper 
    var numeric = '0123456789';
    var punctuation = '!@#$%^&*()_+~`|}{[]\:;?><,./-=';
    var password = "";
    var character = "";
    while( password.length<length ) {
        let entity1 = Math.ceil(string.length * Math.random()*Math.random());
        let entity2 = Math.ceil(numeric.length * Math.random()*Math.random());
        let entity3 = Math.ceil(punctuation.length * Math.random()*Math.random());
        let hold = string.charAt( entity1 );
        hold = (password.length%2==0)?(hold.toUpperCase()):(hold);
        character += hold;
        character += numeric.charAt( entity2 );
        character += punctuation.charAt( entity3 );
        password = character;
    }
    password=password.split('').sort(function(){return 0.5-Math.random()}).join('');
    return password.substr(0,len);
}