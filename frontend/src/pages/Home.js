import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div>
      <h2>Bem-vindo ao Sudoku</h2>
      <p>Faça login ou registre-se para começar a jogar!</p>
      <div className="home-buttons">
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/register">
          <button>Registrar</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
