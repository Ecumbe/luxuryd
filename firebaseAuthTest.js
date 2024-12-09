// firebaseAuthTest.js
const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');
const readlineSync = require('readline-sync');
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

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
// Solicitar el correo y la contraseña del usuario
const email = readlineSync.question('Ingresa tu correo de usuario: ');
const password = readlineSync.question('Ingresa tu contraseña: ', { hideEchoBack: true }); // `hideEchoBack: true` para ocultar la contraseña mientras la escribes

// Intentar iniciar sesión con el correo y contraseña proporcionados
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Si la autenticación es exitosa, muestra el usuario
    const user = userCredential.user;
    console.log('¡Conexión exitosa a Firebase! Usuario:', user.email);
  })
  .catch((error) => {
    // Si hay error, muestra el mensaje de error
    console.error('Error de autenticación:', error.message);
  });
