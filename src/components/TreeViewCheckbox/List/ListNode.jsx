import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {
  faChevronRight,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import Checkbox from "../Checkbox";
import { Chevron, Collapse } from "./ListNode.styled";

export default function ListNode(props) {
  const [open, setOpen] = useState(false);

  const { item, checked, title, checkState, onChange, children } = props;

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
    <li>
      <div onClick={handleCollapse}>
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
      </div>
      <Collapse open={open}>
        <ul>{children}</ul>
      </Collapse>
    </li>
  );
}
