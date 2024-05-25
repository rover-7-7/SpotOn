/* eslint-disable react/prop-types */
import styled, { keyframes } from "styled-components";

// Keyframes for glowing animation
const glowing = keyframes`
  0% { background-position: 0 0; }
  50% { background-position: 400% 0; }
  100% { background-position: 0 0; }
`;

// Button styled-component
const Button = styled.button`
  margin: 25px;
  padding: 5px 20px;
  border: none;
  outline: none;
  color: #fff;
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 12px;
  background-color: transparent;
  font-size: 16px;

  &::after {
    content: "";
    z-index: -1;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #333;
    left: 0;
    top: 0;
    border-radius: 10px;
  }

  &::before {
    content: "";
    background: linear-gradient(
      45deg,
      #ff0000,
      #ff7300,
      #fffb00,
      #48ff00,
      #00ffd5,
      #002bff,
      #ff00c8,
      #ff0000
    );
    position: absolute;
    top: -2px;
    left: -2px;
    background-size: 600%;
    z-index: -1;
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    filter: blur(8px);
    animation: ${glowing} 20s linear infinite;
    transition: opacity 0.3s ease-in-out;
    border-radius: 10px;
    opacity: 0;
  }

  &:hover::before {
    opacity: 1;
  }

  &:active::after {
    background: transparent;
  }

  &:active {
    color: #000;
    font-weight: bold;
  }
`;

const Glowing = ({ name }) => {
  return (
    <>
      <Button>{name}</Button>
    </>
  );
};

export default Glowing;
