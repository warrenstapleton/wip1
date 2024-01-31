import { Context } from '../models/context.js';
import { VerifyAuthorization } from '../decorators/auth.decorator.js';

import Projects from '../models/projects.js';
import { Types } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import Blogs from '../models/blogs';

export class ProjectsController {
  @VerifyAuthorization
  getProject(args: any, _: Context) {
    const id = new Types.ObjectId(args.id);
    return Projects.findById(id)
      .then((project: any) => {
        return project;
      });
  }

  @VerifyAuthorization
  getProjects(args: any, _: any) {
    const { page, limit } = args;
    console.log('warren: getProjects args=', args, page, limit);

    const myCustomLabels = {
      totalDocs: 'total',
      docs: 'projects',
      limit: 'limit',
      page: 'page',
      nextPage: 'nextPage',
      prevPage: 'prevPage',
      totalPages: 'pageCount',
      pagingCounter: 'page',
      meta: 'paginator',
    };

    const options = {
      page: page || 1,
      limit: limit || 10,
      customLabels: myCustomLabels
    };

    return Projects.paginate({}, options).then((result: any) => {
      console.log("warren: result=",result)
      return result
    });

    // return Projects.find()
    //   .skip(offset)
    //   .limit(first)
    //   .then((projects: any) => {
    //     return projects;
    //   });

    // (obj, { pageSize = 10, page = 0 }) => {
    //   return Foo.find()
    //     .skip(page*pageSize)
    //     .limit(pageSize)
    //     .exec()
    // }
    // Using _id as a cursor:
    //
    //   (obj, { pageSize = 10, cursor }) => {
    //     const params = cursor ? {'_id': {'$gt': cursor}} : undefined
    //     return Foo.find(params).limit(pageSize).exec()
    //   }
    //
  }

  @VerifyAuthorization
  addProject(inputObject: any, _: any) {
    console.log('warren: addProject: start');
    return Projects.create(inputObject.input).then((projectInfo: any) => {
      console.log('warren: addProject: projectInfo=', projectInfo);
      return projectInfo;
    });
  }

  @VerifyAuthorization
  updateProject(inputObject: any, _: any) {
    const id = new Types.ObjectId(inputObject.id);
    console.log('warren: debug: id=', inputObject.id);

    return Projects.findOneAndUpdate({ _id: inputObject.id }, inputObject.input, { new: true }).then(
      (projectInfo: any) => {
        return projectInfo;
      }
    );
  }

  @VerifyAuthorization
  deleteProject(inputObject: any, _: any) {
    const id = new Types.ObjectId(inputObject.id);
    console.log('warren: debug: delete id=', inputObject.id);

    return Projects.findOneAndDelete({ _id: id }).then((projectInfo: any) => {
      return projectInfo;
    });
  }
}
