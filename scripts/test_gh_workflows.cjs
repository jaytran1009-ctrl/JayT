const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ghExe = 'C:\\Users\\tritr\\AppData\\Local\\Programs\\GitHubCLI\\gh.exe';
const gitCmd = 'C:\\Users\\tritr\\AppData\\Local\\Programs\\Git\\cmd';
const repo = 'jaytran1009-ctrl/JayT';

function runGh(args) {
  const env = Object.assign({}, process.env, { PATH: gitCmd + ';' + (process.env.PATH || '') });
  const res = spawnSync(ghExe, args, { encoding: 'utf8', env });
  if (res.error) throw res.error;
  return res;
}

console.log('--- 1. LISTING WORKFLOWS IN REPO ---');
const listRes = runGh(['workflow', 'list', '--repo', repo]);
console.log('Workflows:\n', listRes.stdout || listRes.stderr);

console.log('\n--- 2. VIEWING jayt_cadence_cloud_cron.yml DETAILS ---');
const viewRes = runGh(['workflow', 'view', 'jayt_cadence_cloud_cron.yml', '--repo', repo]);
console.log(viewRes.stdout || viewRes.stderr);
