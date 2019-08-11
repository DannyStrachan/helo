require('dotenv').config()
const express = require ('express')
const massive = require ('massive')
const session = require('express-session')
const authCtrl = require ('./authController')
const pCtrl = require ('./postController')
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env || 4200

const app = express()

app.use(express.json())
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 10
  }
}))

// ENDPOINTS
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/api/posts', pCtrl.getPosts)


// app.delete('/auth/logout', authCtrl.logout)

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    app.listen(SERVER_PORT, () => console.log(`All systems good to go on PORT ${SERVER_PORT}!!!!`))
})