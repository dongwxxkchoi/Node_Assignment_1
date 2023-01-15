import express, { Request, Response, NextFunction } from "express";
import { firebaseApp, firebaseDB } from "../app";
import { getCountFromServer, doc, getDoc, setDoc, collection, getDocs  } from "firebase/firestore";

const router = express.Router();

router.use(express.urlencoded({extended: true}));
router.use(express.json());

router.get('/getPostData', async(req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const colDocPath = "Collection/"+query.Collection+"/Docs/"+query.Docs;
    const colDocSnap = await getDoc(doc(firebaseDB, colDocPath));

    if (colDocSnap.exists()){
        const docPath = "Document/"+colDocSnap.data().doc_id;
        const docSnap = await getDoc(doc(firebaseDB, docPath));
        res.send(docSnap.data());
    }
    else{
        res.send("nothing");
    }
})

router.post('/addPost', async(req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    const input = req.body;

    // Add on Document
    const documentReference = collection(firebaseDB, "Document");
    const docCountSnapshot = await getCountFromServer(documentReference);
    const docCount: number = docCountSnapshot.data().count;
    const nextDocID: string = (docCount + 1).toString();

    await setDoc(doc(firebaseDB, "Document", nextDocID), input);
    const docName = docCount + 1;
    const docType = "Collection/"+input.Collection+"/Docs";

    // Add on Collection
    const collectionReference = collection(firebaseDB, docType);
    const colCountSnapshot = await getCountFromServer(collectionReference);
    const colDocCount: number = colCountSnapshot.data().count;
    const nextColDocID: string = (colDocCount + 1).toString();

    const DOC_REF = {
        "doc_id": docName
    }

    await setDoc(doc(firebaseDB, docType, nextColDocID), DOC_REF);
    res.send(nextDocID);
})

router.post('/getPostList', async(req: Request, res: Response, next: NextFunction) => {
    const input = req.body;
    const docType = "Collection/"+input.Collection+"/Docs";

    const collectionReference = collection(firebaseDB, docType);
    const colCountSnapshot = await getCountFromServer(collectionReference);
    const colDocCount: number = colCountSnapshot.data().count;
    const colDocIDArray: number[] = [];

    const snapshot = await getDocs(collectionReference);

    snapshot.forEach((doc) => {
        colDocIDArray.push(doc.data().doc_id);
    });

    res.send("total document number: " + colDocCount + " document ID: " + colDocIDArray);
});

module.exports = router;