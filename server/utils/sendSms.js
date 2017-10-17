import superagent from 'superagent';

/**
 * Method to handle sending sms
 * @param {array} phoneNumbers
 * @param {string} sentBy
 * @param {string} groupName
 * @returns {void}
 */
const sendSms = (phoneNumbers, sentBy, groupName) => {
  const message =
  `Hello! A new message has been sent to you by ${sentBy} in group ${groupName}`;
  const url =
  `http://api.smartsmssolutions.com/smsapi.php?username=ayodapov&password=${process.env.smspassword}&sender=PostItApp&recipient=${phoneNumbers}&message=${message}`;

  superagent.post(url)
  .end();
};

export default sendSms;
