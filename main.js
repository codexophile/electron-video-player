const { app, BrowserWindow, ipcMain } = require('electron/main');
const path = require('node:path');
const { registerIpcHandlers } = require('./ipcHandlers');

ipcMain.handle('get-cli-args', () => {
  return process.argv;
});

let mainWindow = null;
const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    transparent: true,
    resizable: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadFile('index.html');

  if (process.argv.includes('--with-dev-tools')) {
    mainWindow.webContents.openDevTools();
  }
};

app.whenReady().then(() => {
  registerIpcHandlers(() => mainWindow); // pass getter so ipc.js never holds a stale ref
  ipcMain.handle('ping', () => 'pong');
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
