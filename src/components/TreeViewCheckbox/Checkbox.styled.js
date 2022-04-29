import styled from "styled-components";

export const Label = styled.label`
  padding: 6px;
  cursor: pointer;
`;
export const Title = styled.span`
  line-height: 22px;
  padding: 4px 2px;
  cursor: pointer;
  user-select: none;
  ${(p) => p.bold && `font-weight: 500;`}
  &:hover {
    font-weight: bold;
  }
`;
