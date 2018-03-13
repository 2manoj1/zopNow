import { filter, size } from 'lodash';
let index = 0;

export function productHasErrored(bool) {
    return {
        type: 'PRODUCT_HAS_ERRORED',
        hasErrored: bool
    };
}

export function productitemsIsLoading(bool) {
    return {
        type: 'PRODUCT_IS_LOADING',
        isLoading: bool
    };
}

export function productitemsIsScrolling(bool) {
    return {
        type: 'PRODUCT_IS_SCROLLING',
        isScrolling: bool
    };
}

export function productitemsHasMoreData(bool = true) {
    return {
        type: 'PRODUCT_HAS_MORE',
        hasMore: bool
    };
}

export function productFetchDataSuccess(items) {
    let productData = filter(items, { "name": "ProductGrid" });
    return {
        type: 'PRODUCT_FETCH_DATA_SUCCESS',
        productData
    };
}

export function productFetchDataScroll(items) {
    let productData = filter(items, { "name": "ProductGrid" });
    return {
        type: 'PRODUCT_FETCH_DATA_SCROLL',
        productData
    };
}

export function updatePageIndex(i) {
    return {
        type: 'PAGE_INDEX',
        pageIndex: i
    };
}

export function productFetchData(url) {
    return (dispatch) => {
        dispatch(productitemsIsLoading(true));

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(productitemsIsLoading(false));
                dispatch(productitemsHasMoreData());
                dispatch(updatePageIndex(0));

                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(productFetchDataSuccess(items)))
            .catch(() => dispatch(productHasErrored(true)));
    };
}


export function productFetchMoreDataOnScroll(url, prevData) {
    if (size(prevData.products) < prevData.count) {
        return (dispatch) => {
            dispatch(productitemsIsScrolling(true));

            fetch(url)
                .then((response) => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    dispatch(productitemsIsScrolling(false));
                    dispatch(productitemsHasMoreData());
                    dispatch(updatePageIndex(++index));
                    return response;
                })
                .then((response) => response.json())
                .then((items) => dispatch(productFetchDataScroll(items)))
                .catch(() => dispatch(productHasErrored(true)));
        };
    }
    else {
        return (dispatch) => {
        dispatch(productitemsHasMoreData(false));
    };
    }
}