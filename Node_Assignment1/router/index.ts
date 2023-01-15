import express, { Request, Response, NextFunction } from "express";
import {doc, setDoc} from "firebase/firestore";

const router = express.Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("Hello, World!");
});

router.post('/', (req: Request, res: Response, next: NextFunction) => {
    res.send("hello");
})

// app.post("/", async (req: Request, res: Response) => {
//     // const docRef = doc(firebaseDB, "project", "breaker");
//     // const docSnap = await getDoc(docRef);
//     //
//     // if(docSnap.exists()){
//     //     console.log("Document data:", docSnap.data());
//     // }else{
//     //     console.log("No such document!");
//     // }
//
//     // const querySnapshot = await getDocs(collection(firebaseDB, "project"));
//     // querySnapshot.forEach((doc) => {
//     //     console.log(doc.id, " => ", doc.data());
//     // });
//
//     const NEW_DATA = {
//         "asddf": 1,
//         "qwer": 2
//     };
//
//     await setDoc(doc(firebaseDB, "project", "healer"), NEW_DATA);
//
//     res.send("");
// });

module.exports = router;
