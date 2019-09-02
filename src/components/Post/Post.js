import './Post.css'
import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'

class Post extends Component {

    state = {
        post: {}
    }

    async componentDidMount() {
        let postId = this.props.location.state
        let post = await axios.get(`/api/post/${postId}`)
        .then(res => res.data[0])
        this.setState({post})
    }
    render () {
        console.log('props:', this.props);
        let {profilePic} = this.props
        let {title, img, content, username} = this.state.post
        return (
            <div className="Post-container" >
                <div className="post">
                    <div className="post-head">
                        <h2 className="post-title">{title}</h2>
                        <div className="post-author">
                            <p>by {username}</p>
                            {/* <div> */}
                            <img className="post-profile-pic" alt="" src={profilePic} />
                            {/* </div> */}
                        </div>
                    </div>
                    <div className="post-body">
                        <img alt="" src={img} />
                        <div className="post-content" >{content}</div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return reduxState
}

export default connect(mapStateToProps, null)(Post)




// // ENDPOINTS
// app.post('/auth/register', authCtrl.register)
// app.post('/auth/login', authCtrl.login)this.props.location.params.postId
// app.delete('/auth/logout', authCtrl.logout)
// app.post('/api/deposit', bankCtrl.deposit)
