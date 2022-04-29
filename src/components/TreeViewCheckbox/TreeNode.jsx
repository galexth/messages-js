import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {
  faChevronRight,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import Checkbox from "./Checkbox";
import { Chevron, Collapse } from "./TreeNode.styled";

export default function TreeNode(props) {
  const [open, setOpen] = useState(false);

  const { item, checked, checkState, onChange, children } = props;

  const hasChildren = (i) => i.childs && i.childs.length > 0;

  const handleChange = () => {
    onChange(item.nodeId, !checked);
  };

  return (
    <li>
      <div
        onClick={() => {
          if (hasChildren(item)) {
            setOpen((prev) => !prev);
          }
        }}
      >
        {hasChildren(item) && (
          <Chevron>
            <FontAwesomeIcon
              size="sm"
              icon={open ? faChevronDown : faChevronRight}
            />
          </Chevron>
        )}
        <Checkbox
          title={item.title}
          checkState={checkState}
          handleChange={handleChange}
        />
      </div>
      <Collapse open={open}>
        <ul>{children}</ul>
      </Collapse>
    </li>
  );
}
