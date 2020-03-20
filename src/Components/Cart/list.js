import React from 'react'
import { List, Avatar } from 'antd';



const CartList = ({ cart, deleteItemFromCart }) => {
    function RenderVariation(props) {
        if (props.item.options.length === 0) {
            return (
                <List.Item.Meta
                    title={props.item.name}
                    description={`Price: ${props.item.row_total}, Quantity: ${props.item.qty}`}
                />
            )
        } else {
            let str = '';
            const option = JSON.parse(props.item.options);
            for (let index = 0; index < option.length; index++) {
                str += `${option[index].label}: ${option[index].value}, `;
            }
            return (
                <List.Item.Meta
                    avatar={<Avatar src={`http://54.67.47.199/pub/media/catalog/product${props.item.image}`} />}
                    title={props.item.name}
                    description={str + `Price: ${props.item.row_total}, Quantity: ${props.item.qty}`}
                />
            )
        }
    }
    return (
        <div>
            <List
                itemLayout="horizontal"
                dataSource={cart.items}
                renderItem={item => (
                    <List.Item
                        actions={[<a key="list-loadmore-edit" onClick={() => deleteItemFromCart(item.item_id)}>remove</a>]}
                    >
                        <RenderVariation key={item.item_id} item={item} />
                    </List.Item>
                )}
            />
        </div>
    )
}
export { CartList }