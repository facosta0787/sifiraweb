const intitialState = {
  isLoading: false,
  menuClose: true,
  token: null,
  user: {},
};

function reducer(state = intitialState, action) {
  switch (action.type) {
    case 'SET_MENU_STATE':
      return { ...state, menuClose: action.payload };

    case 'SET_APP_LOADING':
      return { ...state, isLoading: action.payload };

    case 'SET_TOKEN_USER':
      localStorage.setItem('token', action.token)
      return { ...state, token: action.token }

    case 'SET_USER_DATA':
      return { ...state, user: action.user }

    case 'REMOVE_TOKEN_USER':
      localStorage.removeItem('token')
      return { ...state, token: null, user: {} }

    default:
      return state;
  }
}

export default reducer;
