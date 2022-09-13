// address to visit in cypress tests
let fullAddr = "http://16.1.1.1:3001";

function setAddress(addr) {
  fullAddr = addr;
}

function getAddress() {
  return fullAddr;
}

module.exports = {
  setAddress,
  getAddress,
};
