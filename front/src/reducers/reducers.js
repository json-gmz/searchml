const initalState = {
    query: '',
    isFetching: false,
    data: {},
    error: ''
}

export const products = (state = initalState, action) => {
    switch (action.type) {
        case "REQUEST_PRODUCTS":
            return Object.assign({}, state, {
                isFetching: true,
                query: action.query
            })
        case "RECEIVE_PRODUCTS":
            return Object.assign({}, state, {
                isFetching: false,
                data: action.status === 'success' ? action.payload : initalState.data,
                error: action.status === 'error' ? action.payload : initalState.error
            })
        default:
            return state;
    }
}

export const product = (state = initalState, action) => {
    switch (action.type) {
        case "REQUEST_DETAIL":
            return Object.assign({}, state, {
                isFetching: true,
                query: action.query
            })
        case "RECEIVE_DETAIL":
            return Object.assign({}, state, {
                isFetching: false,
                data: action.status === 'success' ? action.payload : initalState.data,
                error: action.status === 'error' ? action.payload : initalState.error
            })
        default:
            return state;
    }
}