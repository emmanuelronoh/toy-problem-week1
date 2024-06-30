/**
 * Function to prompt user for student marks and output corresponding grade.
 */
function studentGradeGenerator() {
    let userInput = prompt("Enter student marks (0-100):");
    
    // Convert input to a number
    let marks = parseInt(userInput);
    
    // Validate the input
    if (isNaN(marks) || marks < 0 || marks > 100) {
        alert("Invalid input. Please enter a number between 0 and 100.");
        return;
    }
    
    // Determine the grade based on marks
    let grade;
    if (marks > 79) {
        grade = 'A';
    } else if (marks >= 60) {
        grade = 'B';
    } else if (marks >= 50) {
        grade = 'C';
    } else if (marks >= 40) {
        grade = 'D';
    } else {
        grade = 'E';
    }
    
    // Output the grade to the user
    alert(`Student grade for marks ${marks}: ${grade}`);
}

// Example usage: Uncomment to test the function
// studentGradeGenerator();
