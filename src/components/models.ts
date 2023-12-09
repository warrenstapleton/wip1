export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface INote {
  title: string
  description: string
  content: string
}

export class Note implements INote {
  constructor(
    public title: string = '',
    public description: string = '',
    public content: string = ''
  ) {}
}
