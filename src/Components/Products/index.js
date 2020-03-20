

import React, { Component } from 'react';
import { Input, Card, notification, Spin } from 'antd';
import { List } from './productCard';
const { Search } = Input;

class ProductsComponent extends Component {
    constructor() {
        super();
        this.state = {
            fetchProducts: [],
            variations: {
                type: '',
                variants: []
            },
            variation: [],
            quantity: 0
        }
        this.handleCollapseFunction = this.handleCollapseFunction.bind(this);
        this.variationSelection = this.variationSelection.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }
    componentDidMount() {
    }
    openNotificationWithIcon = (type, err) => {
        notification[type]({
            message: 'Error',
            description:
                err.payload.response.data.message
        });
    };
    componentDidUpdate(prevProps) {
        if (this.props.products.length !== 0 && prevProps.products !== this.props.products) {
            this.setState({
                fetchProducts: this.props.products
            })
            this.setState({
                variation: []
            })
        }
    }
    search(e) {
        const { searchProducts } = this.props;
        searchProducts(e)
            .then((response) => {
                this.setState({
                    fetchProducts: response.payload.items
                })
            })
    }
    handleCollapseFunction(key) {
        this.setState({
            variations: {}
        })
        const { getProductBySKU, getProductAttributeOptions } = this.props;
        const promises = [];
        const products = this.state.fetchProducts;
        const productIndex = products.findIndex(x => x.id === parseInt(key));
        if (productIndex !== -1) {
            if (products[productIndex].type_id === 'grouped') {
                for (let index = 0; index < products[productIndex]
                    .product_links.length; index++) {
                    if (products[productIndex].product_links[index].link_type === 'associated') {
                        promises.push(new Promise((resolve, reject) =>
                            resolve(getProductBySKU(products[productIndex]
                                .product_links[index]
                                .linked_product_sku))))
                    }
                }
                Promise.all(promises).then((response) => {
                    const product_link_products = [];
                    for (let index = 0; index < response.length; index++) {
                        product_link_products.push(response[index].payload)
                    }
                    products[productIndex].product_links = product_link_products;
                    const variationsObj = {
                        type: 'grouped',
                        variants: product_link_products
                    }
                    this.setState({
                        variations: variationsObj
                    })
                })
                    .catch((err) => {
                        this.openNotificationWithIcon('error', err)
                    })
            } else if (products[productIndex].type_id === 'configurable') {
                const options = [];
                for (let index = 0; index < products[productIndex]
                    .extension_attributes.configurable_product_options.length; index++) {
                    promises.push(
                        new Promise((resolve, reject) =>
                            resolve(getProductAttributeOptions(
                                products[productIndex]
                                    .extension_attributes
                                    .configurable_product_options[index]
                                    .attribute_id))));
                }
                Promise.all(promises).then((response) => {
                    for (let jindex = 0; jindex < products[productIndex]
                        .extension_attributes
                        .configurable_product_options.length; jindex++) {
                        const option_values = [];
                        for (let index = 0; index < products[productIndex]
                            .extension_attributes
                            .configurable_product_options[jindex]
                            .values.length; index++) {
                            const option_value = response[jindex].payload.find(x => x.value === products[productIndex]
                                .extension_attributes
                                .configurable_product_options[jindex]
                                .values[index].value_index.toString());
                            if (option_value) {
                                option_values.push(option_value);
                            }
                        }
                        options.push({
                            id: products[productIndex]
                                .extension_attributes
                                .configurable_product_options[jindex].attribute_id,
                            label: products[productIndex]
                                .extension_attributes
                                .configurable_product_options[jindex].label,
                            values: option_values
                        })
                    }
                    const variationsObj = {
                        type: 'configurable',
                        variants: options
                    }
                    this.setState({
                        variations: variationsObj
                    })
                })
                    .catch((err) => {
                        this.openNotificationWithIcon('error', err)
                    })
            }
        }
    }
    variationSelection(evt, type) {
        const selectedVariationArray = this.state.variation;
        selectedVariationArray.push(
            {
                type: type,
                value: evt
            }
        )
        this.setState({
            variation: selectedVariationArray
        })
    }
    addToCart(product) {
        if (this.props.customerId === 0) {
            const err = {
                payload: {
                    response: {
                        data: {
                            message: 'Select Customer First in order to perform Add to Cart'
                        }
                    }
                }
            }
            this.openNotificationWithIcon('error', err)
            return;
        }
        if (this.props.cartId === 0) {
            const err = {
                payload: {
                    response: {
                        data: {
                            message: 'Cart Id has not been created yet'
                        }
                    }
                }
            }
            this.openNotificationWithIcon('error', err)
            return;
        }
        this.setState({
            quantity: document.getElementById(`${product.id}Quantity`).value
        })
        if (product.type_id === 'grouped') {
            const obj = {
                "cartItem": {
                    "sku": this.state.variation[0].type.sku,
                    "qty": this.state.quantity,
                    "quote_id": this.props.cartId
                }
            }
            this.props.addToCart(this.props.cartId, obj)
                .then((res) => {
                    this.props.getCartItems(this.props.cartId)
                })
                .catch(err => {
                    this.openNotificationWithIcon('error', err)
                })
        } else if (product.type_id === 'configurable') {
            const obj = {
                "cartItem": {
                    "sku": product.sku,
                    "qty": this.state.quantity,
                    "quote_id": this.props.cartId,
                    "product_option": {
                        "extension_attributes": {
                            "configurable_item_options": []
                        }
                    },
                    "extension_attributes": {}
                }
            }
            for (let index = 0; index < this.state.variation.length; index++) {
                obj.cartItem.product_option.extension_attributes.configurable_item_options.push({
                    "option_id": this.state.variation[index].type,
                    "option_value": this.state.variation[index].value
                })
            }
            this.props.addToCart(this.props.cartId, obj)
                .then((res) => {
                    this.props.getCartItems(this.props.cartId)
                })
                .catch(err => {
                    this.openNotificationWithIcon('error', err)
                })
        }
        else {
            const obj = {
                "cartItem": {
                    "sku": product.sku,
                    "qty": this.state.quantity,
                    "quote_id": this.props.cartId
                }
            }
            this.props.addToCart(this.props.cartId, obj)
                .then((res) => {
                    this.props.getCartItems(this.props.cartId)
                })
                .catch(err => {
                    this.openNotificationWithIcon('error', err)
                })
        }
    }
    render() {
        return (
            <Card title="Products List">
                <div>
                    <Spin spinning={this.props.loading} delay={500}>
                        <Search
                            placeholder='Search Products'
                            onSearch={value => this.search(value)}
                            enterButton />
                        <div className="margin-top">
                            <List
                                products={this.state.fetchProducts}
                                variations={this.state.variations}
                                addToCart={this.addToCart}
                                handleCollapseFunction={this.handleCollapseFunction}
                                variationSelection={this.variationSelection}
                            />
                        </div>
                    </Spin>
                </div>
            </Card>
        );
    }
}

export { ProductsComponent };
