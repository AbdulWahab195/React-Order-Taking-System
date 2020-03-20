import React, { Component } from "react";
import { Tree, Input, Icon } from "antd";
import { Card } from "antd";

const { TreeNode } = Tree;

const dataList = [];
const generateList = data => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    dataList.push({ key: node.id, name: node.name });
    if (node.children_data) {
      generateList(node.children_data);
    }
  }
};

const getParentKey = (id, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children_data) {
      if (node.children_data.some(item => item.id === id)) {
        parentKey = node.id;
      } else if (getParentKey(id, node.children_data)) {
        parentKey = getParentKey(id, node.children_data);
      }
    }
  }
  return parentKey;
};

class CategoriesComponent extends Component {
  constructor() {
    super();
    this.state = {
      expandedKeys: [],
      searchValue: "",
      autoExpandParent: true,
      categories: []
    };
  }

  getProductsFromCategory(categoryId) {
    const { searchProductsByCategoryId } = this.props;
    searchProductsByCategoryId(categoryId);
  }
  componentDidMount() {
    const { getCategories } = this.props;
    getCategories();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.categories !== this.props.categories) {
      this.setState({ categories: this.props.categories });
      generateList(this.props.categories);
    }
  }

  onExpand = expandedKeys => {
    this.setState({
      expandedKeys,
      autoExpandParent: true
    });
  };

  onChange = e => {
    const { value } = e.target;
    const { categories } = this.state;
    const expandedKeys = dataList
      .map(item => {
        if (item.name.indexOf(value) > -1) {
          return getParentKey(item.key, categories);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true
    });
  };

  render() {
    const {
      categories,
      searchValue,
      expandedKeys,
      autoExpandParent
    } = this.state;

    const loop = data =>
      data.length > 0
        ? data.map(item => {
            const index = item.name.indexOf(searchValue);
            const beforeStr = item.name.substr(0, index);
            const afterStr = item.name.substr(index + searchValue.length);
            const name =
              index > -1 ? (
                <span onClick={() => this.getProductsFromCategory(item.id)}>
                  {beforeStr}
                  <span style={{ color: "#1890ff" }}>{searchValue}</span>
                  {afterStr}
                </span>
              ) : (
                <span onClick={() => this.getProductsFromCategory(item.id)}>
                  {item.name}
                </span>
              );
            if (item.children_data) {
              return (
                <TreeNode key={item.id} title={name}>
                  {loop(item.children_data)}
                </TreeNode>
              );
            }
            return <TreeNode key={item.id} title={name} />;
          })
        : null;
    return (
      <Card title="Categories List">
        <div>
          <Input
            placeholder="Search Categories"
            addonBefore={<Icon type="search" />}
            size="large"
            type="text"
            onChange={this.onChange}
          />
          <Tree
            onExpand={this.onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
          >
            {loop(categories)}
          </Tree>
        </div>
      </Card>
    );
  }
}

export { CategoriesComponent };
