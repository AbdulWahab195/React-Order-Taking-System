import React, { Component } from "react";
import { Select, Button, Form, Input, Icon, Tooltip } from "antd";

const { Option } = Select;

class AccountForm extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    addresses: []
  };

  handleSubmit = e => {
    e.preventDefault();

    const { onCancel, createAccount } = this.props;

    this.props.form.validateFieldsAndScroll((err, values) => {
      const data = {
        customer: {
          email: values.email,
          firstname: values.firstname,
          lastname: values.lastname,
          company: values.companyname
          // addresses: [
          //   {
          //     region: {
          //       region: values.rigion
          //     },
          //     defaultShipping: true,
          //     defaultBilling: true,
          //     firstname: values.firstname,
          //     lastname: values.lastname,

          //     telephone: `${values.prefix}${values.phone}`,
          //     postcode: values.postcode,
          //     city: values.city,
          //     street: [values.street],
          //     default_shipping: true,
          //     default_billing: true
          //   }
          // ]
        },
        password: values.password
      };

      if (!err) {
        createAccount(data);
        onCancel();
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;

    if (this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  render() {
    const { form, onCancel } = this.props;
    const { getFieldDecorator } = form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "86"
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );

    return (
      <Form
        {...formItemLayout}
        onSubmit={this.handleSubmit}
        className="account-form"
      >
        <Form.Item
          label={
            <span>
              First Name&nbsp;
              <Tooltip title="Pleae enter your first name">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator("firstname", {
            rules: [
              {
                required: true,
                message: "Please input your first name!",
                whitespace: true
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item
          label={
            <span>
              Last Name&nbsp;
              <Tooltip title="Pleae enter your last name">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator("lastname", {
            rules: [
              {
                required: true,
                message: "Please input your last name!",
                whitespace: true
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="E-mail">
          {getFieldDecorator("email", {
            rules: [
              {
                type: "email",
                message: "The input is not valid E-mail!"
              },
              {
                required: true,
                message: "Please input your E-mail!"
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item
          label={
            <span>
              Company Name&nbsp;
              <Tooltip title="Pleae enter your company name">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator("companyname", {
            rules: [
              {
                required: true,
                message: "Please input your company name!",
                whitespace: true
              }
            ]
          })(<Input />)}
        </Form.Item>
        {/* <Form.Item label="Phone Number">
          {getFieldDecorator("phone", {
            rules: [
              { required: true, message: "Please input your phone number!" }
            ]
          })(<Input addonBefore={prefixSelector} style={{ width: "100%" }} />)}
        </Form.Item>
        <Form.Item
          label={
            <span>
              Street&nbsp;
              <Tooltip title="Pleae enter your Street name">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator("street", {
            rules: [
              {
                required: true,
                message: "Please input your street!",
                whitespace: true
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item
          label={
            <span>
              City&nbsp;
              <Tooltip title="Pleae enter your Street name">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator("city", {
            rules: [
              {
                required: true,
                message: "Please input your city!",
                whitespace: true
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item
          label={
            <span>
              Region&nbsp;
              <Tooltip title="Pleae enter your Street name">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator("rigion", {
            rules: [
              {
                required: true,
                message: "Please input your region!",
                whitespace: true
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item
          label={
            <span>
              Post Code&nbsp;
              <Tooltip title="Pleae enter your Street name">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator("postcode", {
            rules: [
              {
                required: true,
                message: "Please input your Post Code!",
                whitespace: true
              }
            ]
          })(<Input />)}
        </Form.Item> */}
        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "Please input your password!"
              },
              { min: 8, message: "Username must be minimum 8 characters" },
              { pattern: /[a-zA-Z ]/, message: "and words and numbers both" },
              {
                validator: this.validateToNextPassword
              }
            ]
          })(<Input.Password value="" />)}
        </Form.Item>
        <Form.Item label="Confirm Password" hasFeedback>
          {getFieldDecorator("confirm", {
            rules: [
              {
                required: true,
                message: "Please confirm your password!"
              },
              {
                validator: this.compareToFirstPassword
              }
            ]
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>

        <Form.Item className="account-btn">
          <Button
            style={{ marginRight: "15px" }}
            type="primary"
            htmlType="submit"
          >
            Register
          </Button>

          <Button type="default" onClick={onCancel}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const accountForm = Form.create({ name: "account_create" })(AccountForm);

export default accountForm;
