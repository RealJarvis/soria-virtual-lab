
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const roleInput = document.getElementById('role');
const passwordInput = document.getElementById('password');
const signupBtn = document.getElementById('signup-btn');
const messageBox = document.getElementById('signup-message');

signupBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const role = roleInput.value.trim().toLowerCase();
    const password = passwordInput.value.trim();

    if (!username || !email || !role || !password) {
        messageBox.textContent = 'Vyplňte všetky polia.';
        return;
    }

    if (password.length < 5) {
        messageBox.textContent = 'Heslo musí mať aspoň 5 znakov.';
        return;
    }

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                password,
                role,
            })
        });
        const data = await response.json();
        if (data.success) {
            messageBox.textContent = 'Registrácia prebehla úspešne.';

            // redirect after short delay
            setTimeout(() => {
                window.location.href = '/login/login.html';
            }, 1000);
        }else {
            messageBox.textContent = data.message || "Registrácia zlyhala.";
        }
    } catch (error) {
        console.error('Signup error: ',error);
        messageBox.textContent = 'Chyba spojenia so serverom.';
    }
});
