import { VerifyAuthorization } from '../decorators/auth.decorator.js';
import { Context } from '../models/context.js';
import Comments from '../models/comments.js';
import Blogs from '../models/blogs.js';
import Users from '../models/users.js';

export class CommentsController {
  // @VerifyAuthorization warren:TODO
  async addComment(inputObject: any, _ctx: Context) {
    const userMongoId = await Users.findOne({ email: _ctx.email }).then((userObject: any) => {
      return userObject._id;
    });

    return Comments.create({ comment: inputObject.commentDescription, user: userMongoId })
      .then((commentInfo: any) => {
        return Blogs.findOneAndUpdate(
          {
            url: inputObject.blogUrl
          },
          { $push: { comments: commentInfo._id } },
          { new: true }
        ).populate({
          path: 'comments',
          model: 'Comment',
          populate: {
            path: 'user',
            model: 'User'
          }
        });
      })
      .catch((err: any) => {
        throw err;
      });
  }

  // @VerifyAuthorization
  updateComment(inputObject: any, _ctx: Context) {
    return Comments.findOneAndUpdate({ _id: inputObject.id }, inputObject.input, { new: true }).then(
      (blogInfo: any) => {
        return blogInfo;
      }
    );
  }

  // @VerifyAuthorization
  deleteComment(inputObject: any, _ctx: Context) {
    return Comments.findOneAndDelete({ _id: inputObject.id }).then((blogInfo: any) => {
      return blogInfo;
    });
  }
}
