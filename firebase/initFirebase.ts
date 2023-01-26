// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDx2lHJJj2kt-GaHiHd8wvgLJ-IeJgW4WY',
  authDomain: 'post-a1f2e.firebaseapp.com',
  projectId: 'post-a1f2e',
  storageBucket: 'post-a1f2e.appspot.com',
  messagingSenderId: '161067646434',
  appId: '1:161067646434:web:5f4b68f22d25b1437b4dbb',
  measurementId: 'G-W870Y0D69T',
}

initializeApp(firebaseConfig)
// Initialize Firebase
// const app = initializeApp(firebaseConfig);

export const db = getFirestore()
