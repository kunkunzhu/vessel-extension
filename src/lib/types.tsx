/** @format */

import { User } from "firebase/auth";

export interface QueryMsgI {
  type: string;
}

export interface AuthResI {
  success: boolean;
  error?: any;
  user?: User;
}
