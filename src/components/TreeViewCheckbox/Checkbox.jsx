import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare, faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import { faSquareCheck as faSquareCheckSolid } from "@fortawesome/free-solid-svg-icons";
import { Label, Title } from "./Checkbox.styled";

export default function Checkbox({ title, checkState, handleChange }) {
  const renderCheckboxIcon = (checked) => {
    switch (checked) {
      case 1:
        return <FontAwesomeIcon size="1x" icon={faSquareCheckSolid} />;
      case 2:
        return <FontAwesomeIcon size="1x" icon={faSquareCheck} />;
      default:
        return <FontAwesomeIcon size="1x" icon={faSquare} />;
    }
  };

  return (
    <>
      <Label>
        {renderCheckboxIcon(checkState)}
        <input
          type="checkbox"
          hidden
          checked={checkState > 0}
          onChange={handleChange}
        />
      </Label>
      <Title bold={checkState === 1}>{title}</Title>
    </>
  );
}
