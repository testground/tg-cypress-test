/// <reference types="cypress" />

const cypress = require("cypress");
const net = require("net");
const { network } = require("@testground/sdk");
const ipaddr = require("ipaddr.js");
const axios = require("axios");

const { start } = require("../../../src/server");

const { setAddress, getAddress } = require("./addr");

async function runTest(runenv, client) {
  const netclient = network.newClient(client, runenv);

  if (!runenv.testSidecar) {
    throw new Error("this test requires a sidecar.");
  }

  runenv.recordMessage("before netclient.waitNetworkInitialized");
  await netclient.waitNetworkInitialized();

  const seq = await client.signalAndWait(
    "ip-allocation",
    runenv.testInstanceCount
  );

  runenv.recordMessage(`I am ${seq}`);

  const config = {
    network: "default",
    enable: true,
    default: {
      latency: 100 * 1000 * 1000, // 100ms in nanoseconds
      bandwidth: 1 << 20, // 1 Mib
    },
    callbackState: "network-configured",
    routingPolicy: network.ALLOW_ALL,
  };

  const ip = [...runenv.testSubnet[0].octets.slice(0, 2), 1, seq];
  config.IPv4 = `${ip.join(".")}/${runenv.testSubnet[1]}`;

  runenv.recordMessage("before netclient.configureNetwork");
  await netclient.configureNetwork(config);

  let server;
  let tcpServ;
  if (seq == 1) {
    runenv.recordMessage("Starting server!");
    server = await start();
    runenv.recordMessage("Server started!");

    tcpServ = net.createServer();
    tcpServ.listen(1234, "0.0.0.0");
  } else {
    runenv.recordMessage("Skipping server start!");
  }

  const raw = ip.slice(0, 3);
  raw.push(1);
  const addr = ipaddr.fromByteArray(raw);

  setAddress(`http://${addr}:3001`);

  console.log("Full address: " + getAddress());

  if (true) {
    cypress
      .run({
        reporter: "junit",
        browser: "electron",
        spec: "./cypress/e2e/1-getting-started/hello.cy.js",
        config: {
          baseUrl: getAddress(),
          video: false,
        },
        env: {
          anything: "goes",
        },
      })
      .then((results) => {
        // console.log(results);
        runenv.recordMessage("Cypress test finished");
        if (server) {
          server.close();
        }
        return null;
      })
      .catch((err) => {
        // console.error(err);
        return err;
      });
  }
}

const getServer = async () => {
  try {
    runenv.recordMessage("Attempting to connect to " + getAddress());
    return await axios.get(getAddress());
  } catch (error) {
    console.error("Could not get response from server");
  }
};

module.exports = {
  multipleTest: runTest,
};
