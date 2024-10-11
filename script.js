// Elementos del DOM
const form = document.getElementById('inventoryForm');
const itemNameInput = document.getElementById('itemName');
const itemQuantityInput = document.getElementById('itemQuantity');
const itemPriceInput = document.getElementById('itemPrice');
const submitBtn = document.getElementById('submitBtn');
const inventoryTable = document.getElementById('inventoryTable').getElementsByTagName('tbody')[0];
const itemIdInput = document.getElementById('itemId');

// Cargar inventario al inicio
document.addEventListener('DOMContentLoaded', loadInventory);

// Event listener para el formulario
form.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(e) {
    e.preventDefault();
    const item = {
        id: itemIdInput.value || Date.now(),
        name: itemNameInput.value,
        quantity: itemQuantityInput.value,
        price: itemPriceInput.value
    };

    if (itemIdInput.value) {
        updateItem(item);
    } else {
        addItem(item);
    }

    resetForm();
    loadInventory();
}

function addItem(item) {
    let inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    inventory.push(item);
    localStorage.setItem('inventory', JSON.stringify(inventory));
}

function updateItem(item) {
    let inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    const index = inventory.findIndex(i => i.id == item.id);
    if (index !== -1) {
        inventory[index] = item;
        localStorage.setItem('inventory', JSON.stringify(inventory));
    }
}

function deleteItem(id) {
    let inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    inventory = inventory.filter(item => item.id != id);
    localStorage.setItem('inventory', JSON.stringify(inventory));
    loadInventory();
}

function loadInventory() {
    const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    inventoryTable.innerHTML = '';
    inventory.forEach(item => {
        const row = inventoryTable.insertRow();
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>$${item.price}</td>
            <td>
                <button class="edit-btn" onclick="editItem('${item.id}')">Editar</button>
                <button class="delete-btn" onclick="deleteItem('${item.id}')">Eliminar</button>
            </td>
        `;
    });
}

function editItem(id) {
    const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    const item = inventory.find(item => item.id == id);
    if (item) {
        itemIdInput.value = item.id;
        itemNameInput.value = item.name;
        itemQuantityInput.value = item.quantity;
        itemPriceInput.value = item.price;
        submitBtn.textContent = 'Actualizar Artículo';
    }
}

function resetForm() {
    form.reset();
    itemIdInput.value = '';
    submitBtn.textContent = 'Agregar Artículo';
}
