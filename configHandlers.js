const fs = require('fs');
const path = require('path');
const { app } = require('electron');

const DEFAULT_CONFIG_PATH = path.join(app.getPath('userData'), 'config.json');

let _customConfigPath = null; // set at runtime from settings

function getConfigPath() {
  return _customConfigPath || DEFAULT_CONFIG_PATH;
}

function setCustomConfigPath(filePath) {
  _customConfigPath = filePath || null;
}

function loadConfig() {
  const configPath = getConfigPath();
  try {
    const raw = fs.readFileSync(configPath, 'utf-8');
    return { path: configPath, data: JSON.parse(raw) };
  } catch (err) {
    if (err.code === 'ENOENT') {
      return { path: configPath, data: {} }; // file doesn't exist yet — return empty
    }
    throw new Error(`Failed to load config from ${configPath}: ${err.message}`);
  }
}

function saveConfig(data) {
  const configPath = getConfigPath();
  fs.mkdirSync(path.dirname(configPath), { recursive: true });
  fs.writeFileSync(configPath, JSON.stringify(data, null, 2), 'utf-8');
}

module.exports = { getConfigPath, setCustomConfigPath, loadConfig, saveConfig };
