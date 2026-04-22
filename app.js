const fs = require('fs');

// Load data
function loadExpenses() {
    try {
        const dataBuffer = fs.readFileSync('data.json');
        return JSON.parse(dataBuffer.toString());
    } catch {
        return [];
    }
}

// Save data
function saveExpenses(expenses) {
    fs.writeFileSync('data.json', JSON.stringify(expenses, null, 2));
}

// Add expense
function addExpense(name, amount) {
    const expenses = loadExpenses();
    expenses.push({ name, amount });
    saveExpenses(expenses);
    console.log("✅ Expense added!");
}

// Show expenses
function showExpenses() {
    const expenses = loadExpenses();

    console.log("\n📋 Your Expenses:");
    if (expenses.length === 0) {
        console.log("No expenses yet.");
        return;
    }

    expenses.forEach((exp, i) => {
        console.log(`${i + 1}. ${exp.name} - ₹${exp.amount}`);
    });
}

// Delete expense
function deleteExpense(index) {
    const expenses = loadExpenses();

    if (index < 1 || index > expenses.length) {
        console.log("❌ Invalid index");
        return;
    }

    const removed = expenses.splice(index - 1, 1);
    saveExpenses(expenses);

    console.log(`🗑️ Deleted: ${removed[0].name}`);
}

// ---- COMMAND HANDLING ----
const command = process.argv[2];

if (command === 'add') {
    const name = process.argv[3];
    const amount = parseFloat(process.argv[4]);
    addExpense(name, amount);
}
else if (command === 'list') {
    showExpenses();
}
else if (command === 'delete') {
    const index = parseInt(process.argv[3]);
    deleteExpense(index);
}
else {
    console.log(`
Usage:
node app.js add "item" amount
node app.js list
node app.js delete index
`);
}