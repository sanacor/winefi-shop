import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';

import MaterialTableDemo from './demo'
import 'bootstrap/dist/css/bootstrap.min.css';

import About from './pages/About';
import Home from './pages/Home';


function App() {
  return (
    // <div style={{ padding: '30px' }}>
    //   <h1>Wine-Fi</h1>
    //   <MaterialTableDemo />
    // </div>
    <div>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
    </div>
  );
}
export default App;
