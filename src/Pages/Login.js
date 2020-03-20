import React, { Component } from 'react';
import { message } from 'antd';
import { LoginComponent } from '../Components/Login';

class Login extends Component {

  handleSubmit = (e, form) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        this.props.login(values)
          .then(() => {
            this.props.updateToken()
            .then((response) => {
              localStorage.setItem('token', response.payload);
              this.props.history.push('/');
            })
            .catch((err) => {
            })
          })
          .catch(err => {
            message.error(err.payload, 5);
          });
      }
    });
  }

  render() {
    return (
      <LoginComponent
        error={this.props.error}
        loading={this.props.loading}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

export { Login };
