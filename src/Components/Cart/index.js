

import React, { Component } from 'react';
import { CartList } from './list';
import { Card, Row, Col, Spin } from 'antd';

class CartComponent extends Component {
    constructor() {
        super();
        this.state = {
            cart: {
                base_currency_code: '',
                items: [],
                total_segments: []
            }
        }
        this.deleteItemFromCart = this.deleteItemFromCart.bind(this);
    }
    deleteItemFromCart(itemId) {
        this.props.deleteItemFromCart(this.props.cartId, itemId)
            .then(() => {
                this.props.getCartItems(this.props.cartId)
            })
            .catch((err) => {
                console.log(err);
            })
    }
    async componentDidUpdate(prevProps) {
        let cart = {};
        if (prevProps.cart.items_qty !== this.props.cart.items_qty) {
            cart = this.props.cart;
            const { searchProductsFromCart } = this.props;
            for (let index = 0; index < cart.items.length; index++) {
                const result = await searchProductsFromCart(cart.items[index].name);
                cart.items[index].image = result.payload.items[0].media_gallery_entries[0].file;
            }
            this.setState({
                cart: cart
            })
        }
    }

    render() {
        return (
            <div>
                <Card title="Cart" style={{ marginBottom: '10px' }}>
                    <Spin spinning={this.props.loading} delay={500}>
                    <div style={{
                        height: '400px',
                        overflowY: 'scroll'
                    }}>
                        <CartList
                            cart={this.state.cart}
                            deleteItemFromCart={this.deleteItemFromCart} />
                    </div>
                    <div>
                        {
                            this.props.cart.total_segments.map(data => {
                                return (
                                    <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 20]}>
                                        <Col span={16}>
                                            <p key={`l${data.title}`} className="total-label">{data.title}:</p>
                                        </Col>
                                        <Col span={8}>
                                            <p key={`v${data.title}`}>{data.value} {this.props.cart.base_currency_code}</p>
                                        </Col>
                                    </Row>
                                )
                            })
                        }
                    </div>
                    </Spin>
                </Card>
                {/* <ShippingComponent {...this.props} /> */}
            </div>
        );
    }
}

export { CartComponent };
