const { ipcMain, dialog } = require('electron');
const {
  getConfigPath,
  setCustomConfigPath,
  loadConfig,
  saveConfig,
} = require('./configHandlers');

function registerIpcHandlers(getMainWindow) {
  // Return the currently active config path
  ipcMain.handle('config:get-path', () => {
    return getConfigPath();
  });

  // Open a file picker so the user can choose a custom config.json
  ipcMain.handle('config:browse', async () => {
    const win = getMainWindow();
    const { canceled, filePaths } = await dialog.showOpenDialog(win, {
      title: 'Select config.json',
      filters: [{ name: 'JSON', extensions: ['json'] }],
      properties: ['openFile'],
    });
    if (canceled || filePaths.length === 0) return null;
    return filePaths[0];
  });

  // Apply (or clear) a custom config path
  ipcMain.handle('config:set-path', (_event, filePath) => {
    setCustomConfigPath(filePath); // pass null to revert to default
    return getConfigPath();
  });

  // Load and return config data
  ipcMain.handle('config:load', () => {
    return loadConfig();
  });

  // Save config data
  ipcMain.handle('config:save', (_event, data) => {
    saveConfig(data);
  });
}

module.exports = { registerIpcHandlers };
