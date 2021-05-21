import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBGWhyvc8_J1t8xu8QV_5f2X41JExB-vFE",
    authDomain: "fir-simple-a61b2.firebaseapp.com",
    projectId: "fir-simple-a61b2",
    storageBucket: "fir-simple-a61b2.appspot.com",
    messagingSenderId: "610760324861",
    appId: "1:610760324861:web:c735d31d340fee28ca7094"
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

export default firebase;
const collection = firebase.firestore().collection("todos");

// get items
export const getFbItems = async () => {
    const data = await collection.get();
    const items = data.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id })
    );
    return items;
}
//add item
export const addFbItem = async (item) => {
    await collection.add(item);
}
//update item
export const updateFbItem = async (item, id) => {
    await collection.doc(id).update(item);
}
//delete item
export const deleteFbItem = async (item) => {
  const todoRef = collection.doc(item.id);
  await todoRef.delete().then(function () {
  }).catch(function (err) {
    console.log(err);
  });
};  
}; 
export const checkInfo = async (currentUser) => {
  const uid = currentUser.uid;
  const userDoc = await firebase.firestore().collection("users").doc(uid).get();
  if (!userDoc.exists) {
    await firebase.firestore().collection("users").doc(uid).set({ name: currentUser.displayName });
    return {
      name: currentUser.displayName,
      id: uid,
    };
  } else {
    return {
      id: uid,
      ...userDoc.data(),
    };
  }
} 

// Configure FirebaseUI.
export const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
}; 