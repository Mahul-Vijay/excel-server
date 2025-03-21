document.getElementById('dataForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        age: document.getElementById('age').value,
        email: document.getElementById('email').value
    };

    try {
        const response = await fetch('https://excel-server-5mcb.onrender.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        document.getElementById('responseMessage').textContent = result.message;
        document.getElementById('dataForm').reset();
    } catch (error) {
        document.getElementById('responseMessage').textContent = 'Error submitting data.';
    }
});

document.getElementById('downloadBtn').addEventListener('click', function() {
    window.location.href = "https://excel-server-5mcb.onrender.com/download";
});
