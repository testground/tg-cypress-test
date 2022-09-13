A simple project attempting to integrate Cypress and Testground.

Prerequisites:
- `testground daemon` is running
- Docker

The following test cases are implemented:
`testground run single --plan cypress-test --testcase basic --instances 1 --builder docker:generic --runner local:docker`
And
`testground run single --plan cypress-test --testcase multiple --instances 2 --builder docker:generic --runner local:docker`

Note that the `multiple` test case is not working, because Testground instances cannot connect to a server on another instance.