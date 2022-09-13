ARG BASE_IMAGE=node:latest
FROM ${BASE_IMAGE} AS builder
RUN apt-get update && apt-get install -y libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb

FROM builder

WORKDIR /plan
COPY . workdir/
WORKDIR /plan/workdir/plan
RUN npm ci
EXPOSE 3001
# ENTRYPOINT [ "node_modules/.bin/cypress", "run", "--spec", "cypress/e2e/1-getting-started/basic.cy.js"]
ENTRYPOINT [ "npm", "run", "testground"]