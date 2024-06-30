// Constants for tax rates and deductions based on 2024 KRA parameters
const TAX_RATES = [
    { lower: 0, upper: 288000, rate: 0.1 },
    { lower: 288001, upper: 388000, rate: 0.25 },
    { lower: 388001, upper: 6000000, rate: 0.3 },
    { lower: 6000001, upper: 9600000, rate: 0.325 },
    { lower: 9600001, upper: Infinity, rate: 0.35 }
];

const NHIF_RATES = [
    { lower: 0, upper: 5999, amount: 150 },
    { lower: 6000, upper: 7999, amount: 300 },
    { lower: 8000, upper: 11999, amount: 400 },
    { lower: 12000, upper: 14999, amount: 500 },
    { lower: 15000, upper: 19999, amount: 600 },
    { lower: 20000, upper: 24999, amount: 750 },
    { lower: 25000, upper: 29999, amount: 850 },
    { lower: 30000, upper: 34999, amount: 900 },
    { lower: 35000, upper: 39999, amount: 950 },
    { lower: 40000, upper: 44999, amount: 1000 },
    { lower: 45000, upper: 49999, amount: 1100 },
    { lower: 50000, upper: 59999, amount: 1200 },
    { lower: 60000, upper: 69999, amount: 1300 },
    { lower: 70000, upper: 79999, amount: 1400 },
    { lower: 80000, upper: 89999, amount: 1500 },
    { lower: 90000, upper: 99999, amount: 1600 },
    { lower: 100000, upper: Infinity, amount: 1700 },
]

const NSSF_RATE_EMPLOYEE = 0.06; // Assuming 6% for employee

// Function to calculate tax (PAYE) based on given taxable income
function calculateTax(taxableIncome) {
    let tax = 0;
    for (let i = 0; i < TAX_RATES.length; i++) {
        const { lower, upper, rate } = TAX_RATES[i];
        if (taxableIncome > upper) {
            tax += (upper - lower + 1) * rate;
        } else if (taxableIncome >= lower) {
            tax += (taxableIncome - lower + 1) * rate;
            break;
        }
    }
    return tax;
}

// Function to calculate NHIF deduction based on gross salary
function calculateNHIF(grossSalary) {
    for (let i = 0; i < NHIF_RATES.length; i++) {
        const { lower, upper, amount } = NHIF_RATES[i];
        if (grossSalary >= lower && grossSalary <= upper) {
            return amount;
        }
    }
    return 0;
}

// Function to calculate NSSF deduction based on basic salary
function calculateNSSF(basicSalary) {
    return basicSalary * NSSF_RATE_EMPLOYEE;
}

// Function to calculate net salary
function calculateNetSalary(basicSalary, benefits) {
    const grossSalary = basicSalary + benefits;
    const tax = calculateTax(grossSalary);
    const nhifDeductions = calculateNHIF(grossSalary);
    const nssfDeductions = calculateNSSF(basicSalary);
    const netSalary = grossSalary - tax - nhifDeductions - nssfDeductions;
    return { grossSalary, tax, nhifDeductions, nssfDeductions, netSalary };
}

// Example usage
function main() {
    const basicSalary = parseFloat(prompt("Enter Basic Salary: "));
    const benefits = parseFloat(prompt("Enter Benefits: "));

    const { grossSalary, tax, nhifDeductions, nssfDeductions, netSalary } = calculateNetSalary(basicSalary, benefits);

    console.log(`\nGross Salary: ${grossSalary}`);
    console.log(`Tax (PAYE): ${tax}`);
    console.log(`NHIF Deductions: ${nhifDeductions}`);
    console.log(`NSSF Deductions: ${nssfDeductions}`);
    console.log(`\nNet Salary: ${netSalary}`);
}

main();
