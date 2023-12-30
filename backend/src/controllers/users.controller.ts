import { Context } from '../models/context.js';

import Users from '../models/users.js';

export class UsersController {
  addUser(inputObject: any, ctx: Context) {
    return Users.create(inputObject.input).then((userInfo: any) => {
      return userInfo;
    });
  }

  updateUser(inputObject: any, ctx: Context) {
    return Users.findOneAndUpdate({ _id: inputObject.id }, inputObject.input, { new: true }).then(
      (userInfo: any) => {
        return userInfo;
      }
    );
  }
}
