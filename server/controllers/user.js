const User = require(`../models/user`);
const {
  comparePassword,
  randomPassword,
  hashPassword
} = require(`../helpers/password`);
const { generateToken } = require(`../helpers/token`);
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);

class ControllerUser {
  static register(req, res, next) {
    if (!req.body.picture) {
      req.body.picture =
        "https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2016%2F08%2F08%2F09%2F17%2Favatar-1577909_960_720.png&f=1";
    }
    User.create(req.body)
      .then(created => {
        res.status(201).json(created);
      })
      .catch(next);
  }

  static login(req, res, next) {
    User.findOne({ email: req.body.email })
      .then(found => {
        if (found) {
          let { _id, email, name, picture, password } = found;
          if (comparePassword(req.body.password, password) === true) {
            let user = { _id, email, name, picture };
            let token = generateToken(user);
            res.status(200).json({ token, user });
          } else {
            next({ code: 400, message: `password / email wrong` });
          }
        } else {
          next({ code: 400, message: `password / email wrong` });
        }
      })
      .catch(next);
  }

  static logingoogle(req, res, next) {
    var newUser = {};
    client
      .verifyIdToken({
        idToken: req.body.idToken,
        audience: process.env.CLIENT_ID
      })
      .then(ticket => {
        let payload = ticket.getPayload();

        newUser = {
          name: payload.given_name + " " + payload.family_name,
          email: payload.email,
          password: randomPassword(),
          picture: payload.picture
        };
        return User.findOne({
          email: newUser.email
        });
      })
      .then(userLogin => {
        if (!userLogin) {
          return User.create(newUser);
        } else {
          return userLogin;
        }
      })
      .then(loggedIn => {
        let { _id, email, name, picture } = loggedIn;
        let user = { _id, email, name, picture };
        let token = generateToken(user);
        res.status(200).json({ token, user });
      })
      .catch(next);
  }

  static update(req, res, next) {
    if (req.body.password) {
      req.body.password = hashPassword(req.body.password);
    }
    User.findByIdAndUpdate(req.user._id, req.body)
      .then(updated => {
        res.status(200).json(updated);
      })
      .catch(next);
  }
}

module.exports = ControllerUser;
