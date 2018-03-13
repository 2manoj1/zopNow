import { combineReducers } from 'redux';
import { products, productHasErrored, productIsLoading, productitemsHasMoreData, productitemsIsScrolling, updatePageIndex } from './productListingReducer';

const rootReducer = combineReducers({
    products,
    productHasErrored,
    productIsLoading,
    productitemsHasMoreData,
    productitemsIsScrolling,
    updatePageIndex
})

export default rootReducer;