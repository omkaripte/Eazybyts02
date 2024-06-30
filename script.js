const transactions = JSON.parse(localStorage.getItem
    ("transactions")) || [];

const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    signDisplay: 'always',
});

const list = document.getElementById("transaction-list");
const form = document.getElementById('transaction-form')
const status = document.getElementById("status");
const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");

form.addEventListener("submit", addTransaction);

function updateTotal() {
    const incomeTotal = transactions
        .filter(trx => trx.type === "income")
        .reduce((total, trx) => total + trx.amount, 0);

    const expenseTotal = transactions
        .filter(trx => trx.type === "expense")
        .reduce((total, trx) => total + trx.amount, 0);

    const balanceTotal = incomeTotal - expenseTotal;

    balance.textContent = formatter.format(balanceTotal).substring(1);
    income.textContent = formatter.format(incomeTotal);
    expense.textContent = formatter.format(expenseTotal * -1);
}

function renderList() {
    list.innerHTML = '';

    status.textContent = "";

    if(transactions.length === 0){
        status.textContent = 'No transactions.';
        return;
    }

    transactions.forEach(({ id, name, amount, date, type  }) => {
        const sign = "income" === type ? 1 : -1;

        const li = document.createElement('li');

        li.innerHTML = `
        <div class="name">
        <h4>${name}</h4>
        <p>${new Date(date).toLocaleDateString()}</p>
        </div>

        <div class="amount ${type}">
        <span>${formatter.format(amount * sign)}</span>
        </div>

         <div class="action">
        <i class="fa-solid fa-trash-can" onclick="deleteTransaction(${id})"></i>
        </div>
        `;

        list.appendChild(li);
    });
}

renderList();
updateTotal();

function deleteTransaction(id) {
    const index = transactions.findIndex(trx => trx.id === id);
    transactions.splice(index, 1);

    updateTotal();
    saveTransactions();
    renderList();
}

function addTransaction(e) {
    e.preventDefault();

    const formData = new FormData(this);

    transactions.push ({
        id: transactions.length + 1,
        name: formData.get("name"),
        amount: parseFloat(formData.get("amount")),
        date: new Date(formData.get("date")),
        type: "on" === formData.get("type") ? "income" : "expense",
    });

    this.reset();

    updateTotal();
    saveTransactions();
    renderList();
} 

function saveTransactions() {

    transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

    localStorage.setItem("transactions", JSON.stringify(transactions));
}


        const wrapper = document.querySelector('.wrapper2');
        const transaction = document.querySelector('.add-link');
        const history = document.querySelector('.history-link');
        const navigation = document.querySelector('.navigation');

        history.addEventListener('click',() =>{
        wrapper.classList.add('active');
       });

       transaction.addEventListener('click',() =>{
        wrapper.classList.remove('active');
       });

       navigation.addEventListener('click',() =>{
        wrapper.classList.add('active-navigation');
       });

       transaction.addEventListener('click',() =>{
        wrapper.classList.remove('active-navigation');
       });

    

