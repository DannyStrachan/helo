const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        const db = req.app.get("db")
        const { username, password } = req.body
        const user = await db.find_user(username)

        if (user.length > 0) {
            return res.status(400).send({ message: "Username in use, try again!" })
        }

        
        const profilePic = `https://robohash.org/${username}`
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(  password, salt )
        const newUser = await db.create({ username, profilePic })
        console.log('see', newUser);

        db.insert_hash({ hash, user_id: newUser[0].user_id })
            .then(() => {
                req.session.user = newUser[0]
                console.log('here', req.session.user);
                res
                    .status(200)
                    .send({
                        message: "Successful Login!",
                        user: req.session.user,
                        loggedIn: true

                    })
            })
            .catch(err => {
                res.status(500).send({ message: 'Failed to register user!'})
            })
    },
    login: async (req, res) => {
        console.log('hit login');
        const db = req.app.get('db')
        const { username, password } = req.body
        const user = await db.find_user_hash([username])
        if (user.length === 0) {
            return res.status(400).send({ message: 'Username not found... Try Registering a new Username!'})
        }
        const result = bcrypt.compareSync( password, user[0].hash)
        if (result) {
            console.log('user in login:',user[0]);
            delete user[0].hash
            req.session.user = user[0]
            return res.status(200).send({ message: "Successful Login!", user: req.session.user, loggedIn: true })
        }
    },
    refreshUser: async (req, res) => {
        console.log('session:', req.session.user);
        if (req.session.user) {
            await res.send(req.session.user)
        } else {
            res.status(200).send({loggedIn: false})
        }
    },
    logout: (req, res) => {
        console.log('user logged out');
        req.session.destroy()
        res.sendStatus(200)
    }
}