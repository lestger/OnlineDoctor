import {doc, updateDoc} from "../FirebaseAPI/Firebase";

export const UpdateDoc=async (db, path, uid, data) => {await updateDoc(doc(db, path, uid), {data})
}