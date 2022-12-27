
import {auth, db, doc, signOut, updateDoc} from "../FirebaseAPI/Firebase";


export const LogOut = async () => {
    await updateDoc(doc(db, 'users', auth.currentUser.uid), {isOnline: false})
    await  signOut(auth);
    window.location.href='/';

}