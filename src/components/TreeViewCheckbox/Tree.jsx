import React from "react";
import TreeNode from "./TreeNode";
import Model from "./Model";

class Tree extends React.Component {
  constructor(props) {
    super(props);

    const itemsWithIds = this.addId(props.items);
    const model = new Model();

    model.flat(itemsWithIds);

    this.state = {
      items: itemsWithIds,
      model,
    };
  }

  addId(items, title = "") {
    return items.map((item) => {
      const nodeId = `${title}/${item.title}`;
      return {
        ...item,
        nodeId,
        childs: item.childs ? [...this.addId(item.childs, nodeId)] : [],
      };
    });
  }

  determineCheckState(node) {
    if (!node.childs || node.childs.length === 0) {
      return node.checked ? 1 : 0;
    }
    if (this.isEveryChildChecked(node)) {
      return 1;
    }

    if (this.isSomeChildChecked(node)) {
      return 2;
    }

    return 0;
  }

  isEveryChildChecked(node) {
    return node.childs.every(
      (child) => this.state.model.getNode(child.nodeId).checkState === 1
    );
  }

  isSomeChildChecked(node) {
    return node.childs.some(
      (child) => this.state.model.getNode(child.nodeId).checkState > 0
    );
  }

  renderItems(items) {
    const { model } = this.state;

    return items.map((item) => {
      const node = model.getNode(item.nodeId);

      const children = item.childs ? this.renderItems(item.childs) : null;

      node.checkState = this.determineCheckState(node);

      return (
        <TreeNode
          key={item.title}
          item={item}
          checkState={node.checkState}
          checked={!!node.checked}
          onChange={(id, value) => {
            model.toggleChecked(id, value);
            this.setState({ model });
          }}
        >
          {children}
        </TreeNode>
      );
    });
  }

  render() {
    return <ul>{this.renderItems(this.state.items)}</ul>;
  }
}

export default Tree;
