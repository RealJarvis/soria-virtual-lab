const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const form = document.querySelector('.login-form');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.success) {
            window.location.href = '../profile/profile.html';
        } else {
            alert(data.message || 'Incorrect email or password');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('Chyba spojenia so serverom');
    }
});