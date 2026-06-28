async function init() {
  const args = await versions.getArgs();
  console.log('CLI Arguments in UI:', args);
}
init();
