class Model {
  constructor(nodes = {}) {
    this.flatNodes = nodes;
  }

  flat(array, parent = null) {
    array.forEach(function (item) {
      this.flatNodes[item.nodeId] = { ...item, parent };

      if (item.childs) {
        this.flat(item.childs, item);
      }
    }, this);
  }

  getNode(id) {
    return this.flatNodes[id];
  }

  toggleChecked(id, value, bubble = true) {
    const node = this.getNode(id);

    node.checked = value;

    if (Array.isArray(node.childs)) {
      node.childs.forEach((child) => {
        this.toggleChecked(child.nodeId, value, false);
      });
    }

    if (bubble && node.parent) {
      this.toggleParent(node.parent.nodeId, value);
    }

    return this;
  }

  toggleParent(id, value) {
    const node = this.getNode(id);

    node.checked = this.isEveryChildChecked(node);

    if (node.parent) {
      this.toggleParent(node.parent.nodeId, value);
    }
  }

  isEveryChildChecked(node) {
    return node.childs.every((child) => this.getNode(child.nodeId).checked);
  }
}
export default Model;
