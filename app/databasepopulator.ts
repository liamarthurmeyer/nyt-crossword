import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDRbgO9UTGKug9fCDwmdSg-MbgtpAltq3w",
    authDomain: "ultimatebravery-aeb1d.firebaseapp.com",
    projectId: "ultimatebravery-aeb1d",
    storageBucket: "ultimatebravery-aeb1d.appspot.com",
    messagingSenderId: "953249979573",
    appId: "1:953249979573:web:09ef2ae14f5b28f79332fc",
    measurementId: "G-W7VMTKZH4B"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export function populateDatabase() {

    console.log("Button clicked!");

    let symbol = "AAPL";
    let name = "Apple";
    let url = "www.apple.com";
    let lastSale = 6.53;

    const db = getDatabase();
    set(ref(db, symbol), {
        name: name,
        url: url,
        lastSale: lastSale
    });

}