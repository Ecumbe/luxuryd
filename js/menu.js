// js/menu.js

import { auth } from './firebaseConfig.js';
import { signOut } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js';

// Maneja el cierre de sesión
document.getElementById('logout').addEventListener('click', async () => {
    try {
        await signOut(auth);
        // Redirigir a la pantalla de inicio
        window.location.href = "index.html";
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
    }
});

// Funcionalidades para los otros botones
document.getElementById('facturar').addEventListener('click', () => {
    window.location.href = "facturar.html";
});

document.getElementById('productos').addEventListener('click', () => {
    window.location.href = "productos.html";
});

document.getElementById('agendar-cita').addEventListener('click', () => {
    window.location.href = "agendar-cita.html";
});

document.getElementById('balance').addEventListener('click', () => {
    window.location.href = "balance.html";
});

// Nueva funcionalidad para el botón "Trabajadora"
document.getElementById('trabajadora').addEventListener('click', () => {
    window.location.href = "trabajadora.html";
});
