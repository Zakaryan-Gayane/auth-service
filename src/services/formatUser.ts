import { User } from "../db/user.entity";


export interface IUser {
  id: number;
  email: string;
}

export class FormatUser {
  static me(user: User): IUser {
    const { id, email } = user;
    return { id, email };
  }
}