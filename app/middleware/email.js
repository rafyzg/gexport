const { models } = require('../../db');
const base64 = require('js-base64').Base64;
/**
 * Get Message with given ID.
 *
 * @param  {String} userId User's email address. The special value 'me'
 * can be used to indicate the authenticated user.
 * @param  {String} messageId ID of Message to get.
 * @param  {Function} callback Function to call when the request is complete.
 */
const getMessageDataWithoutAttachment = async(gmail, emailId)  => {
    try {
        const res = await gmail.users.messages.get({ userId : 'me', id: emailId });
        let label = res.data.labelIds.join();
        let email = {
            emailId : emailId,
            threadId : res.data.threadId,
            //from : res.data.payload.from,
        };
        email.labels = label;
        let headers = res.data.payload.headers;
        let body = res.data.payload.parts;
        headers.forEach((header) => {
            if(header['name'] == 'Subject') {
                email.subject = header['value'];
            }
            else if(header['name'] == 'From') {
                let fromHeader = header['value'].split('<');
                email.senderName = fromHeader[0];
                email.senderMail = fromHeader[1].replace('>','');
            }
            else if(header['name'] == 'Date') {
                email.date = header['value'];
            }
        });
        email.body = decodeBodyMessage(body);
        email.fileLink = '';
        console.log(email);
        return email;
    } catch(err) {
        console.log(`Error occured while trying to reach gmail api \n ${err}`);
    }
};

const decodeBodyMessage = (bodyData) => {
    let body;
    bodyData.forEach((part) => {
        if(part.partId === '0') {
            body =  base64.decode(part.body.data.replace(/-/g, '+').replace(/_/g, '/'));
        }
    });
    return body;
};

const insertEmail = async(email) => {
    let createdEmail;
    try {
        createdEmail = await models.email.create({ email });
        return createdEmail;
    } catch(err) {
        throw new Error(`Error occured while reaching databse \n ${err}`);
    }
};

module.exports = {
    getMessageDataWithoutAttachment
  };