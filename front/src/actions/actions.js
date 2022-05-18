import axios from 'axios';

export const requestProducts = (query) => ({
    type: "REQUEST_PRODUCTS",
    query
})

export const receiveProducts = ({status, payload }) => ({
    type: "RECEIVE_PRODUCTS",
    status,
    payload
})

export const requestDetail = (query) => ({
    type: "REQUEST_DETAIL",
    query
})

export const receiveDetail = ({status, payload }) => ({
    type: "RECEIVE_DETAIL",
    status,
    payload
})

export const getProducts = (query) => {
    return function (dispatch) {
    	dispatch(requestProducts(query));
        const url = `https://api.mercadolibre.com/sites/MLA/search?q=${query}`;
    	return axios.get(url)
            .then(response => {
                dispatch(receiveProducts({
                    status: 'success',
                    payload: response.data
                }))
            })
            .catch(error => {
                dispatch(receiveProducts({
                    status: 'error',
                    payload: error
                }))
            })
    };
}

export const getDetails = (query) => {
    return function (dispatch) {
    	dispatch(requestDetail(query));
    	const url = `https://api.mercadolibre.com/items/${query}`;
    	return axios.get(url)
            .then(response => {
                getDescription(query).then(function(description) {
                    response.data.description_text = description;
                    getCategories(response.data.category_id).then(function(categories) {
                        response.data.category_tree = categories;
                        dispatch(receiveDetail({
                            status: 'success',
                            payload: response.data
                        }))
                    });
                });
            })
            .catch(error => {
                dispatch(receiveDetail({
                    status: 'error',
                    payload: error
                }))
            })
    };
}

export const getDescription = async (query) => {
    return await new Promise((resolve, reject) => {
        const url = `https://api.mercadolibre.com/items/${query}/description`;
        axios.get(url)
        .then(response => {
            resolve(response.data.plain_text);
        })
        .catch(error => {
            reject("");
        })
    });
}

export const getCategories = async (query) => {
    return await new Promise((resolve, reject) => {
        const url = `https://api.mercadolibre.com/categories/${query}`;
        axios.get(url)
        .then(response => {
            resolve(response.data.path_from_root);
        })
        .catch(error => {
            reject("");
        })
    });
}