import sendEmail from './sendEmail';

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
