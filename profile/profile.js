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

const allTopics = ["LM35", "URM09", "I2C", "GP2Y0A41SK0F", "potentiometer", "hall"];

function loadLearningProgress() {
    const results = JSON.parse(localStorage.getItem("soriaQuizResults")) || {};

    const completedTopics = Object.keys(results);

    let accuracy = 0;

    if (completedTopics.length > 0) {
        const totalBest = completedTopics.reduce((sum, topic) => {
            return sum + results[topic].best;
        }, 0);

        accuracy = Math.round(totalBest / completedTopics.length);
    }

    const progress = Math.round((completedTopics.length / allTopics.length) * 100);

    const accuracyEl = document.getElementById("accuracy-value");
    const progressFillEl = document.getElementById("progress-fill");

    if (accuracyEl) {
        accuracyEl.textContent = accuracy + "%";
    }

    if (progressFillEl) {
        progressFillEl.style.width = progress + "%";
    }
}

loadLearningProgress();

loadProfile();