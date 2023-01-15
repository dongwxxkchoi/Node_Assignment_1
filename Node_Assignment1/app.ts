import express from "express";
import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";
import { Firestore, getFirestore} from "firebase/firestore";
import dotenv from "dotenv";

const app = express();
const indexRouter = require('./router/index');
const postRouter = require("./router/post");

app.use(express.urlencoded({extended: true}));
app.use(express.json());

dotenv.config();

const firebaseConfig: FirebaseOptions = {
    apiKey: process.env.FB_API_KEY,
    authDomain: process.env.FB_AUTH_DOMAIN,
    projectId: process.env.FB_PROJECT_ID,
    appId: process.env.FB_APP_ID
};

let firebaseApp: FirebaseApp;
let firebaseDB: Firestore;

firebaseApp = initializeApp(firebaseConfig);
firebaseDB = getFirestore();

export {firebaseApp, firebaseDB};

app.use('/', indexRouter);

app.use('/post', postRouter);

app.listen(8081, () => {
    console.log("Server is Listening on Port 8081!");
});