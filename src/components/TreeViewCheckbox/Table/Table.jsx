import React from "react";
import Model from "../Model";
import TableRow from "./TableRow";

class Table extends React.Component {
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
        <TableRow
          key={item[config.title] + depth}
          title={config.title}
          columns={Object.keys(config.headers)}
          item={item}
          depth={depth}
          checkState={node.checkState}
          checked={node.checked}
          onChange={this.onChange}
        >
          {children}
        </TableRow>
      );
    });
  }

  render() {
    const { headers } = this.props.config;
    return (
      <table>
        <thead>
          <tr>
            {Object.values(headers).map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>{this.renderNodes(this.state.nodes)}</tbody>
      </table>
    );
  }
}

export default Table;
