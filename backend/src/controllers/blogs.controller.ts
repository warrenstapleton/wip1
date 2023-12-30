import { Context } from '../models/context.js';
import { VerifyAuthorization } from '../decorators/auth.decorator.js';

import Blogs from '../models/blogs.js';

export class BlogsController {
  @VerifyAuthorization
  getBlog(args: any, _: Context) {
    return Blogs.find({ url: args['url'] })
      .populate({
        path: 'comments',
        model: 'Comment',
        populate: {
          path: 'user',
          model: 'User',
        },
      })
      .then((blogs: any) => {
        return blogs[0];
      });
  }

  @VerifyAuthorization
  getBlogs(args: any, _: any) {
    return Blogs.find()
      .populate({
        path: 'comments',
        model: 'Comment',
        populate: {
          path: 'user',
          model: 'User',
        },
      })
      .then((blogs: any) => {
        return blogs;
      });
  }

  @VerifyAuthorization
  addBlog(inputObject: any, _: any) {
    return Blogs.create(inputObject.input).then((blogInfo: any) => {
      return blogInfo;
    });
  }

  @VerifyAuthorization
  updateBlog(inputObject: any, _: any) {
    return Blogs.findOneAndUpdate({ _id: inputObject.id }, inputObject.input, { new: true }).then(
      (blogInfo: any) => {
        return blogInfo;
      }
    );
  }

  @VerifyAuthorization
  deleteBlog(inputObject: any, _: any) {
    return Blogs.findOneAndDelete({ _id: inputObject.id }).then((blogInfo: any) => {
      return blogInfo;
    });
  }
}
