const usernameEls = document.querySelectorAll('.profile-username');
const roleEls = document.querySelectorAll('.profile-role');
const fullNameEl = document.getElementById('profile-fullname');

async function loadProfile() {
    try {
        const response = await fetch('/api/me');
        const data = await response.json();

        if (!data.success) {
            window.location.href = '../login/login.html';
            return;
        }

        const user = data.user;

        usernameEls.forEach(el => el.textContent = user.username);
        roleEls.forEach(el => el.textContent = user.role);

        if (fullNameEl) {
            fullNameEl.textContent = user.username;
        }
    } catch (error) {
        console.error('Profile load error:', error);
        window.location.href = '../login/login.html';
    }
}

const logoutBtn = document.getElementById('logout-btn');

if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
        try {
            const response = await fetch('/logout', {
                method: 'POST'
            });

            const data = await response.json();

            if (data.success) {
                window.location.href = '../login/login.html';
            } else {
                alert(data.message || 'Odhlásenie zlyhalo.');
            }
        } catch (error) {
            console.error('Logout error:', error);
            alert('Chyba spojenia so serverom.');
        }
    });
}

loadProfile();