import Firebase from 'firebase/app';
import 'firebase/database';


const config = {
  // Paste your web app's Firebase configuration here
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: ''
};

Firebase.initializeApp(config);

export default Firebase;
export const Database = Firebase.database();

export const createUniqueKey = () => {
  return Database.ref('/').push().key;
}
