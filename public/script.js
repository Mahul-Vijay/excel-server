document.getElementById('dataForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const newEntry = {
        name: document.getElementById('name').value.trim(),
        gender: document.getElementById('sex').value,
        age: document.getElementById('age').value,
        product: document.getElementById('product').value.trim(),
        message: document.getElementById('message').value.trim(),
        date: new Date().toISOString()
    };

    try {
        const response = await fetch('https://excel-server-5mcb.onrender.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newEntry)
        });

        const result = await response.json();
        document.getElementById('response').innerHTML = `<strong>Success!</strong> ${result.message}`;
        document.getElementById('dataForm').reset();
    } catch (error) {
        document.getElementById('response').innerHTML = `<strong>Error:</strong> Failed to submit data.`;
    }
});

document.getElementById('downloadBtn').addEventListener('click', function() {
    window.location.href = "https://excel-server-5mcb.onrender.com/download";
});
