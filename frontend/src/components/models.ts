export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface IProject {
  name: string
  owner: string
  completed: boolean
}

export class Project implements IProject {
  constructor(
    public name: string = '',
    public owner: string = '',
    public completed: boolean = false
  ) {}
}
