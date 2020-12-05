import INITIAL_STATE from '../state/products'


export const products = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return {
                ...state,
                products: action.payload,
            };
        default:
            return state;
    }
};