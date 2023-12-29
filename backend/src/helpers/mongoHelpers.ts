const User = require('../models/users');
import mongoose = require('mongoose');
import * as jwt from 'jsonwebtoken';
import { Config } from '../config';
export class MongoHelper {
  /**
   * This function returns either true of false based information present in the database
   * @param req
   */
  public async validateUser(req: any) {
    const token = req.headers.authorization || '';
    console.log("warren: validateUser token=", token)
    try {
      // console.log("warren: salt=",<string>process.env.auth_encryption_salt)
      const payload = <{ data: string; iat: number }>(
        jwt.verify(token, <string>process.env.auth_encryption_salt)
      );
      const email = payload['data'];
      return await User.find({ email: email }).then((response: any) => {
        // console.log("warren: find returned")
        if (response.length > 0) {
          // console.log("warren: isUserLogged: true")
          return { isUserLogged: true, email: email };
        }
        // console.log("warren: isUserLogged: false")
        return { isUserLogged: false };
      });
    } catch (error) {
      // console.log("warren: error=",error)
      return { isUserLogged: false };
    }
  }

  /**
   * This function will initiate the Mongo Database connection
   */
  public initiateMongoConnection(): void {
    (<any>mongoose).Promise = global.Promise;
    console.log("WARREN mongoUrl=", Config.mongoUrl)
    mongoose
      .connect(Config.mongoUrl, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      })
      .then(() => {
        console.log('Connected to MongoDb');
      })
      .catch((err: Error) => {
        throw `There is error in connecting Mongo DB ${err.message}`;
      });
  }
}
