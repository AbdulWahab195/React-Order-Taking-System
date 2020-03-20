import React from 'react'
import { Collapse, Button, Row, Col, Select, Typography, Input } from 'antd';
const { Option } = Select;
const { Text } = Typography;
const { Panel } = Collapse;

const List = ({ products, variations, addToCart, handleCollapseFunction, variationSelection }) => {
    function RenderProductVariations(props) {
        if (props.variations.type === 'grouped') {
            return (
                <ul className="product-image">
                    {
                        props.variations.variants.map(variant => {
                            return (
                                <li key={variant.id} className="product-image-li">
                                    <input type="checkbox" id={`cb${variant.id}`} onChange={evt => variationSelection(evt, variant)}/>
                                    <label htmlFor={`cb${variant.id}`}><img src={`http://54.67.47.199/pub/media/catalog/product${variant.media_gallery_entries[0].file}`} alt={variant.name}></img></label>
                                </li>
                            )
                        }
                        )
                    }

                </ul>
            );
        } else if (props.variations.type === 'configurable') {
            return (
                props.variations.variants.map(
                    variant => {
                        const listItems = variant.values.map((variant_value) =>
                            <Option key={variant_value.value}
                                value={variant_value.value}>{variant_value.label}</Option>
                        );
                        return (
                            <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 20]}>
                                <Col span={8}>
                                    <Text type="secondary">{variant.label}</Text>
                                </Col>
                                <Col span={8}>
                                    <Select defaultValue={variant.values[0].value} key={variant.label} style={{ width: 230 }} onChange={evt => variationSelection(evt, variant.id)}>
                                        {listItems}
                                    </Select>
                                </Col>
                            </Row>
                        )
                    }
                )
            )
        } else {
            return (
                <div></div>
            )
        }
    }
    return (
        <Collapse accordion onChange={handleCollapseFunction}>
            {
                products.map(product => {
                    return (
                        <Panel header={product.name} key={product.id}>
                            <p>{product.name}</p>
                            <br />
                            {/* {`rv${product.id}`} */}
                            <RenderProductVariations key={`rv${product.id}`} variations={variations} />
                            <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 20]}>
                                <Col span={24}>
                                    <Input
                                        id={`${product.id}Quantity`}
                                        placeholder='Product Quantity'
                                        type='number'
                                        min='1'
                                        defaultValue='1'
                                        style={{ width: '250px', marginRight: '5px' }}
                                    />
                                    <Button onClick={() => addToCart(product)}>Add to Cart</Button>
                                </Col>
                            </Row>
                        </Panel>
                    )
                }
                )
            }
        </Collapse>
    )
}
export { List }