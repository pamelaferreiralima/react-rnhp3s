import React, { Component } from 'react';
import styled from 'styled-components';

import Movies from './services/Movies';
import Shows from './services/Shows';
import Home from './services/Home';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Encode+Sans+SC:wght@300;400;500&family=Montserrat:ital,wght@0,100;0,200;0,300;1,100&family=Zen+Loop:ital@0;1&display=swap');
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
}
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;
const List = styled.li`
  border: solid 1px #fff;
  width: 100px;
  height: 30px;
  text-align: center;
  padding-top: 0.25rem;
  border-radius: 10%;
`;
const Box = styled.div`
  display: flex;
  justify-content: space-evenly;
  height: 20vh;
  align-items: center;
  background-color: black;
  li {
    list-style: none;
  }
`;

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <Box>
              <List>
                <StyledLink to="/">Home</StyledLink>
              </List>
              <List>
                <StyledLink to="/movies">Movies</StyledLink>
              </List>
              <List>
                <StyledLink to="/shows">Shows</StyledLink>
              </List>
            </Box>
          </nav>

          <Switch>
            <Route path="/shows">
              <GlobalStyle />
              <Shows />
            </Route>
            <Route path="/movies">
              <GlobalStyle />
              <Movies />
            </Route>
            <Route path="/">
              <GlobalStyle />
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
