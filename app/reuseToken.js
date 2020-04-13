const fs = require('fs');
const { google } = require('googleapis');

const TOKEN_PATH = '../token/token.json'
const CREDENTIALS_PATH = '../token/credentials.json';

//const getAuth = () => auth;
/*
module.exports = {
  getAuth
};
*/
const getAuth = () => {
  return new Promise((resolve, reject) => {
    // Load client secrets from a local file.
    fs.readFile(CREDENTIALS_PATH, (err, credentialsContent) => {
      if (err) {
        console.log(err);
        return reject(`Error loading client ${CREDENTIALS_PATH} file`);
      }
      const credentials = JSON.parse(credentialsContent);
      fs.readFile(TOKEN_PATH, (err, tokenContent) => {
        if (err) {
          return reject(`Error loading ${TOKEN_PATH}`);
        }
        const token = JSON.parse(tokenContent);
        const { client_secret, client_id, redirect_uris } = credentials.installed;
        let auth = new google.auth.OAuth2(
          client_id,
          client_secret,
          redirect_uris[0]
        );

        auth.setCredentials(token);
        return resolve(auth)
      });
    });
  });
};

module.exports = {
  getAuth
};