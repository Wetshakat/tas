
function updateBudget() {
    const budgetInputField = document.querySelector('.budget-input-field');
    const totalBudgetDisplay = document.querySelector('.total-budget');
    const balanceDisplay = document.querySelector('.balance');
    const exceededWarning = document.querySelector('.exceeded');

    const inputValue = parseFloat(prompt('Enter the budget amount:'));

    if (isNaN(inputValue) || inputValue <= 0) {
        alert('Please enter a valid positive number.');
        return;
    }

    const currentBudget = parseFloat(totalBudgetDisplay.textContent.replace('N', '').replace(',', '')) || 0;
    const currentBalance = parseFloat(balanceDisplay.textContent.replace('N', '').replace(',', '')) || 0;

    const newBudget = currentBudget + inputValue;
    const newBalance = currentBalance + inputValue;

    totalBudgetDisplay.textContent = `N${newBudget.toLocaleString()}`;
    balanceDisplay.textContent = `N${newBalance.toLocaleString()}`;

    exceededWarning.classList.add('hidden');
    budgetInputField.value = '';
}


function addBudgetedItem(itemName, itemPrice) {
    const itemList = document.querySelector('.item-list');
    const balanceDisplay = document.querySelector('.balance');
    const exceededWarning = document.querySelector('.exceeded');

    const currentBalance = parseFloat(balanceDisplay.textContent.replace('N', '').replace(',', '')) || 0;

    if (currentBalance - itemPrice < 0) {
        alert("You can't add this item. Your budget is insufficient.");
        return;
    }

    
    const listItem = document.createElement('li');
    listItem.className = 'item flex items-center bg-gray-100 p-3 rounded shadow';
    listItem.innerHTML = `
        <span class="item-name flex-grow text-gray-700">${itemName}</span>
        <span class="item-price font-bold text-gray-900">N${itemPrice.toLocaleString()}</span>
    `;
    itemList.appendChild(listItem);

    
    const newBalance = currentBalance - itemPrice;
    balanceDisplay.textContent = `N${newBalance.toLocaleString()}`;

    if (newBalance < 0) {
        exceededWarning.classList.remove('hidden');
        exceededWarning.textContent = `Exceeded by: N${Math.abs(newBalance).toLocaleString()}`;
    } else {
        exceededWarning.classList.add('hidden');
    }
}


function addHistoryItem(itemName, itemPrice) {
    const historyList = document.querySelector('.history-list');
    const totalDisplay = document.querySelector('.total span');

    
    const historyItem = document.createElement('li');
    historyItem.className = 'history-item flex items-center bg-gray-100 p-3 rounded shadow';
    historyItem.innerHTML = `
        <span class="item-name flex-grow text-gray-700">${itemName}</span>
        <div class="item-price text-sm text-gray-600">
            <span class="price-label font-medium">Price:</span>
            <span class="price-value ml-2 font-bold">N${itemPrice.toLocaleString()}</span>
        </div>
    `;
    historyList.appendChild(historyItem);

    
    let currentTotal = parseFloat(totalDisplay.textContent.replace('N', '').replace(',', '')) || 0;
    currentTotal += itemPrice;
    totalDisplay.textContent = `N${currentTotal.toLocaleString()}`;
}


document.querySelector('.update-budget').addEventListener('click', updateBudget);


document.querySelector('.add-budget').addEventListener('click', () => {
    const itemName = prompt('Enter the name of the item:');
    const itemPrice = parseFloat(prompt('Enter the price of the item:'));

    if (itemName && !isNaN(itemPrice) && itemPrice > 0) {
        addBudgetedItem(itemName, itemPrice);
        addHistoryItem(itemName, itemPrice);
    } else {
        alert('Please enter a valid item name and price.');
    }
});
