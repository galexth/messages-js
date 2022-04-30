class Node {
  constructor(nodes = [], config = {}) {
    this.config = config;
    this.flatNodes = {};
    this.nodes = this.addId(nodes);

    this.reduce(this.nodes).forEach((item) => {
      this.flatNodes[item.nodeId] = item;
    }, this);
  }

  reduce(array, parentId = null) {
    return array.reduce((acc, item) => {
      const reduced = this.reduce(item.childs, item.nodeId);
      return [
        ...acc,
        {
          nodeId: item.nodeId,
          checked: !!item.checked,
          checkState: !!item.checkState,
          parentId,
          childs: reduced,
        },
        ...reduced,
      ];
    }, []);
  }

  addId(items, id = "") {
    return items.map((item) => {
      const nodeId = `${id}/${item[this.config.title]}`;
      return {
        ...item,
        nodeId,
        childs: item.childs ? [...this.addId(item.childs, nodeId)] : [],
      };
    });
  }

  getNode(id) {
    return this.flatNodes[id];
  }

  hasChildren(node) {
    return node.childs && node.childs.length > 0;
  }

  toggleChecked(id, value, bubble = true) {
    const node = this.getNode(id);

    node.checked = value;

    if (this.hasChildren(node)) {
      node.childs.forEach((child) => {
        this.toggleChecked(child.nodeId, value, false);
      });
    }

    if (bubble && node.parentId) {
      this.toggleParent(node.parentId, value);
    }

    return this;
  }

  toggleParent(id, value) {
    const node = this.getNode(id);

    node.checked = this.isEveryChildChecked(node);

    if (node.parentId) {
      this.toggleParent(node.parentId, value);
    }
  }

  getCheckState = (node) => {
    if (!this.hasChildren(node)) {
      return node.checked ? 1 : 0;
    }
    if (this.isEveryChildInCheckedState(node)) {
      return 1;
    }

    if (this.isSomeChildrenInCheckedState(node)) {
      return 2;
    }

    return 0;
  };

  isEveryChildChecked(node) {
    return node.childs.every((child) => this.getNode(child.nodeId).checked);
  }

  isEveryChildInCheckedState(node) {
    return node.childs.every(
      (child) => this.getNode(child.nodeId).checkState === 1
    );
  }

  isSomeChildrenInCheckedState(node) {
    return node.childs.some(
      (child) => this.getNode(child.nodeId).checkState > 0
    );
  }
}
export default Node;
