import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { productFetchData, productFetchMoreDataOnScroll } from '../actions/products';
import { List } from 'antd';
import { Card, CardActions, CardMedia, CardTitle } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import InfiniteScroll from 'react-infinite-scroller';


import {
    deepOrange300,
    purple500
} from 'material-ui/styles/colors';

const style = { margin: 5 };


class ProductLists extends Component {
    componentDidMount() {
        this.props.fetchData('https://www.zopnow.com/toys/discounts.json');
    }

    handleInfiniteOnLoad = () => {
        let url = 'https://www.zopnow.com/toys/discounts.json';
        let curIndex = this.props.index + 1;
        if (this.props.products.sort.current && this.props.products.sort.current !== "") {
            url = url + '?sort=' + this.props.products.sort.current;
            url = url + '&page=' + curIndex;
        }
        else {
            url = url + '?page=' + curIndex;
        }
        this.props.loadDataOnScroll(url, this.props.products);

    }

    render() {
        if (this.props.hasErrored) {
            return <p>Sorry! There was an error loading the site</p>;
        }

        if (this.props.isLoading) {
            return <p>Loading…</p>;
        }
        return (
            <div className="demo-infinite-container">
                <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    loadMore={this.handleInfiniteOnLoad}
                    hasMore={!this.props.loading && this.props.hasMore}
                    useWindow={false}
                >
                    <List
                        grid={{ gutter: 8, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }}
                        dataSource={this.props.products.products}
                        renderItem={item => (
                            <List.Item key={item.id}>
                                <Card>
                                    <CardMedia
                                        style={{ color: "#fff" }}
                                        overlay={<div>{item.full_name} Quantity: {item.defaultVariant.properties.Quantity}</div>}
                                    >
                                        <img alt={item.name} src={item.defaultVariant.images[0]} />
                                    </CardMedia>
                                    <CardTitle>
                                        <div><i className="fa fa-rupee"></i><span>{`${item.defaultVariant.discount}`}</span> <span style={{ textDecoration: "line-through" }}>{`${item.defaultVariant.mrp}`}</span></div>
                                    </CardTitle>
                                    <CardActions>
                                        <FlatButton>
                                            {parseInt(item.defaultVariant.stock, 10) > 0 ?
                                                <Avatar
                                                    color={deepOrange300}
                                                    backgroundColor={purple500}
                                                    size={30}
                                                    style={style}
                                                >
                                                    <i className="fa fa-cart-plus"></i>
                                                </Avatar>
                                                : "NO Stock"}
                                        </FlatButton>
                                    </CardActions>
                                </Card>
                            </List.Item>
                        )}
                    />
                </InfiniteScroll>
            </div>

        );
    }
}

ProductLists.propTypes = {
    fetchData: PropTypes.func.isRequired,
    loadDataOnScroll: PropTypes.func.isRequired,
    products: PropTypes.object.isRequired,
    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    hasMore: PropTypes.bool.isRequired,
    index: PropTypes.number
};

const mapStateToProps = (state) => {
    const data = state.products[0] ? state.products[0].data : {}
    return {
        products: data,
        hasErrored: state.productHasErrored,
        isLoading: state.productIsLoading,
        hasMore: state.productitemsHasMoreData,
        loading: state.productitemsIsScrolling,
        index: state.updatePageIndex
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(productFetchData(url)),
        loadDataOnScroll: (url, data) => dispatch(productFetchMoreDataOnScroll(url, data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductLists);