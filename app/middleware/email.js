const { db } = require('../../db');
const base64 = require('js-base64').Base64;


/**
 * Get Message with given ID.
 *
 * @param  {String} userId User's email address. The special value 'me'
 * can be used to indicate the authenticated user.
 * @param  {String} messageId ID of Message to get.
 * @param  {Function} callback Function to call when the request is complete.
 */
cosnt getMessageData = async(emailId)  => {
    try {
        const res = await gmail.users.messages.get({ userId : 'me', id: emailId });
        let email = {
            emailId : emailId,
            threadId : res.data.theadId,
        };

        let headers = res.data.payload.headers;
        headers.forEach((header) => {
            if(header['name'] == 'Subject') {
                email.subject = header['value'];
            }
            else if(header['name'] == 'From') {
                email.from = header['value'];
            }
            else if(header['name'] == 'Date') {
                email.date = header['value'];
            }
            else if(header['name'] == '')
        });
        
    } catch(err) {
        console.log(`Error occured while trying to reach gmail api \n ${err}`);
    }
};

const decodeBodyMessage = (bodyParts) => {
    let bodyData = '';
    
    return base64.decode(bodyData.replace(/-/g, '+').replace(/_/g, '/'));
};

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
