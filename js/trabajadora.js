// js/trabajadora.js

import { db } from './firebaseConfig.js';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js';

const trabajadoraForm = document.getElementById('trabajadora-form');
const workerList = document.getElementById('worker-list');
const backButton = document.getElementById('back');

const workersCollection = collection(db, 'trabajadoras'); // Nueva colección en Firestore para "Trabajadoras"

// Agregar una nueva trabajadora
trabajadoraForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const workerName = document.getElementById('worker-name').value;
    const workerPercentage = parseFloat(document.getElementById('worker-percentage').value);
    
    try {
        await addDoc(workersCollection, {
            name: workerName,
            percentage: workerPercentage
        });
        document.getElementById('worker-name').value = '';
        document.getElementById('worker-percentage').value = '';
        loadWorkers(); // Cargar trabajadoras después de agregar una
    } catch (error) {
        console.error("Error al agregar la trabajadora:", error);
    }
});

// Cargar trabajadoras desde Firestore
const loadWorkers = async () => {
    const workerSnapshot = await getDocs(workersCollection);
    workerList.innerHTML = ''; // Limpiar la lista antes de cargar
    workerSnapshot.forEach((doc) => {
        const worker = doc.data();
        const workerItem = document.createElement('div');
        workerItem.classList.add('worker-item');
        workerItem.innerHTML = `
            <span>${worker.name} - ${worker.percentage}%</span>
            <div>
                <button onclick="editWorker('${doc.id}', '${worker.name}', ${worker.percentage})">Editar</button>
                <button onclick="deleteWorker('${doc.id}')">Borrar</button>
            </div>
        `;
        workerList.appendChild(workerItem);
    });
};

// Borrar una trabajadora
window.deleteWorker = async (id) => {
    try {
        await deleteDoc(doc(workersCollection, id));
        loadWorkers(); // Recargar trabajadoras después de borrar
    } catch (error) {
        console.error("Error al borrar la trabajadora:", error);
    }
};

// Editar una trabajadora
window.editWorker = async (id, currentName, currentPercentage) => {
    const newName = prompt("Nuevo nombre de la trabajadora:", currentName);
    const newPercentage = parseFloat(prompt("Nuevo porcentaje de ganancia (%):", currentPercentage));
    
    if (newName && !isNaN(newPercentage)) {
        try {
            await updateDoc(doc(workersCollection, id), {
                name: newName,
                percentage: newPercentage
            });
            loadWorkers(); // Recargar trabajadoras después de editar
        } catch (error) {
            console.error("Error al editar la trabajadora:", error);
        }
    } else {
        alert("Por favor ingrese valores válidos.");
    }
};

// Cargar trabajadoras al iniciar la página
loadWorkers();

// Manejar el botón de atrás
backButton.addEventListener('click', () => {
    window.location.href = "menu.html";
});
