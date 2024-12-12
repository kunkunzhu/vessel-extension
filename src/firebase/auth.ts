/** @format */

import firebase_app from "../firebase/config";
import { getAuth } from "firebase/auth/web-extension";

const auth = getAuth(firebase_app);

export default auth;
