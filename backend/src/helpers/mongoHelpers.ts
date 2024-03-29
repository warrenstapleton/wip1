// const User = require('../models/users');
import User from '../models/users.js';
import * as mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
// import { Config } from '../config.js';
export class MongoHelper {
  /**
   * This function returns either true of false based information present in the database
   * @param req
   */
  public async validateUser(req: any) {
    const token = req.headers.authorization || '';
    console.log("warren: validateUser token=", token)
    try {
      const payload = <{ data: string; iat: number }>(
        jwt.verify(token, <string>process.env.auth_encryption_salt)
      );
      console.log("warren: validateUser payload=", payload)
      const email = payload['data'];
      console.log("warren: validateUser email=", email)
      return await User.find({ email: email }).then((response: any) => {
        console.log("warren User response=", response)
        if (response.length > 0) {
          return { isUserLogged: true, email: email };
        }
        return { isUserLogged: false };
      });
    } catch (error) {
      return { isUserLogged: false };
    }
  }

  /**
   * This function will initiate the Mongo Database connection
   */
  public initiateMongoConnection(): void {
    // (<any>mongoose).Promise = global.Promise;
    const mongoUrl = process.env.mongo_url
    mongoose
      .connect(mongoUrl, {})
      .then(() => {
        console.log('Connected to MongoDb');
      })
      .catch((err: Error) => {
        throw `There is error in connecting Mongo DB: ${err.message}`;
      });
  }
}
