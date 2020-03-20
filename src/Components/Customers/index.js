import React, { Component, Fragment } from "react";
import { Card, Select, Button, Modal, Icon } from "antd";

import AccountForm from "./AccountForm";
import ShippingForm from "./../Shipping/ShippingForm";
import BillingForm from "./../Shipping/BillingForm";

const { Option } = Select;

class CustomersComponent extends Component {
  constructor() {
    super();
    this.state = {
      customers: [],
      accounts: [],
      shipping_addresses: [],
      billing_addresses: [],
      billing_visible: false,
      shipping_visible: false,
      visible: false,
      customer: {}
    };
    this.onChange = this.onChange.bind(this);
    this.showModalBilling = this.showModalBilling.bind(this);
    this.showModalShipping = this.showModalShipping.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.customers !== this.props.customers) {
      this.setState({
        customers: this.props.customers
      });
    }
  }

  onChange = value => {
    const customer = this.props.customers.find(x=>x.id === value);
    const billingAddress = customer.addresses.filter(x => x.id.toString() === customer.default_billing)
    const shippingAddress = customer.addresses.filter(x => x.id.toString() === customer.default_shipping)
    this.setState({
      billing_addresses: billingAddress
    })
    this.setState({
      customer: customer
    })
    this.setState({
      shipping_addresses: shippingAddress
    })
    console.log(billingAddress);
    console.log(shippingAddress);
    this.props.storeCustomerIdToRedux(value)
    .then(() => {
      this.props.getCartIdFromCustomerId(this.props.customerId)
      .then(() => {
        this.props.getCartItems(this.props.cartId)
      })
    });
  };
  onSearch = val => {
    const { getCustomers } = this.props;
    if (val.length > 2) {
      getCustomers(val);
    } else {
      this.setState({ customers: [] });
    }
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  showModalShipping = () => {
    this.setState({ shipping_visible: true });
  };

  showModalBilling = () => {
    console.log("Billing Modal");
    this.setState({ billing_visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
    this.setState({ billing_visible: false });
    this.setState({ shipping_visible: false });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
      }
    });
  };

  render() {
    const { createAccount, addAddress } = this.props;
    const { customers, visible } = this.state;
    return (
      <Fragment>
        <Card title="Account Selection" style={{ marginBottom: "15px" }}>
          <div className="add-account">
            <Button type="primary" onClick={this.showModal}>
              <Icon type="plus" />
            </Button>
          </div>
          <Select
            showSearch
            style={{ width: "100%" }}
            placeholder="Select a customer"
            optionFilterProp="children"
            onChange={this.onChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onSearch={this.onSearch}
            className="customer-search-input"
          >
            {customers &&
              customers.length > 0 &&
              customers.map(data => {
                return (
                  <Option
                    key={data.id}
                    value={data.id}
                    className="search-customer"
                  >
                    <p>
                      <span>Name:</span>{" "}
                      {` ${data.firstname} ${data.lastname} ${" "}`}
                    </p>
                    <span>Email: </span>
                    {` ${data.email}`}
                  </Option>
                );
              })}
          </Select>
          <Select
            style={{ width: "80%" }}
            placeholder="Select a Shipping Address"
            className="customer-search-input"
          >
            {this.state.shipping_addresses &&
              this.state.shipping_addresses.length > 0 &&
              this.state.shipping_addresses.map(data => {
                return (
                  <Option
                    key={data.id}
                    value={data.id}
                    className="search-customer"
                  >
                    <p>
                      <span>Name:</span>{" "}
                      {` ${data.firstname} ${data.lastname} ${" "}`}
                    </p>
                    <p>
                      <span>City:</span>{" "}
                      {` ${data.city}${" "}`}
                    </p>
                    <p>
                      <span>Postal Code:</span>{" "}
                      {` ${data.postcode}${" "}`}
                    </p>
                    <p>
                      <span>Telephone:</span>{" "}
                      {` ${data.telephone}${" "}`}
                    </p>
                    <span>Company: </span>
                    {` ${data.company}`}
                  </Option>
                );
              })}
          </Select>
          <Button type="primary" onClick={this.showModalShipping} style={{ float: 'right' }}>
            <Icon type="plus" />
          </Button>
          <Select
            style={{ width: "80%" }}
            placeholder="Select a Billing Address"
            className="customer-search-input"
          >
            {this.state.billing_addresses &&
              this.state.billing_addresses.length > 0 &&
              this.state.billing_addresses.map(data => {
                return (
                  <Option
                    key={data.id}
                    value={data.id}
                    className="search-customer"
                  >
                    <p>
                      <span>Name:</span>{" "}
                      {` ${data.firstname} ${data.lastname} ${" "}`}
                    </p>
                    <p>
                      <span>City:</span>{" "}
                      {` ${data.city}${" "}`}
                    </p>
                    <p>
                      <span>Postal Code:</span>{" "}
                      {` ${data.postcode}${" "}`}
                    </p>
                    <p>
                      <span>Telephone:</span>{" "}
                      {` ${data.telephone}${" "}`}
                    </p>
                    <span>Company: </span>
                    {` ${data.company}`}
                  </Option>
                );
              })}
          </Select>
          <Button type="primary" onClick={this.showModalBilling} style={{float:'right'}}>
            <Icon type="plus" />
          </Button>
        </Card>

        <Modal
          visible={visible}
          title="Create a new account"
          okText="Create account"
          footer={false}
          onCancel={this.handleCancel}
          className="large"
        >
          {visible && (
            <AccountForm
              onCancel={this.handleCancel}
              createAccount={createAccount}
            />
          )}
        </Modal>
        <Modal
          visible={this.state.shipping_visible}
          title="Create a new Shipping Address"
          okText="Submit"
          footer={false}
          onCancel={this.handleCancel}
          className="large"
        >
          {this.state.shipping_visible && (
            <ShippingForm
              onCancel={this.handleCancel}
              addAddress={addAddress}
              customer={this.state.customer}
            />
          )}
        </Modal>
        <Modal
          visible={this.state.billing_visible}
          title="Create a new Billing Address"
          okText="Submit"
          footer={false}
          onCancel={this.handleCancel}
          className="large"
        >
          {this.state.billing_visible && (
            <BillingForm
              onCancel={this.handleCancel}
              addAddress={addAddress}
              customer={this.state.customer}
            />
          )}
        </Modal>
      </Fragment>
    );
  }
}

export { CustomersComponent };
