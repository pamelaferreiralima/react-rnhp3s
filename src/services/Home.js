import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 14rem;
`;
function Home() {
  return (
    <Box>
      <h2>Não tenha medo do fracasso.</h2>
      <h2>Esta é a melhor maneira de ter sucesso.</h2>
      <h3> Lebron James </h3>
    </Box>
  );
}

export default Home;
