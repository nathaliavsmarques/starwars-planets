import { useState } from 'react';
import axios from 'axios';
import './App.css'
import { Planet } from './types/Planet';


function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [planets, setPlanets] = useState<Planet[]>([]);

  function handleSearch() {
     if(searchTerm === ('')) {
      alert('Favor digitar o nome do planeta')
    }

    axios.get("https://swapi.dev/api/planets/")
      .then((response) => {
        setPlanets(response.data.results);
        
      })
      .catch((error) => {    
        console.error(error);
        alert('Erro. Planeta não encontrado.');    
        
      });
  }

  const filterPlanets = planets.filter((planet) => planet.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()))


  return (
    <div className="container">
      <div className="titleContainer">
        <h1 className="title">StarWars Planets</h1>
        <p className="text">
         Aqui é o lugar para você que gosta de StarWars e tem curiosidade de saber um pouco mais sobre os planetas que fazem parte desse universo.        
        </p>        
      </div>
      <div className='planetsAvailabe'>
        <h2>Planetas Disponíveis para consulta</h2>
        <p>Tatooine, Alderaan, Yavin IV, Hoth, Dagobah, Bespin, Endor, Naboo, Coruscant, Kamino.</p>       

      </div>

      <div className="containerInput">
        <input
          className="input"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btnSearch" onClick={handleSearch}>
          Pesquisar
        </button>
      </div>

      <div className="mainContainer">
        {filterPlanets.map((Planet) => (
          <div key={Planet.name}>
            <h3>Informações do Planeta</h3>
            <p>Nome:  {Planet.name}</p>
            <p>Clima:  {Planet.climate}</p>
            <p>Tipo de solo:  {Planet.terrain}</p>
            <p>População:  {Planet.population}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
