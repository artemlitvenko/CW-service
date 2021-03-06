const SET_USER = 'SET_USER';
const GOOGLE_LOGIN = 'GOOGLE_LOGIN';
const LOGOUT = 'LOGOUT';

const defaultState = {
    currentUser: {},
    isAuth: false,
};

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                currentUser: action.payload.user,
                isAuth: true,
            };
        case GOOGLE_LOGIN:
            return {
                ...state,
                currentUser: action.payload.user,
                isAuth: true,
            };
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                currentUser: {},
                isAuth: false,
            };
        default:
            return state;
    }
}

//action creaters
export const setUser = (user) => ({ type: SET_USER, payload: user });
export const googleLogin = (user) => ({ type: GOOGLE_LOGIN, payload: user });
export const logout = () => ({ type: LOGOUT });
