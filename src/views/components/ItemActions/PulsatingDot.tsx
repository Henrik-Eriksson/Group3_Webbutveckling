import styled, { keyframes } from "styled-components";

const pulsate = keyframes`
    0% {transform: scale(0.1, 0.1); opacity: 0.0;}
    50% {opacity: 1.0;}
    100% {transform: scale(1.2, 1.2); opacity: 0.0;}
`;

const Ring = styled.div`
  border: 3px solid #3498db;
  border-radius: 30px;
  height: 30px;
  width: 30px;
  position: absolute;
  top: calc(-50% - 3px);
  left: calc(-50% - 3px);

  animation: ${pulsate} 1s ease-out;
  animation-iteration-count: 3;
  opacity: 0;
`;

const Circle = styled.div`
  position: relative;
  width: 15px;
  height: 15px;
  background-color: #3498db;
  border-radius: 50%;
  position: relative;
`;

export function PulsatingDot() {
  return (
    <Circle>
      <Ring />
    </Circle>
  );
}
