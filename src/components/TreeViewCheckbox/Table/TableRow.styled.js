import styled from "styled-components";

export const Collapse = styled.div`
  display: none;
  ${(p) => p.open && `display: block;`}
`;

export const Chevron = styled.span`
  display: inline-block;
  padding: 0 4px;
  width: 14px;
  cursor: pointer;
`;

export const Cell = styled.td`
  padding: 3px 12px;
`;

export const Brick = styled.span`
  display: inline-block;
  width: 20px;
`;
