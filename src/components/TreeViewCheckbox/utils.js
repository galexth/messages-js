export const determineCheckState = (node) => {
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
};

export const isEveryChildChecked = (node) => {
  return node.childs.every(
    (child) => this.state.model.getNode(child.nodeId).checkState === 1
  );
};

export const isSomeChildChecked = (node) => {
  return node.childs.some(
    (child) => this.state.model.getNode(child.nodeId).checkState > 0
  );
};
