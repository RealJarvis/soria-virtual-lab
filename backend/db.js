const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',          // or your custom DB user
    host: 'localhost',
    database: 'soria_db',
    password: 'hokus1304',
    port: 5432,
});

pool.connect()
    .then(client => {
        console.log('Connected to PostgreSQL');
        client.release();
    })
    .catch(err => {
        console.error('PostgreSQL connection error:', err.message);
    });

module.exports = pool;