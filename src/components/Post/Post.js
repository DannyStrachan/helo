import './Post.css'
import React, {Component} from 'react'

export default class Post extends Component {
    render () {
        return (
            <div className="post">
                its here
                <div>
                    post this content
                </div>
            </div>
        )
    }
}




// // ENDPOINTS
// app.post('/auth/register', authCtrl.register)
// app.post('/auth/login', authCtrl.login)
// app.delete('/auth/logout', authCtrl.logout)
// app.post('/api/deposit', bankCtrl.deposit)
