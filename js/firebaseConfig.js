// js/firebaseConfig.js

// Importa las funciones necesarias desde el SDK de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
//import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// Configuración de Firebase proporcionada
const firebaseConfig = {
    apiKey: "AIzaSyD4eMcKCkE1IRsEE2F6fRs6AYs27Bdz6ZM",
    authDomain: "luxury-8df14.firebaseapp.com",
    projectId: "luxury-8df14",
    storageBucket: "luxury-8df14.firebasestorage.app",
    messagingSenderId: "393948865590",
    appId: "1:393948865590:web:dd956e78a1f6677415e497",
    measurementId: "G-5ZY1JZ842V"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
// Inicializa Firebase Authentication y Firestore
const auth = getAuth(app);
const db = getFirestore(app); // Inicializa Firestore

// Exporta el módulo de autenticación y Firestore para que puedan ser usados en otros archivos
export { auth, db };
