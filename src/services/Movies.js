// imports
import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Box = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const Img = styled.img`
  margin: 1rem;
  border-radius: 10%;
  justify-content: center;

  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;
const Title = styled.p`
  margin: 1rem;
  text-align: center;
  background-color: black;
  color: white;
  border-radius: 5%;
`;
const BoxInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const BoxTitle = styled.h2`
  text-align: center;
  margin: 1rem;
`;
const Input = styled.input`
  width: 350px;
  height: 30px;
`;

// url base da API que estamos consumindo
const MoviesApi = axios.create({
  baseURL:
    'https://api.themoviedb.org/3/movie/popular?api_key=c654685165c467c1f991d6635454599f'
});

class Movies extends Component {
  state = {
    movies: [],
    filterItem: []
  };

  // Invoca imediatamente após um componente ser montado
  componentDidMount() {
    this.getMovies();
  }

  // Função que trás os dados da API
  getMovies = async () => {
    const response = await MoviesApi.get();
    console.log('Filmes:', response.data.results);

    const completeMovies = response.data.results.map(item => {
      return {
        ...item,
        poster_path: `https://image.tmdb.org/t/p/w400${item.poster_path}`
      };
    });

    this.setState({
      movies: completeMovies,
      filterItem: completeMovies
    });
  };

  handleChange = event => {
    const { movies } = this.state;
    if (event.target.value === '') {
      this.setState({
        filterItem: movies
      });
      return;
    }

    const filterItemConvert = movies.filter(item => {
      if (item.title.toLowerCase().includes(event.target.value.toLowerCase())) {
        return true;
      }
      return false;
    });
    this.setState({
      filterItem: filterItemConvert
    });
  };

  render() {
    return (
      <section>
        <BoxInput>
          <BoxTitle>Movies to watch</BoxTitle>
          <Input
            placeholder="Pesquise aqui uma série para assistir"
            type="text"
            onChange={this.handleChange}
          />
        </BoxInput>

        <Box>
          {this.state.filterItem.map((item, id) => (
            <div key={id}>
              <Title>{item.title}</Title>
              {/* <p>{item.vote_average}</p> */}
              <Img src={item.poster_path} alt="" />
            </div>
          ))}
        </Box>
      </section>
    );
  }
}

export default Movies;
