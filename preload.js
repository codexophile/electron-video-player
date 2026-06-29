const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('versions', {
  ping: () => ipcRenderer.invoke('ping'),
  getArgs: () => ipcRenderer.invoke('get-cli-args'),
});

contextBridge.exposeInMainWorld('config', {
  getPath: () => ipcRenderer.invoke('config:get-path'),
  browse: () => ipcRenderer.invoke('config:browse'),
  setPath: filePath => ipcRenderer.invoke('config:set-path', filePath),
  load: () => ipcRenderer.invoke('config:load'),
  save: data => ipcRenderer.invoke('config:save', data),
});
