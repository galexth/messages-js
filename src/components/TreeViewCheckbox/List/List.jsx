import React from "react";
import TreeNode from "./ListNode";
import Model from "../Model";

class List extends React.Component {
  constructor(props) {
    super(props);

    const model = new Model(props.items, props.config);

    this.state = {
      nodes: model.nodes,
      model,
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(id, value) {
    const { model } = this.state;
    model.toggleChecked(id, value);
    this.setState({ model });
  }

  renderNodes(items, depth = 0) {
    const { model } = this.state;
    const { config } = this.props;

    return items.map((item) => {
      const node = model.getNode(item.nodeId);

      const children = item.childs
        ? this.renderNodes(item.childs, depth + 1)
        : null;

      node.checkState = model.getCheckState(node);

      return (
        <TreeNode
          key={item[config.title] + depth}
          title={config.title}
          item={item}
          checkState={node.checkState}
          checked={node.checked}
          onChange={this.onChange}
        >
          {children}
        </TreeNode>
      );
    });
  }

  render() {
    return <ul>{this.renderNodes(this.state.nodes)}</ul>;
  }
}

export default List;
