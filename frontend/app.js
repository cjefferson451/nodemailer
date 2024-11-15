// Attach event listener to form submission
document.getElementById('emailForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Get form data
    const submitButton = document.querySelector("button");
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Set button to loading state
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    try {
        // Make API call to serverless function
        const response = await fetch('https://nodemailerserver.vercel.app/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, subject, message }),
        });

        // Parse the JSON response
        const data = await response.json();

        // Display success or error message
        if (response.ok) {
            alert(data.message);
        } else {
            throw new Error(data.message || 'Failed to send email');
        }
    } catch (error) {
        alert(`Error: ${error.message}`);
    } finally {
        // Reset button state after completion
        submitButton.disabled = false;
        submitButton.textContent = "Send Email";
    }
});