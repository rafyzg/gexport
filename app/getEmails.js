const { google } = require('googleapis');
const { getAuth } = require('./reuseToken');
const emailMiddleware = require('./middleware/email');

getAuth().then((auth) => {
    let gmail = google.gmail({version: 'v1', auth});

    gmail.users.messages.list({
        userId: 'me',
    }, (err, res) => {

        if (err) return console.log('The API returned and error' + err)
        const emails = res.data.messages;
        if (emails.length) {
            let i = 0;
            console.log(`Emails: ${emails.length} `);
            
            emails.forEach((email) => {
                emailMiddleware.getMessageDataWithoutAttachment(gmail, email.id);
                //break;
            });
        }
    });
});

/**
 * Get Message with given ID.
 *
 * @param  {String} userId User's email address. The special value 'me'
 * can be used to indicate the authenticated user.
 * @param  {String} messageId ID of Message to get.
 * @param  {Function} callback Function to call when the request is complete.
 */
function getMessageData(gmail, emailId, threadId)  {

    gmail.users.messages.get({
        userId : 'me',
        id: emailId
    },(err, res) => {

        if(err) return console.log(err);
        console.log(res);
        /*
        let headers = res.data.payload.headers;
        headers.forEach((header) => {
            if(header['name'] == 'Subject') {
                console.log(`${emailId} ${threadId}`)
                console.log(header['value']);
            }
        });
        */
    });
}

