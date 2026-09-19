const { execSync } = require('child_process');
const gitCmd = 'C:\\Users\\tritr\\AppData\\Local\\Programs\\Git\\cmd';
const ghBin = 'C:\\Users\\tritr\\AppData\\Local\\Programs\\GitHubCLI';
try {
  const currentPath = process.env.PATH || '';
  if (!currentPath.includes(gitCmd)) {
    execSync(`setx PATH "%PATH%;${gitCmd};${ghBin}"`, { shell: 'cmd.exe', stdio: 'inherit' });
    console.log('Successfully added Git and gh to User PATH.');
  } else {
    console.log('Git and gh already present in PATH.');
  }
} catch (e) {
  console.error('Failed to setx:', e.message);
}
