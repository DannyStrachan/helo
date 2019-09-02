import axios from 'axios'

const initialState = {
    username: "",
    id: 0,
    profilePic: "",
    user: {}, 
    title: "",
    img: "",
    content: "",
    checkBox: true,
    searchBox: "",
    listOfPosts: [],
    error: [],
    pending: false
}

const SET_USER = 'SET_USER'
const SET_POST = 'SET_POST'
const CANCEL_CHANGES = 'CANCEL_CHANGES'

export function setUser(user) {
    console.log('hit setUser');
    console.log('user paylaod:', user);
    return {
        type: SET_USER,
        payload: user
    }
}

export function setPost(state) {
    return {
        type: SET_POST,
        payload: state
    }
}

export function clearEntries() {
    console.log('hit clear entries function in reducer')
    return {
        type: CANCEL_CHANGES
    }
}

export function refreshUser() {
    let user = axios.get('/api/auth/me').then(res => res.data)
    console.log('user:', user);
    return {
        type: SET_USER,
        payload: user
    }
}

export default ( state = initialState, action ) => {
    const { type, payload } = action
    switch (type) {
        case SET_USER:
            console.log('reducer:', payload);
            return { ...state, username: payload.username, profilePic: payload.profile_pic, user: payload }
        case SET_USER + "_FULFILLED":
            console.log('reducer:', payload);
            return { ...state, username: payload.username, profilePic: payload.profile_pic, user: payload }
        case SET_USER + "_REJECTED":
            console.log('rejected')
            return { ...state, error: payload };
        case SET_USER + "_PENDING":
            console.log('pending')
            return { ...state, pending: true };
        case SET_POST:
            const { title, img, content } = payload
            return { ...state, title: title, img: img, content: content}
        case CANCEL_CHANGES:
            return {...state, checkBox: true, searchBox: "", listOfPosts: []}
        default: return state
    }
}