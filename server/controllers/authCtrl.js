import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import models from './../models/index';
import { validateSignup, validateInput, validateLoginInput, validateEmailExist, validateEmail, validateResetPassword } from '../utils/validations';

/**
 * This class handles the logic for registering an account signin and signing out
 */
export default class AuthCtrl {

/**
 * This method handles logic for registering a user
 * @param {*} req
 * @param {*} res
 * @returns {void}
 */
  static register(req, res) {
    validateSignup(req.body, validateInput).then(({ errors, isValid }) => {
      if (isValid) {
        models.User.create(req.body).then((newUser) => {
          const token = jwt.sign({
            username: newUser.username,
            email: newUser.email,
            id: newUser.id,
            telephone: newUser.telephone,
            fullname: newUser.fullname,
            profileImage: newUser.profileImage
          }, process.env.secret, { expiresIn: 60 * 60 * 24 });

          return res.status(201).json({ token });
        });
      } else {
        return res.status(400).json({ errors });
      }
    });
  }

/**
 *  This method handles logging in an existing user
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {void}
 */
  static login(req, res) {
    const { errors, isValid } = validateLoginInput(req.body);

    if (isValid) {
      models.User.findOne({
        where: { $or: [
      { username: req.body.userIdentifier },
      { email: req.body.userIdentifier }]
        }
      }).then((founduser) => {
        if (!founduser) {
          return res.status(401).json({
            globals: 'Invalid login credentials'
          });
        }
        if (bcrypt.compareSync(req.body.password, founduser.password)) {
          const token = jwt.sign({
            username: founduser.username,
            email: founduser.email,
            id: founduser.id,
            telephone: founduser.telephone,
            fullname: founduser.fullname,
            profileImage: founduser.profileImage
          }, process.env.secret, { expiresIn: 60 * 60 * 24 });
          return res.status(200).json({
            token
          });
        }
        return res.status(401).json({
          globals: 'Invalid login credentials'
        });
      });
    } else {
      return res.status(400).json({ errors });
    }
  }

/**
 *  This method handles sending an email to a registered user to reset password
 * @param {object} req
 * @param {object} res
 * @returns {void}
 */
  static forgotPasswordLink(req, res) {
    validateEmailExist(req.body, validateEmail).then(({ errors, isValid }) => {
      if (isValid) {
        const email = req.body.email;
        const token = jwt.sign({
          email
        }, process.env.secret, { expiresIn: 60 * 60 * 1 });

        const transporter = nodemailer.createTransport({
          service: 'gmail',
          // port: 25,
          secure: false,
          auth: {
            user: 'noreply.postitapp@gmail.com',
            pass: process.env.password
          },
          tls: {
            // rejectUnauthorized: false
          }
        });

        const mailOptions = {
          from: 'noreply.postitapp@gmail.com',
          to: email,
          subject: 'Reset Password',
          text: `You have received this mail because you asked to reset your account on PostIt. Please click the following link or paste link into your browser to begin the process:
          ${req.headers.origin}/resetpassword?tok=${token} \n
          Please ignore this mail if you did not make this request. \n
          Note: This link will expire after one hour`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return res.status(501).json({
              globals: 'Mail not sent'
            });
          }
          return res.status(200).json({
            success: 'Please check your mail for the reset link!'
          });
        });
      } else {
        return res.status(400).json({ errors });
      }
    });
  }

/**
 *  This method handles resetting the password of a registered user to reset password
 * @param {object} req
 * @param {object} res
 * @returns {void}
 */
  static resetPassword(req, res) {
    const { errors, isValid } = validateResetPassword(req.body);

    if (isValid) {
      const token = req.query.tok;

      if (token) {
        jwt.verify(token, process.env.secret, (error, decoded) => {
          if (error) {
            return res.status(401).json({
              globals: 'This link has expired or is invalid. Please try resetting your password again'
            });
          }

          const salt = bcrypt.genSaltSync(10);
          const hashedPassword = bcrypt.hashSync(req.body.password, salt);

          models.User.update({ password: hashedPassword }, {
            where: { email: decoded.email }
          }).then(() => {
            res.status(201).json({
              success: 'password reset successful!'
            });
          });
        });
      }
    } else {
      return res.status(400).json({ errors });
    }
  }
}
