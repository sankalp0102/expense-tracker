const fs = require("fs");

const fileName = "data.json";

// Read data
function readData() {
    if (!fs.existsSync(fileName)) return [];
    const data = fs.readFileSync(fileName);
    return JSON.parse(data);
}

// Write data
function writeData(data) {
    fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
}

// Add expense
function addExpense(name, amount) {
    const data = readData();

    data.push({
        name: name,
        amount: amount
    });

    writeData(data);
    console.log("✅ Expense added!");
}

// Show expenses
function showExpenses() {
    const data = readData();

    if (data.length === 0) {
        console.log("No expenses found.");
        return;
    }

    console.log("\n📋 Your Expenses:\n");

    data.forEach((item, index) => {
        console.log(`${index + 1}. ${item.name} - ₹${item.amount}`);
    });

    // Total
    const total = data.reduce((sum, item) => sum + item.amount, 0);
    console.log(`\n💰 Total: ₹${total}`);
}

// Delete expense
function deleteExpense(index) {
    const data = readData();

    const realIndex = index - 1;

    if (realIndex >= 0 && realIndex < data.length) {
        data.splice(realIndex, 1);
        writeData(data);
        console.log("🗑️ Expense deleted!");
    } else {
        console.log("❌ Invalid index");
    }
}

// Commands
const command = process.argv[2];

if (command === "add") {
    const name = process.argv[3];
    const amount = parseFloat(process.argv[4]);

    if (!name || isNaN(amount)) {
        console.log("❌ Please provide valid input.");
    } else {
        addExpense(name, amount);
    }

} else if (command === "list") {
    showExpenses();

} else if (command === "delete") {
    const index = parseInt(process.argv[3]);
    deleteExpense(index);

} else {
    console.log(`
Usage:
node app.js add "item" amount
node app.js list
node app.js delete index
`);
}