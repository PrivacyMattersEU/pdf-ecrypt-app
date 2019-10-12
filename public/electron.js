const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = require('electron').ipcMain
const Datastore = require('nedb')

const path = require('path');
const isDev = require('electron-is-dev');

const dbFilename = (isDev ? 'records.db' : `${app.getPath('userData')}/records.db`);
console.log("records.db location = ", dbFilename);
const db = new Datastore({ filename: dbFilename, autoload: true });



let HummusRecipe = require('hummus-recipe')

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({width: 450, height: 550});
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('process-pdf', (event, FilePath, FileName, OutputPath, Password) => {
  console.log("Recieved:", FilePath, FileName, Password, OutputPath)
  if(!OutputPath) {
    OutputPath = require('path').dirname(FilePath)
  }
  try {
    useHummus(FilePath, OutputPath, FileName, Password, Password)
    db.insert({ FilePath, OutputPath, FileName, Password, timestamp: Date.now(), isPDF: true }, (err, doc) => {
      console.log("Returned:", err, doc)
    });
    event.returnValue = { status: true }
  } catch(err) {
    console.log("Error:", err);
    event.returnValue = { status: false, err }
  }
  
})

ipcMain.on('files', (event) => {
  db.find({}, (err, docs) => {
    if(err) {
      console.log('error')
      event.returnValue = { status: false }
    } else {
      event.returnValue = { status: true, docs }
    }
  })
})

function useHummus(filePath, outputPath, fileName, userPassword, ownerPassword) {
  console.log("Saving in:", outputPath);
  let EncryptedFileName = `E-${fileName.split('.')[0]}.pdf`;
  const pdfDoc = new HummusRecipe(filePath, `${outputPath}/${EncryptedFileName}`);
  pdfDoc.encrypt({
      userPassword,
      ownerPassword,
      userProtectionFlag: 4
  }).endPDF();
  
}