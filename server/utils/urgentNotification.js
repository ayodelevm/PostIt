import sendEmail from './sendEmail';

/**
 * Method handling sending notification when priority is urgent
 * @param {object} group
 * @param {string} sentBy
 * @param {string} origin
 * @returns {void}
 */
const urgentNotification = (group, sentBy, origin) => {
  group.getUsers({
    where: { username: { ne: sentBy } },
    attributes: ['email'],
    joinTableAttributes: []
  }).then((foundEmails) => {
    Promise.resolve(
    foundEmails.map(email => email.email)
    ).then((userEmails) => {
      Promise.resolve(
        sendEmail(userEmails, sentBy, group.name, group.id, origin)
      );
    });
  });
};

export default urgentNotification;
