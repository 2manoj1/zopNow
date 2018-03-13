import React, {Component} from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import ContentFilter from 'material-ui/svg-icons/content/filter-list';
import { connect } from 'react-redux';
import { productFetchData } from '../actions/products';
import { map } from 'lodash';

class SortIconMenu extends Component {

  handleChangeSingle = (event, value) => {
    let url = `https://www.zopnow.com/toys/discounts.json?sort=${value}`
    this.props.fetchData(url);
  };

  render() {
    return (
      <div>
        {this.props.products && this.props.products.sort && <IconMenu
          iconButtonElement={<IconButton><ContentFilter /></IconButton>}
          onChange={this.handleChangeSingle}
          value={this.props.products.sort.current ? this.props.products.sort.current : " "}
        >
          {map(this.props.products.sort.options, (item, key) => {
            return <MenuItem value={key !== "" ? key : " "} key={item} primaryText={item} />
          })
        }
        </IconMenu>
      }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const data = state.products[0] ? state.products[0].data : {}
  return {
      products: data
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      fetchData: (url) => dispatch(productFetchData(url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SortIconMenu);