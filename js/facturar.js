import { db, auth } from './firebaseConfig.js';
import { collection, addDoc, getDocs } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js';
import { signOut } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js';

const productDropdown = document.getElementById('product-dropdown');
const selectedProductsList = document.getElementById('selected-products-list');
const totalAmount = document.getElementById('total-amount');
const paymentMethod = document.getElementById('payment-method');
const accountSelection = document.getElementById('account-selection');
const bankSelection = document.getElementById('bank-selection');
const account = document.getElementById('account');
const bank = document.getElementById('bank');
const saveInvoiceButton = document.getElementById('save-invoice');
const facturaDate = document.getElementById('factura-date');
const trabajadoraDropdown = document.getElementById('trabajadora');
const reviewInvoicesButton = document.getElementById('review-invoices');
let selectedProducts = [];
let total = 0;

// Cargar productos desde Firebase y llenar el dropdown
async function loadProducts() {
    const querySnapshot = await getDocs(collection(db, 'productos'));
    querySnapshot.forEach((doc) => {
        const product = doc.data();
        const option = document.createElement('option');
        option.value = product.name;
        option.textContent = `${product.name} - $${product.price.toFixed(2)}`;
        option.dataset.price = product.price;
        productDropdown.appendChild(option);
    });
}

// Cargar nombres de trabajadoras desde Firebase
async function loadTrabajadoras() {
    const querySnapshot = await getDocs(collection(db, 'trabajadoras'));
    querySnapshot.forEach((doc) => {
        const trabajadora = doc.data();
        const option = document.createElement('option');
        option.value = trabajadora.name;
        option.textContent = trabajadora.name;
        trabajadoraDropdown.appendChild(option);
    });
}

// Actualizar el total
function updateTotal() {
    total = selectedProducts.reduce((sum, product) => sum + product.price, 0);
    totalAmount.textContent = total.toFixed(2);
}

// Añadir producto a la lista seleccionada
productDropdown.addEventListener('change', () => {
    const selectedOption = productDropdown.options[productDropdown.selectedIndex];
    const productName = selectedOption.value;
    const productPrice = parseFloat(selectedOption.dataset.price);

    if (!productName) return;

    const product = { name: productName, price: productPrice };

    selectedProducts.push(product);
    updateTotal();

    const productItem = document.createElement('div');
    productItem.classList.add('product-item');
    productItem.textContent = `${productName} - $${productPrice.toFixed(2)}`;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Eliminar';
    removeButton.onclick = () => {
        selectedProducts = selectedProducts.filter(p => p !== product);
        updateTotal();
        selectedProductsList.removeChild(productItem);
    };

    productItem.appendChild(removeButton);
    selectedProductsList.appendChild(productItem);
    productDropdown.value = ''; // Reset dropdown after selection
});

// Mostrar u ocultar opciones de cuenta y banco según el método de pago
paymentMethod.addEventListener('change', () => {
    if (paymentMethod.value === 'transferencia') {
        accountSelection.style.display = 'block';
        bankSelection.style.display = 'block';
    } else {
        accountSelection.style.display = 'none';
        bankSelection.style.display = 'none';
    }
});

// Confirmar y guardar factura en Firebase
saveInvoiceButton.addEventListener('click', async () => {
    if (!facturaDate.value || selectedProducts.length === 0) {
        alert("Por favor, complete la fecha y seleccione al menos un producto.");
        return;
    }

    const confirmSave = confirm("¿Está seguro de que desea guardar la factura?");
    if (!confirmSave) return;

    const t_pago = paymentMethod.value;
    const cuenta = t_pago === 'transferencia' ? account.value : '';
    const banco = t_pago === 'transferencia' ? bank.value : '';
    const trabajadora = trabajadoraDropdown.value;
    const productos = selectedProducts.map(p => p.name).join(', ');

    try {
        await addDoc(collection(db, 'ventas'), {
            fecha: facturaDate.value,
            productos,
            t_pago,
            cuenta,
            banco,
            trabajadora,
            valor: total
        });
        alert("Factura guardada exitosamente.");
        selectedProducts = [];
        total = 0;
        totalAmount.textContent = '0.00';
        selectedProductsList.innerHTML = '';
    } catch (error) {
        console.error("Error al guardar la factura:", error);
    }
});

// Cerrar sesión
document.getElementById('logout').addEventListener('click', () => {
    signOut(auth).then(() => {
        window.location.href = "index.html";
    }).catch((error) => {
        console.error("Error al cerrar sesión:", error);
    });
});

// Redirigir a la página de revisión de facturas
reviewInvoicesButton.addEventListener('click', () => {
    window.location.href = "revisar.html";
});

// Regresar al menú
document.getElementById('back').addEventListener('click', () => {
    window.location.href = "menu.html";
});

// Cargar productos y trabajadoras al iniciar
loadProducts();
loadTrabajadoras();
