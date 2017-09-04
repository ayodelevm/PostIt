import sendSms from './sendSms';
import sendEmail from './sendEmail';


const criticalNotification = (group, sentBy, origin) => {
  group.getUsers({
    where: { username: { ne: sentBy } },
    attributes: ['telephone', 'email'],
    joinTableAttributes: []
  }).then((foundDetails) => {
    const emails = Promise.resolve(
    foundDetails.map(email => email.email)
    );
    const telephones = Promise.resolve(
    foundDetails.map(telephone => telephone.telephone)
    );
    Promise.all([emails, telephones]).then((detailsArray) => {
      const emailArray = detailsArray[0];
      const smsArray = detailsArray[1];
      const sentEmail = Promise.resolve(
        sendEmail(emailArray, sentBy, group.name, group.id, origin)
      );
      const sentSms = Promise.resolve(
        sendSms(smsArray, sentBy, group.name)
      );
      Promise.all([sentEmail, sentSms]);
    });
  });
};

export default criticalNotification;
