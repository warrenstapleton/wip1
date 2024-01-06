import { Context } from '../models/context.js';
import { VerifyAuthorization } from '../decorators/auth.decorator.js';

import Projects from '../models/projects.js';
import mongoose, { Types } from 'mongoose';

export class ProjectsController {
  @VerifyAuthorization
  getProject(args: any, _: Context) {
    const id = new mongoose.Types.ObjectId(args.id)
    return Projects.findById(id)
      .then((project: any) => {
        console.log("warren: getProject result=",project)
        return project;
      });
  }

  @VerifyAuthorization
  getProjects(args: any, _: any) {
    console.log("warren: getProjects args=",args)
    return Projects.find()
      .then((projects: any) => {
        return projects;
      });
  }

  @VerifyAuthorization
  addProject(inputObject: any, _: any) {
    console.log("warren: addProject inputObject=",inputObject)
    return Projects.create(inputObject.input).then((projectInfo: any) => {
      return projectInfo;
    });
  }

  @VerifyAuthorization
  updateProject(inputObject: any, _: any) {
    const id = new mongoose.Types.ObjectId(inputObject.id)
    return Projects.findOneAndUpdate({ _id: id }, inputObject.input, { new: true }).then(
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
