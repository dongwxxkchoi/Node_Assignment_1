"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initFirebase = void 0;
const express_1 = __importDefault(require("express"));
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
const feedRouter = require("./router/feed");
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
dotenv_1.default.config();
const firebaseConfig = {
    apiKey: process.env.FB_API_KEY,
    authDomain: process.env.FB_AUTH_DOMAIN,
    projectId: process.env.FB_PROJECT_ID,
    appId: process.env.FB_APP_ID
};
let firebaseApp;
let firebaseDB;
const initFirebase = () => {
    firebaseApp = (0, app_1.initializeApp)(firebaseConfig);
    firebaseDB = (0, firestore_1.getFirestore)();
    app.listen(8080, () => {
        console.log("Server is Listening on Port 8080!");
    });
};
exports.initFirebase = initFirebase;
(0, exports.initFirebase)();
app.get("/", (req, res) => {
    res.send("Hello, World!");
});
app.use('/feed', feedRouter);
app.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const docRef = doc(firebaseDB, "project", "breaker");
    // const docSnap = await getDoc(docRef);
    //
    // if(docSnap.exists()){
    //     console.log("Document data:", docSnap.data());
    // }else{
    //     console.log("No such document!");
    // }
    // const querySnapshot = await getDocs(collection(firebaseDB, "project"));
    // querySnapshot.forEach((doc) => {
    //     console.log(doc.id, " => ", doc.data());
    // });
    const NEW_DATA = {
        "asddf": 1,
        "qwer": 2
    };
    yield (0, firestore_1.setDoc)((0, firestore_1.doc)(firebaseDB, "project", "healer"), NEW_DATA);
    res.send("");
}));
app.listen(8080, () => {
    console.log("Server is Listening on Port 8080!");
});
