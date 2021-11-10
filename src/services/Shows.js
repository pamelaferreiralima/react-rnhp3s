// imports
import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Box = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
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
  background-color: #000;
  color: white;
  border-radius: 5%;
  font-size: 20px;
  widht: 1vw;
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
const SeriesApi = axios.create({
  baseURL:
    'https://api.themoviedb.org/3/tv/popular?api_key=c654685165c467c1f991d6635454599f'
});

class Shows extends Component {
  state = {
    series: [],
    filterItem: []
  };

  // Invoca imediatamente após um componente ser montado
  componentDidMount() {
    this.getSeries();
  }

  // Função que trás os dados da API
  getSeries = async () => {
    const response = await SeriesApi.get();
    console.log('Series:', response.data.results);

    const completeSeries = response.data.results.map(item => {
      return {
        ...item,
        poster_path: `https://image.tmdb.org/t/p/w300${item.poster_path}`
      };
    });

    this.setState({
      series: completeSeries,
      filterItem: completeSeries
    });
  };

  handleChange = event => {
    const { series } = this.state;
    if (event.target.value === '') {
      this.setState({
        filterItem: series
      });
      return;
    }
    const filterItemConvert = series.filter(item => {
      if (item.name.toLowerCase().includes(event.target.value.toLowerCase())) {
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
          <BoxTitle>Shows to watch</BoxTitle>
          <Input
            onChange={this.handleChange}
            placeholder="Pesquise aqui uma série para assistir"
          />
        </BoxInput>

        <Box>
          {this.state.filterItem.map((item, id) => (
            <div key={id}>
              <Title>{item.name}</Title>
              {/* <p>{item.vote_average}</p> */}
              <Img src={item.poster_path} alt="" />
            </div>
          ))}
        </Box>
      </section>
    );
  }
}

export default Shows;
