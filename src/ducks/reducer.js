const initialState = {
    username: "",
    id: 0,
    profilePic: "",
    user: {}
}

const SET_USER = 'SET_USER'

export function setUser(user) {
    return {
        type: SET_USER,
        payload: user
    }
}



export default ( state = initialState, action ) => {
    const { type, payload } = action
    switch (type) {
        case SET_USER:
            // const {username, profilePic } = payload
            return { ...state, username: payload.username, profilePic: payload.profile_pic, user: payload }
        default: return state
    }
}