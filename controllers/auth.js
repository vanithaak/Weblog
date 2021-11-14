const express = require('express')
const app = express()

//Database Connection
const mysql = require('mysql')
const db = mysql.createConnection({
    host: 'localhost',
    user: 'Vaishnavi@19',
    password: 'Vaishnavi@19',
    database: 'weblog',
    port: '3306'
})
db.connect((error) => {
    if (!error) {
        console.log("Connnection Established")
    } else {
        console.log("Connection failed")
    }
})
exports.register = (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    db.query('SELECT email FROM users WHERE email = ?', [email], (error, results) => {
        if (error) {
            console.log(error)
        }
        if (results.length > 0) {
            return res.render(('signup'), {
                message: "A user with this email already exists"
            })
            console.log("Aa")
        } else if (password != confirmPassword) {
            return res.render(('signup'), {
                message: "Password and Confirm Password do not match"
            })
        } else {
            db.query("INSERT into users SET ?", { name: name, email: email, password: password }, (error, results) => {
                if (error) {
                    console.log(error)
                } else {
                    const path = require('path');
                    const dirPath = path.join(__dirname, '../views/index.html');
                    res.sendFile(dirPath);
                }
            })
        }
    })
}


exports.login = (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM users WHERE email = ? and password = ?', [email, password], (error, results, fields) => {
        if (error) {
            console.log(error)
        }
        if (results.length > 0) {
            const path = require('path');
            const dirPath = path.join(__dirname, '../views/index.html');
            res.sendFile(dirPath);


        } else {
            const path = require('path');
            const dirPath = path.join(__dirname, '../views/login.html');
            res.sendFile(dirPath);
        }

    })
}