import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {
  faChevronRight,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { Chevron, Cell, Brick } from "./TableRow.styled";
import Checkbox from "../Checkbox";

export default function TableRow(props) {
  const [open, setOpen] = useState(false);

  const {
    item,
    columns,
    title,
    checked,
    checkState,
    onChange,
    children,
    depth,
  } = props;

  const hasChildren = item.childs && item.childs.length > 0;

  const handleChange = () => {
    onChange(item.nodeId, !checked);
  };

  const handleCollapse = () => {
    if (hasChildren) {
      setOpen((prev) => !prev);
    }
  };

  return (
    <>
      <tr>
        <Cell onClick={handleCollapse}>
          {[...Array(depth + !hasChildren)].map((_, i) => (
            <Brick key={item.nodeId + i} />
          ))}
          {hasChildren && (
            <Chevron>
              <FontAwesomeIcon
                size="sm"
                icon={open ? faChevronDown : faChevronRight}
              />
            </Chevron>
          )}
          <Checkbox
            title={item[title]}
            checkState={checkState}
            handleChange={handleChange}
          />
        </Cell>
        {columns
          .filter((i) => i !== title)
          .map((i) => (
            <Cell key={item.nodeId + i}>{item[i]}</Cell>
          ))}
      </tr>
      {open && children}
    </>
  );
}
