import {initializeApp} from 'firebase/app'
import { getDatabase, ref, onValue, get, set, child } from "firebase/database"

// Initialize Firebase
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC120wGuWMILS2uz80JmSe9ImX4htXLEhw",
    authDomain: "pps-inventory.firebaseapp.com",
    databaseURL: "https://pps-inventory-default-rtdb.firebaseio.com",
    projectId: "pps-inventory",
    storageBucket: "pps-inventory.appspot.com",
    messagingSenderId: "208331884876",
    appId: "1:208331884876:web:2cb0cf5904eaf2bc0fa7e9",
    measurementId: "G-5WL6LQ6X3K"
  };

  
  // Initialize Firebase
  const App = initializeApp(firebaseConfig);

  
  // Initialize Realtime Database and get a reference to the service
  export const db = getDatabase(App);
  export const ordersRef = ref(db, '/Orders')
 

