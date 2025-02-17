const http = require('http');
const port = process.env.PORT || 3000;
const os = require('os');
const fs = require('fs');

const osType = os.type(); // e.g., 'Linux'
const osRelease = os.release(); // e.g., '5.4.0-42-generic'
let osDistro = 'Unknown';
if (osType === 'Linux') {
  try {
    const osReleaseContent = fs.readFileSync('/etc/os-release', 'utf8');
    const lines = osReleaseContent.split('\n');
    for (const line of lines) {
      if (line.startsWith('PRETTY_NAME=')) {
        osDistro = line.split('=')[1].replace(/"/g, '');
        break;
      }
    }
  } catch (err) {
    console.error('Error reading /etc/os-release:', err);
  }
}

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  let msg = 'Wow! Hello World!\n'
  const version = process.versions.node
  msg += 'Node version: ' + version + '\n'
  msg += `OS Type: ${osType}\n`;
  msg += `OS Release: ${osRelease}\n`;
  msg += osDistro + '\n';
  res.end(msg);
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});
