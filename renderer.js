async function init() {
  const args = await versions.getArgs();
  console.log('CLI Arguments in UI:', args);

  // In your settings page
  const currentPath = await window.config.getPath();
  console.log(currentPath);

  return;
  // User clicks "Browse..."
  const chosen = await window.config.browse(); // opens file picker
  if (chosen) {
    await window.config.setPath(chosen); // apply it
  }

  // Revert to default
  await window.config.setPath(null);

  // Load / save
  const { path, data } = await window.config.load();
  await window.config.save({ ...data, theme: 'dark' });
}
init();
