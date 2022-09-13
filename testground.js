const { invokeMap } = require('@testground/sdk')
const {basicTest} = require('./cypress/e2e/1-getting-started/basic')
const {multipleTest} = require('./cypress/e2e/1-getting-started/multiple')


// runTest()
const testcases = {
  basic: basicTest,
  multiple: multipleTest,
}

;(async () => {
  // This is the plan entry point.
  await invokeMap(testcases)
})()
