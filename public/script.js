document.getElementById('dataForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        gender: document.getElementById('sex').value,
        age: document.getElementById('age').value,
        product: document.getElementById('product').value,
        message: document.getElementById('message').value
    };

    try {
        const response = await fetch("/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        document.getElementById('response').innerText = result.message;
    } catch (error) {
        document.getElementById('response').innerText = "Error submitting form.";
    }
});

document.getElementById('downloadBtn').addEventListener('click', function() {
    window.location.href = "/download";  // 🟢 Fixes the button issue
});
