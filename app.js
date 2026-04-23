const fs = require("fs");

const fileName = "data.json";

// Read data
function readData() {
    if (!fs.existsSync(fileName)) return [];
    return JSON.parse(fs.readFileSync(fileName));
}

// Write data
function writeData(data) {
    fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
}

// Generate unique ID
function generateId() {
    return Date.now();
}

// Add expense
function addExpense(name, amount, category) {
    const data = readData();

    const expense = {
        id: generateId(),
        name,
        amount,
        category: category || "General",
        date: new Date().toLocaleString()
    };

    data.push(expense);
    writeData(data);

    console.log("✅ Expense added!");
}

// Show all expenses
function showExpenses() {
    const data = readData();

    if (data.length === 0) {
        console.log("No expenses found.");
        return;
    }

    console.log("\n📋 Your Expenses:\n");

    data.forEach((item, index) => {
        console.log(
            `${index + 1}. ${item.name} | ₹${item.amount} | ${item.category} | ${item.date} | ID: ${item.id}`
        );
    });

    const total = data.reduce((sum, item) => sum + item.amount, 0);
    console.log(`\n💰 Total: ₹${total}`);
}

// Delete expense by ID
function deleteExpense(id) {
    const data = readData();

    const newData = data.filter(item => item.id != id);

    if (data.length === newData.length) {
        console.log("❌ Expense not found");
        return;
    }

    writeData(newData);
    console.log("🗑️ Expense deleted!");
}

// Edit expense
function editExpense(id, name, amount, category) {
    const data = readData();

    const expense = data.find(item => item.id == id);

    if (!expense) {
        console.log("❌ Expense not found");
        return;
    }

    if (name) expense.name = name;
    if (!isNaN(amount)) expense.amount = amount;
    if (category) expense.category = category;

    writeData(data);
    console.log("✏️ Expense updated!");
}

// Filter by category
function filterExpenses(category) {
    const data = readData();

    const filtered = data.filter(item =>
        item.category.toLowerCase() === category.toLowerCase()
    );

    if (filtered.length === 0) {
        console.log("❌ No expenses found for this category");
        return;
    }

    console.log(`\n📂 ${category} Expenses:\n`);

    filtered.forEach((item, index) => {
        console.log(
            `${index + 1}. ${item.name} | ₹${item.amount} | ${item.category} | ${item.date} | ID: ${item.id}`
        );
    });

    const total = filtered.reduce((sum, item) => sum + item.amount, 0);
    console.log(`\n💰 Total (${category}): ₹${total}`);
}

// Commands
const command = process.argv[2];

if (command === "add") {
    const name = process.argv[3];
    const amount = parseFloat(process.argv[4]);
    const category = process.argv[5];

    if (!name || isNaN(amount)) {
        console.log("❌ Usage: node app.js add name amount category");
    } else {
        addExpense(name, amount, category);
    }

} else if (command === "list") {
    showExpenses();

} else if (command === "delete") {
    const id = process.argv[3];
    deleteExpense(id);

} else if (command === "edit") {
    const id = process.argv[3];
    const name = process.argv[4];
    const amount = parseFloat(process.argv[5]);
    const category = process.argv[6];

    editExpense(id, name, amount, category);

} else if (command === "filter") {
    const category = process.argv[3];

    if (!category) {
        console.log("❌ Usage: node app.js filter category");
    } else {
        filterExpenses(category);
    }

} else {
    console.log(`
Usage:
node app.js add "item" amount category
node app.js list
node app.js delete id
node app.js edit id name amount category
node app.js filter category
`);
}