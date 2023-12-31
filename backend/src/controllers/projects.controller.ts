import { Context } from '../models/context.js';
import { VerifyAuthorization } from '../decorators/auth.decorator.js';

import Projects from '../models/projects.js';

export class ProjectsController {
  @VerifyAuthorization
  getProject(args: any, _: Context) {
    return Projects.find({ url: args['url'] })
      .populate({
        path: 'comments',
        model: 'Comment',
        populate: {
          path: 'user',
          model: 'User',
        },
      })
      .then((projects: any) => {
        return projects[0];
      });
  }

  @VerifyAuthorization
  getProjects(args: any, _: any) {
    return Projects.find()
      .populate({
        path: 'comments',
        model: 'Comment',
        populate: {
          path: 'user',
          model: 'User',
        },
      })
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
    return Projects.findOneAndUpdate({ _id: inputObject.id }, inputObject.input, { new: true }).then(
      (projectInfo: any) => {
        return projectInfo;
      }
    );
  }

  @VerifyAuthorization
  deleteProject(inputObject: any, _: any) {
    return Projects.findOneAndDelete({ _id: inputObject.id }).then((projectInfo: any) => {
      return projectInfo;
    });
  }
}
