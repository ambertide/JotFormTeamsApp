/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
/* eslint-disable */
module.exports = {
  server: {
    command: "npm run start",
    port: 3000,
  },
  launch: {
    args: [
      "--ignore-certificate-errors",
      "--allow-insecure-localhost",
      "--enable-features=NetworkService",
    ],
    headless: process.env.HEADLESS !== "false",
    ignoreHTTPSErrors: true,
    browserContext: "incognito",
  },
};
