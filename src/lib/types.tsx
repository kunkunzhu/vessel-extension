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

export interface DefinitionsI {
  type: string;
  meanings: string[];
}

export interface WordI {
  word: string;
  phonetic?: string;
  definitions: DefinitionsI[];
}
