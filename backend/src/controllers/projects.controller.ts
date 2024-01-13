import { Context } from '../models/context.js';
import { VerifyAuthorization } from '../decorators/auth.decorator.js';

import Projects from '../models/projects.js';
import { Types } from 'mongoose';
import Blogs from '../models/blogs';

export class ProjectsController {
  @VerifyAuthorization
  getProject(args: any, _: Context) {
    const id = new Types.ObjectId(args.id)
    return Projects.findById(id)
      .then((project: any) => {
        return project;
      });
  }

  @VerifyAuthorization
  getProjects(args: any, _: any) {
    return Projects.find()
      .then((projects: any) => {
        return projects;
      });
  }

  @VerifyAuthorization
  addProject(inputObject: any, _: any) {
    return Projects.create(inputObject.input).then((projectInfo: any) => {
      return projectInfo;
    });
  }

  @VerifyAuthorization
  updateProject(inputObject: any, _: any) {
    const id = new Types.ObjectId(inputObject.id)
    console.log("warren: debug: id=", inputObject.id)

    return Projects.findOneAndUpdate({ _id: inputObject.id }, inputObject.input, { new: true }).then(
      (projectInfo: any) => {
        return projectInfo;
      }
    );
  }

  @VerifyAuthorization
  deleteProject(inputObject: any, _: any) {
    const id = new Types.ObjectId(inputObject.id)
    console.log("warren: debug: delete id=", inputObject.id)

    return Projects.findOneAndDelete({ _id: id }).then((projectInfo: any) => {
      return projectInfo;
    });
  }
}
