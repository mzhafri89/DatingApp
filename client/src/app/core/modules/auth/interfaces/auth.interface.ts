import { User } from 'src/app/share/interfaces/user.interface';

export default interface Auth extends User {
  token: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}
