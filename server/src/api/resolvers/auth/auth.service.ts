import { fetch } from "apollo-server-env";



export class AuthService {
  static async auth(email: string, password: string, { user }) {
    // if (!email) {
    //   return res.status(422).json({
    //     errors: {
    //       email: 'is required',
    //     },
    //   });
    // }

    // if (!password) {
    //   return res.status(422).json({
    //     errors: {
    //       password: 'is required',
    //     },
    //   });
    // }



    try {
      const data = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      let response = await data.json();
      return response.user;
    }
    catch (err) {
      console.log(err);
    }
  }
}