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
 
export const checkInfo = async (currentUser) => {
  const uid = currentUser.uid;
  const userDoc = await firebase.firestore().collection("users").doc(uid).get();
  console.log("doc",userDoc);
  if (!userDoc.exists) {
    await firebase.firestore().collection("users").doc(uid).set({ name: currentUser.displayName });
    return {
export const uiConfig = {
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
}; 
export const updateUser = async (user, image) => {
  try {
    const userDoc = await firebase.firestore().collection("users").doc(user.id).get();
    if (userDoc.exists) {
      await firebase.firestore().collection("users").doc(user.id).update({ ...userDoc.data(), image: image });
    }
  } catch (err) {
    console.log(err);
  }
}

export const uploadImage = async (image) => {
  const ref = firebase.storage().ref().child(`/images/${image.name}`);
  let url = "";
  try {
    await ref.put(image);
    url = await ref.getDownloadURL();
  } catch (err) {
    console.log(err);
  }
  return url;
};