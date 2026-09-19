const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const https = require('https');

const localAppData = process.env.LOCALAPPDATA || 'C:\\Users\\tritr\\AppData\\Local';
const gitDir = path.join(localAppData, 'Programs', 'Git');
const ghDir = path.join(localAppData, 'Programs', 'GitHubCLI');

if (!fs.existsSync(gitDir)) fs.mkdirSync(gitDir, { recursive: true });
if (!fs.existsSync(ghDir)) fs.mkdirSync(ghDir, { recursive: true });

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    console.log(`Downloading ${url} -> ${dest}`);
    const file = fs.createWriteStream(dest);
    const getWithRedirect = (currentUrl) => {
      https.get(currentUrl, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          getWithRedirect(res.headers.location);
        } else if (res.statusCode === 200) {
          res.pipe(file);
          file.on('finish', () => {
            file.close(resolve);
          });
        } else {
          reject(new Error(`Failed to download: status ${res.statusCode}`));
        }
      }).on('error', (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
    };
    getWithRedirect(url);
  });
}

async function main() {
  const gitZip = path.join(localAppData, 'Temp', 'mingit.zip');
  const gitUrl = 'https://github.com/git-for-windows/git/releases/download/v2.55.0.windows.5/MinGit-2.55.0.5-64-bit.zip';
  
  if (!fs.existsSync(path.join(gitDir, 'cmd', 'git.exe'))) {
    await downloadFile(gitUrl, gitZip);
    console.log('Extracting MinGit...');
    execSync(`tar -xf "${gitZip}" -C "${gitDir}"`, { stdio: 'inherit' });
    fs.unlinkSync(gitZip);
    console.log('MinGit extracted successfully.');
  } else {
    console.log('Git already exists at', path.join(gitDir, 'cmd', 'git.exe'));
  }

  const gitExe = path.join(gitDir, 'cmd', 'git.exe');
  const gitVer = execSync(`"${gitExe}" --version`).toString().trim();
  console.log('Installed Git version:', gitVer);

  // Setup gh CLI
  const ghExe = path.join(ghDir, 'bin', 'gh.exe');
  if (!fs.existsSync(ghExe)) {
    const ghZip = path.join(localAppData, 'Temp', 'gh.zip');
    const ghUrl = 'https://github.com/cli/cli/releases/download/v2.101.0/gh_2.101.0_windows_amd64.zip';
    await downloadFile(ghUrl, ghZip);
    console.log('Extracting gh CLI...');
    const tempExtract = path.join(localAppData, 'Temp', 'gh_extract');
    if (!fs.existsSync(tempExtract)) fs.mkdirSync(tempExtract, { recursive: true });
    execSync(`tar -xf "${ghZip}" -C "${tempExtract}"`, { stdio: 'inherit' });
    // Move contents
    const subfolder = fs.readdirSync(tempExtract)[0];
    const sourcePath = path.join(tempExtract, subfolder);
    // copy all files
    execSync(`robocopy "${sourcePath}" "${ghDir}" /E /MOVE > nul || exit 0`, { shell: 'cmd.exe' });
    fs.unlinkSync(ghZip);
    fs.rmSync(tempExtract, { recursive: true, force: true });
    console.log('gh CLI extracted successfully.');
  } else {
    console.log('gh already exists at', ghExe);
  }

  const ghVer = execSync(`"${ghExe}" --version`).toString().trim();
  console.log('Installed gh version:', ghVer.split('\n')[0]);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
