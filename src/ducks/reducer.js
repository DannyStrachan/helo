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
    listOfPosts: []
}

const SET_USER = 'SET_USER'
const SET_POST = 'SET_POST'
const CANCEL_CHANGES = 'CANCEL_CHANGES'

export function setUser(user) {
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
    return {
        type: CANCEL_CHANGES
    }
}



export default ( state = initialState, action ) => {
    const { type, payload } = action
    switch (type) {
        case SET_USER:
            return { ...state, username: payload.username, profilePic: payload.profile_pic, user: payload }
        case SET_POST:
            const { title, img, content } = payload
            return { ...state, title: title, img: img, content: content}
        case CANCEL_CHANGES:
            return {...state}
        default: return state
    }
}