function calculateBudget() {
    // Retrieve input values
    let income = parseFloat(document.getElementById('income').value) || 0;
    let downPayment = parseFloat(document.getElementById('downPayment').value) || 0;
    let monthlyDebt = parseFloat(document.getElementById('monthlyDebt').value) || 0;
    let agentCommission = parseFloat(document.getElementById('agentCommission').value) || 0;
    let otherCosts = parseFloat(document.getElementById('otherCosts').value) || 0;

    // Mortgage parameters
    let interestRate = 0.065; // 6.5% annual interest rate
    let loanTerm = 30; // 30 years

    // Max monthly mortgage payment based on Debt-to-Income (DTI) ratio
    let maxMonthlyMortgage = ((income / 12) * 0.42) - monthlyDebt;

    // Validate input to ensure calculations are meaningful
    if (maxMonthlyMortgage <= 0) {
        document.getElementById('result').innerHTML =
            "Error: Monthly debt exceeds allowable limits for income. Adjust inputs.";
        return;
    }

    // Calculate the loan amount based on monthly payment, interest rate, and term
    let monthlyInterestRate = interestRate / 12;
    let totalPayments = loanTerm * 12;

    // Formula for loan amount (adjusted for compounding interest)
    let loanAmount = maxMonthlyMortgage *
        ((1 - Math.pow(1 + monthlyInterestRate, -totalPayments)) / monthlyInterestRate);

    // Total purchase budget
    let totalPurchaseBudget = loanAmount + downPayment - otherCosts;

    // Deduct agent commission
    let commissionCost = totalPurchaseBudget * (agentCommission / 100);
    let finalBudget = totalPurchaseBudget - commissionCost;

    // Display result
    document.getElementById('result').innerHTML =
        `Estimated Home Purchase Budget: $${finalBudget.toFixed(2)}`;
}
