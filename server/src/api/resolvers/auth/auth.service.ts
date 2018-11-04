import passport = require("passport");
import { fetch } from "apollo-server-env";

export class AuthService {
  static auth(email: string, password: string, { req, res, next }) {
    // console.log(req.headers.authorization);


    if (!email) {
      return res.status(422).json({
        errors: {
          email: 'is required',
        },
      });
    }

    if (!password) {
      return res.status(422).json({
        errors: {
          password: 'is required',
        },
      });
    }



    return fetch('http://localhost:3000/login',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
      .then(async data => {
        return await data.json();

      })
  }
}