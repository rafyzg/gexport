const fs = require('fs');
const { google } = require('googleapis');

const TOKEN_PATH = 'token.json';
const CREDENTIALS_PATH = 'credentials.json';

module.exports = () => {
    return new Promise((resolve, reject) => {
      // Load client secrets from a local file.
      fs.readFile(CREDENTIALS_PATH, (err, credentialsContent) => {
        if (err) {
          return reject('Error loading client secret file');
        }
        const credentials = JSON.parse(credentialsContent);
        fs.readFile(TOKEN_PATH, (err, tokenContent) => {
          if (err) {
            return reject('Error loading tokens');
          }
          const token = JSON.parse(tokenContent);
          const { client_secret, client_id, redirect_uris } = credentials.installed;
          const oAuth2Client = new google.auth.OAuth2(
            client_id,
            client_secret,
            redirect_uris[0]
          );
  
          oAuth2Client.setCredentials(token);
          return resolve(oAuth2Client);
        });
      });
    });
}