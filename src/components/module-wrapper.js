import React from 'react';
import styled from 'styled-components';

const color = {
  interior: '#fcfcfc',
  exterior: '#eee',
};

const clipPath = `polygon(0% 0%, 5%  100%, 10% 0%, 15%  100%,
  20% 0%, 25% 100%, 30% 0%, 35%  100%, 40% 0%, 45%  100%, 50% 0%,
  55%  100%, 60% 0%, 65%  100%, 70% 0%, 75%  100%, 80% 0%, 85%  100%,
  90% 0%, 95%  100%, 100% 0%);`;

const MainContainer = styled.section`
  position: relative;
  width: 100%;
  margin: 40px auto;
`;

const ChildContainer = styled.div`
  height: auto;
  overflow: hidden;
  padding: 20px;
  background: ${color.interior};
  box-shadow: 0 3px 5px rgba(0,0,0,0.05);

  &:before, &:after {
    content: ""; height: 3px;
    position: absolute;
    left: 0;
    right: 0;
    -webkit-clip-path: ${clipPath};
  }
  &:before {
    background-color: ${color.exterior}; //bg color
    top: 0;
  }
  &:after {
    background-color: ${color.interior}; //main color
    bottom: -2px;
  }
`;

export default ({ children }) => (
  <MainContainer>
    <ChildContainer>
      {children}
    </ChildContainer>
  </MainContainer>
);
