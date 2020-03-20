import React, { Component } from "react";
import { Col, Row } from "antd";
import { ProductsComponent } from "../Components/Products";
import { CartComponent } from "../Components/Cart";
import { CategoriesComponent } from "../Components/Categories";
import { CustomersComponent } from "../Components/Customers";

class Home extends Component {
  render() {
    return (
      <div>
        <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 20]}>
          <Col span={8}>
            <CustomersComponent {...this.props} />
            <CategoriesComponent {...this.props} />
          </Col>
          <Col span={8}>
            <ProductsComponent {...this.props} />
          </Col>
          <Col span={8}>
            <CartComponent {...this.props} />
          </Col>
        </Row>
      </div>
    );
  }
}

export { Home };
