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

const server0 = http.createServer((req, res) => {
  res.statusCode = 200;
  let msg = 'Wow! Hello World!\n'
  const version = process.versions.node
  msg += 'Node version: ' + version + '\n'
  msg += `OS Type: ${osType}\n`;
  msg += `OS Release: ${osRelease}\n`;
  msg += osDistro + '\n<hr>';
  res.end(msg);
});

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  const node_version = process.versions.node

  let msg = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Hello World Reactify</title>
      </head>
      <body>
        <div>
          Wow! Hello World!                   <br/>
          <br/>
          <hr>
          Node version: ${node_version}       <br/>
          OS Type: ${osType}                  <br/>
          OS Release: ${osRelease}            <br/>
          OS Distro: ${osDistro}              <br/>
          <hr>
        </div>
        <div id="root">....react output expected here in a few seconds...</div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/16.13.1/umd/react.production.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.13.1/umd/react-dom.production.min.js"></script>
        <script src="./react-script.js"></script>
        <script type="text/javascript">
          const REACT_VERSION = React.version;
          // Define a simple React component
          const HelloWorld = () => {
            return React.createElement('h1', null, 'Hello World from React! React version: ' + REACT_VERSION);
          };
          // Render the component to the DOM
          setTimeout(function() {
            ReactDOM.render(React.createElement(HelloWorld), document.getElementById('root'))
          }, 3000);
        </script>
      </body>
    </html>`;
  res.end(msg);
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});
