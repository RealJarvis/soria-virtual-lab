const http = require('http');
//constructs the correct file locations for fs to use.
const path = require('path');
//performs file operations.
const fs = require('fs');
/* use this function -> npm run dev <- only for development, for production use node index.js*/
const server = http.createServer((req, res) => {

    // not mentioning the folder because the index file is located in it
    // req.url -> requested url
    let filePath = path.join(__dirname, req.url === '/' ? 'soriamain.html' : req.url);
    console.log(`User: ${navigator.userAgent}`);
    console.log(filePath);

    // adding all needed extensions
    const extname = path.extname(filePath);
    // initial content type
    let contentType = 'text/html';

    //Adding all extensions
    switch(extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'text/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
    }

    fs.readFile(filePath,  (err, data) => {
        /*TODO implement the error handling in this part of the code*/
        if (err) {
            // if user's searching for non-existing page
            if (err.code === 'ENOENT') {
                    fs.readFile(path.join(__dirname, '404.html'), (err, data) => {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(data, 'utf-8');
                });
            }else {
                res.writeHead(404);
                res.end(`Unidentified server error ${err.code}`);
            }
        }else {
            // the main if
            if (contentType === 'image/png' || contentType === 'image/jpeg') {
                res.writeHead(200, {'Content-Type': contentType});
                res.end(data);
            }else {
                res.writeHead(200, {'Content-Type': contentType});
                res.end(data, 'utf8');
            }
        }
    })


})
// process.env.PORT → reads a port value defined by the hosting service (Render, Vercel, Heroku).
// the code allows the server to be used both online and locally
const PORT = process.env.PORT || 5000;
// listens to the requests of the user, without it the server won't work
server.listen(PORT, () => console.log(`>>> Listening on port ${PORT}`));
