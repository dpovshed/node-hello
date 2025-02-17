const http = require('http');
const port = process.env.PORT || 3000;
const ver = process.version.node

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  const msg = 'Hello World!\n'
  res.end(msg + ' Node version: ' + ver + '\n');
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});
