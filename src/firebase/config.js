import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
apiKey: "AIzaSyAURqya1OnP0iSbUBkgzQQJzUycBnDYxBU",
authDomain: "tunthitsar-8da39.firebaseapp.com",
projectId: "tunthitsar-8da39",
storageBucket: "tunthitsar-8da39.appspot.com",
messagingSenderId: "892853448262",
appId: "1:892853448262:web:7b1eec813ae93ac978a447"
};

// init firebase
initializeApp(firebaseConfig)

// init services
const db = getFirestore()
const auth = getAuth()

export { db, auth }