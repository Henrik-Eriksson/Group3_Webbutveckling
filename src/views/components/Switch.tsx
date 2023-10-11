import styled from "styled-components";

const Container = styled.label`
  --slider-indicator-color: #fff;
  --slider-color: #ccc;
  --slider-checked-color: #3ecf8e;
  --slider-focus: 0 0 0 0.2rem rgb(0 0 0 / 50%);
  position: relative;
  display: inline-block;
  width: 60px;
  height: 30px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--slider-color);
  transition: 0.3s;
  border-radius: 34px;

  ::before {
    position: absolute;
    content: "";
    height: 22px;
    width: 22px;
    left: 4px;
    bottom: 4px;
    background-color: var(--slider-indicator-color);
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

const Input = styled.input`
  :checked + ${Slider} {
    background: var(--slider-checked-color);
  }
  :focus-visible + ${Slider} {
    box-shadow: var(--slider-checked-color);
  }
  :checked + ${Slider}:before {
    transform: translateX(30px);
  }
`;

export function Switch(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Container>
      <Input type="checkbox" {...props} />
      <Slider />
    </Container>
  );
}
