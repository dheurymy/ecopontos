import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'; // Importa componentes para criação de rotas

import GetEcoponto from './components/GetEcoponto';
import ListEcopontos from './components/ListEcopontos';
import Header from './components/Header';

const App = () => { 
  return (
    
      <Router> {/* Componente de roteamento principal */}
        <div className="App">
          <Header /> {/* Renderiza o componente Header */}
          
          
          <Routes> {/* Define as rotas */}
            <Route path="/" element={<GetEcoponto />} /> {/* Rota para o componente GetEcoponto */}
            <Route path="/list" element={<ListEcopontos />} /> {/* Rota para o componente ListEcopontos */}
            
          </Routes>
        </div>
      </Router>
   
  );
}

export default App; // Exporta o componente App como padrão