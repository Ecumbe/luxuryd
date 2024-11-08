import { db, auth } from './firebaseConfig.js';
import { collection, getDocs, query, where, deleteDoc, doc } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js';
import { signOut } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js';

const filterDateInput = document.getElementById('filter-date');
const filterButton = document.getElementById('filter-button');
const invoiceBody = document.getElementById('invoice-body');

// Función para cargar facturas por fecha
async function loadInvoicesByDate(date) {
    invoiceBody.innerHTML = ''; // Limpiar tabla antes de mostrar resultados

    const invoicesQuery = query(collection(db, 'ventas'), where("fecha", "==", date));
    const querySnapshot = await getDocs(invoicesQuery);

    querySnapshot.forEach((doc) => {
        const invoice = doc.data();
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${invoice.fecha}</td>
            <td>${invoice.productos}</td>
            <td>${invoice.t_pago}</td>
            <td>${invoice.cuenta}</td>
            <td>${invoice.banco}</td>
            <td>${invoice.trabajadora}</td>
            <td>$${invoice.valor.toFixed(2)}</td>
            <td><button class="delete-button" data-id="${doc.id}">Eliminar</button></td>
        `;

        invoiceBody.appendChild(row);
    });

    // Agregar eventos a los botones de eliminar
    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', async (event) => {
            const invoiceId = event.target.getAttribute('data-id');
            const confirmDelete = confirm("¿Está seguro de que desea eliminar esta factura?");
            if (confirmDelete) {
                try {
                    await deleteDoc(doc(db, 'ventas', invoiceId));
                    alert("Factura eliminada.");
                    loadInvoicesByDate(date); // Recargar tabla después de eliminar
                } catch (error) {
                    console.error("Error al eliminar la factura:", error);
                    alert("Error al eliminar la factura.");
                }
            }
        });
    });
}

// Filtrar facturas por fecha seleccionada
filterButton.addEventListener('click', () => {
    const selectedDate = filterDateInput.value;
    if (selectedDate) {
        loadInvoicesByDate(selectedDate);
    } else {
        alert("Por favor, seleccione una fecha.");
    }
});

// Botón Volver: Regresar a facturas.html
document.getElementById('back').addEventListener('click', function() {
    window.location.href = 'facturar.html';  // Cambiar a la página de facturas
});

// Botón Cerrar sesión: Redirigir a la página de inicio de sesión
document.getElementById('logout').addEventListener('click', function() {
    signOut(auth).then(() => {
        window.location.href = 'login.html';  // Redirigir a la página de login
    }).catch((error) => {
        console.error("Error al cerrar sesión:", error);
    });
});
