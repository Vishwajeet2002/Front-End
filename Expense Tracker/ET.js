const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '') return;

  const transaction = {
    id: Date.now(),
    text: text.value,
    amount: +amount.value,
  };

  transactions.push(transaction);
  updateLocalStorage();
  addTransactionDOM(transaction);
  updateValues();

  text.value = '';
  amount.value = '';
}

function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? '-' : '+';
  const item = document.createElement('li');
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
  item.innerHTML = `
    ${transaction.text}
    <span>${sign}$${Math.abs(transaction.amount).toFixed(2)}</span>
    <button onclick="removeTransaction(${transaction.id})">x</button>
  `;
  list.appendChild(item);
}

function updateValues() {
  const amounts = transactions.map(t => t.amount);
  const total = amounts.reduce((acc, val) => acc + val, 0).toFixed(2);
  const income = amounts.filter(v => v > 0).reduce((acc, val) => acc + val, 0).toFixed(2);
  const expense = amounts.filter(v => v < 0).reduce((acc, val) => acc + val, 0).toFixed(2);

  balance.textContent = `$${total}`;
  money_plus.textContent = `+$${income}`;
  money_minus.textContent = `-$${Math.abs(expense)}`;
}

function removeTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  updateLocalStorage();
  init();
}

function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

function init() {
  list.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();
form.addEventListener('submit', addTransaction);
