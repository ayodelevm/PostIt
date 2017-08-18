import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import models from './../models/index';
import { validateSignup, validateInput, validateLoginInput } from '../utils/validations';

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
          }, process.env.secret, { expiresIn: 60 * 60 });

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
          return res.status(400).json({
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
          }, process.env.secret, { expiresIn: 60 * 60 });
          return res.status(200).json({
            token
          });
        }
        return res.status(400).json({
          globals: 'Invalid login credentials'
        });
      });
    } else {
      return res.status(400).json({ errors });
    }
  }

  /**
 * This method handles logic for registering a user
 * @param {*} req
 * @param {*} res
 * @returns {void}
 */
  static updateOneUser(req, res) {
    models.User.findOne({
      where: { id: req.params.id }
    }).then((foundUser) => {
      foundUser.update(req.body).then((updatedUser) => {
        res.status(200).json({
          success: 'Group details updated successfully.',
          updatedUser
        });
      }).catch((err) => {
        res.status(500).json({
          globals: err.errors[0].message || err.message
        });
      });
    }).catch((err) => {
      res.status(500).json({
        globals: err.errors[0].message || err.message
      });
    });
  }
}
