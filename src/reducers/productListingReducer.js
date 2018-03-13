import {concat} from "lodash";
export function productHasErrored(state = false, action) {
    switch (action.type) {
        case 'PRODUCT_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function productIsLoading(state = false, action) {
    switch (action.type) {
        case 'PRODUCT_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function products(state = [], action) {
    switch (action.type) {
        case 'PRODUCT_FETCH_DATA_SUCCESS':
            return action.productData;
        case 'PRODUCT_FETCH_DATA_SCROLL':
       
        let d = concat(state[0].data.products,action.productData[0].data.products);
        action.productData[0].data.products = d;
        return action.productData;
        default:
            return state;
    }
}

export function productitemsIsScrolling(state = false, action) {
    switch (action.type) {
        case 'PRODUCT_IS_SCROLLING':
        return action.isScrolling;

        default:
            return state;
    }
}

export function productitemsHasMoreData(state = true, action) {
    switch (action.type) {
        case 'PRODUCT_HAS_MORE':
        return action.hasMore;
        default:
        return state;
    }
}

export function updatePageIndex(state = 0, action) {
    switch (action.type) {
        case 'PAGE_INDEX':
        return action.pageIndex
        default:
        return state;
    }
}