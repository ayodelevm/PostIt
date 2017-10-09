import jwt from 'jsonwebtoken';
import GoogleAuth from 'google-auth-library';
import models from './../models/index';


/**
 * This class handles the logic for registering an account signin through google authentication
 */
export default class GoogleAuthCtrl {

/**
 * This method handles logic for registering a user through google
 * @param {*} req
 * @param {*} res
 * @returns {void}
 */
  static googleRegister(req, res) {
    // eslint-disable-next-line
    const auth = new GoogleAuth;
    const client = new auth.OAuth2(process.env.clientid, '', '');

    if (req.body.id_token) {
      return client.verifyIdToken(req.body.id_token, process.env.clientid, (e, login) => {
        const payload = login.getPayload();
        if (payload.email_verified && payload.aud === process.env.clientid) {
          return models.User.findOne({
            where: { $or: [
              { googleSubId: payload.sub },
              { email: payload.email }
            ] }
          })
          .then((foundUser) => {
            if (foundUser !== null) {
              return res.status(409).json({ globals: 'You have already signed up with this email, please login instead' });
            }
            return models.User.create({
              googleSubId: `${payload.sub}`,
              fullname: `${payload.name}`,
              email: `${payload.email}`,
              username: `${payload.family_name}.${payload.email.split('@')[0]}`,
              profileImage: `${payload.picture}`
            })
            .then((newUser) => {
              const token = jwt.sign({
                username: newUser.username,
                email: newUser.email,
                id: newUser.id,
                fullname: newUser.fullname,
                profileImage: newUser.profileImage
              }, process.env.secret, { expiresIn: 60 * 60 * 24 });

              return res.status(201).json({ token });
            });
          });
        } else {
          return res.status(401).json({
            globals: 'Email verification Unsuccessful, Please signin with a valid email'
          });
        }
      });
    } else {
      return res.status(401).json({
        globals: 'Google signup failed, please try again later!'
      });
    }
  }

/**
 *  This method handles logging in an existing user with google auth
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {void}
 */
  static googleLogin(req, res) {
    // eslint-disable-next-line
    const auth = new GoogleAuth;
    const client = new auth.OAuth2(process.env.clientid, '', '');

    if (req.body.id_token) {
      return client.verifyIdToken(req.body.id_token,
      process.env.clientid, (e, login) => {
        const payload = login.getPayload();
        if (payload.email_verified && payload.aud === process.env.clientid) {
          return models.User.findOne({
            where: { googleSubId: payload.sub }
          })
          .then((foundUser) => {
            if (!foundUser) {
              return res.status(401).json({
                globals: 'Login Failed! Please signup with your google email first'
              });
            }
            const token = jwt.sign({
              username: foundUser.username,
              email: foundUser.email,
              id: foundUser.id,
              fullname: foundUser.fullname,
              profileImage: foundUser.profileImage
            }, process.env.secret, { expiresIn: 60 * 60 * 24 });
            return res.status(200).json({
              token
            });
          });
        } else {
          return res.status(401).json({
            globals: 'Email verification Unsuccessful, Please signin with a valid email'
          });
        }
      });
    } else {
      return res.status(401).json({
        globals: 'Google sigin failed, please try again later!'
      });
    }
  }
}
