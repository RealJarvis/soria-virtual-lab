const express = require('express');
const path = require('path');
const fs = require('fs');

// function for hasing the password
const bcrypt = require('bcrypt');
const session = require('express-session');
const { createUser, findUserByEmail, findUserById  } = require('./backend/users');

require('./backend/db');


const app = express();
const PORT = process.env.PORT || 5000;

// absolute path to your project root
const ROOT_DIR = __dirname;

// session
app.use(session({
    secret: process.env.SESSION_SECRET || 'development_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24
    }
}));

// middleware for reading JSON/form data later
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// log requests
app.use((req, res, next) => {
    console.log(`Method: ${req.method}`);
    console.log(`URL: ${req.url}`);
    console.log(`User-Agent: ${req.headers['user-agent'] || 'Unknown'}`);
    next();
});

// serve static files (css, js, images, html in folders)
app.use(express.static(ROOT_DIR));

// home route
app.get('/', (req, res) => {
    res.sendFile(path.join(ROOT_DIR, 'soriamain.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(ROOT_DIR, './signup/signup.html'));
})
app.post('/register', async (req, res) => {
    try {
        const {username, email, password, role} = req.body;

        // Error
        if (!username || !email || !password || !role) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'Missing required fields.'
                }
            );
        }

        const existingUser = await findUserByEmail(email);
        // conflict
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'User already exists.'
            });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = await createUser(username, email, passwordHash, role);

        // success
        res.status(201).json({
            success: true,
            message: 'User successfully created.',
            user: newUser
        });
    } catch (error) {
        console.error('Register error', error);
        res.status(500).json({
            success: false,
            message: 'Server error while creating user profile'
        });
    }
})


app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Missing email or password.'
            });
        }

        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Incorrect email or password.'
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password_hash);

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: 'Incorrect email or password.'
            });
        }

        req.session.userId = user.id;

        res.status(200).json({
            success: true,
            message: 'Login successful.',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while logging in.'
        });
    }
});

app.get('/api/me', async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({
                success: false,
                message: 'User is not logged in.'
            });
        }

        const user = await findUserById(req.session.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found.'
            });
        }

        res.json({
            success: true,
            user
        });
    } catch (error) {
        console.error('Profile fetch error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while loading profile.'
        });
    }
});

app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Logout failed.'
            });
        }

        res.clearCookie('connect.sid');
        res.json({
            success: true,
            message: 'Logged out successfully.'
        });
    });
});

// 404 handler for everything not found
app.use((req, res) => {
    const notFoundPath = path.join(ROOT_DIR, '404.html');

    if (fs.existsSync(notFoundPath)) {
        res.status(404).sendFile(notFoundPath);
    } else {
        res.status(404).send('404 - Page not found');
    }
});

// generic error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).send(`Internal server error`);
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`>>> Express server running on port ${PORT}`);
});