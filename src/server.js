const express = require("express");

async function start() {
  console.log("Starting server...");
  const app = express();

  app.get("/", (request, response) => {
    const html = `
            <html>
            <body>
            <div id="greeting">Hello world</div>
            </body>
            </html>
            `;
    response.send(html);
  });

  const server = app.listen(3001, () => {
    console.log("Listen on the port 3001...");
  });

  return server;
}

module.exports = {
  start: start,
  port: 3001,
};
