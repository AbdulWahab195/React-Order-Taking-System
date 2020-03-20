import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Home } from '../../Pages/Main';
import { bindActionCreators } from 'redux';
import { getProducts, getProductBySKU, searchProducts, getProductAttributeOptions, searchProductsByCategoryId, searchProductsFromCart } from '../Actions/Products';
import { getCartIdFromCustomerId, addToCart, getCartItems, deleteItemFromCart, getAttributeFromAttributeId } from '../Actions/Cart';
import { getCategories } from '../Actions/Categories';
import { getCustomers, storeCustomerIdToRedux, addAddress } from '../Actions/Customers';
import { createAccount } from '../Actions/Account';

const mapStateToProps = state => {
  return {
    products: state.productsReducer.products,
    cartId: state.cartReducer.cartId,
    categories: state.categoriesReducer.categories,
    product: state.productsReducer.product,
    customers: state.customersReducer.customers,
    account: state.accountReducer.accounts,
    customerId: state.customersReducer.customerId,
    cart: state.cartReducer.cart,
    loading: state.loadingReducer.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProducts: bindActionCreators(getProducts, dispatch),
    getProductBySKU: bindActionCreators(getProductBySKU, dispatch),
    getProductAttributeOptions: bindActionCreators(getProductAttributeOptions, dispatch),
    getAttributeFromAttributeId: bindActionCreators(getAttributeFromAttributeId, dispatch),
    addAddress: bindActionCreators(addAddress, dispatch),
    searchProducts: bindActionCreators(searchProducts, dispatch),
    searchProductsFromCart: bindActionCreators(searchProductsFromCart, dispatch),
    searchProductsByCategoryId: bindActionCreators(searchProductsByCategoryId, dispatch),
    getCartIdFromCustomerId: bindActionCreators(getCartIdFromCustomerId, dispatch),
    addToCart: bindActionCreators(addToCart, dispatch),
    getCartItems: bindActionCreators(getCartItems, dispatch),
    deleteItemFromCart: bindActionCreators(deleteItemFromCart, dispatch),
    storeCustomerIdToRedux: bindActionCreators(storeCustomerIdToRedux, dispatch),
    dispatch,
    getCategories: bindActionCreators(getCategories, dispatch),
    getCustomers: bindActionCreators(getCustomers, dispatch),
    createAccount: bindActionCreators(createAccount, dispatch),
  }
}

const HomeContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Home)
);

export { HomeContainer };
