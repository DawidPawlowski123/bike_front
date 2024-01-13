// App.js
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import KlientList from './components/KlientList';
import DodajKlient from './components/DodajKlient';
import DodajRower from './components/DodajRower';
import NavbarComponent from './components/NavbarComponent';
import Login from './components/Login';
import DodajWypo from './components/DodajWypo'
import Home from "./components/Home";
import EditKlient from "./components/EdytujKlienta";
import RowerList from "./components/RowerList";
import EditRower from "./components/EdytujRower";
import ListaWypozyczen from "./components/WypoList";
import { AuthProvider } from './components/AuthContext';



function App() {
  return (
    <AuthProvider>
    <Router>
        <div>
          <NavbarComponent  />
          <Routes>
            <Route path="/dodaj-klient" element={<DodajKlient />} />
            <Route path="/edytuj-klient/:id" element={<EditKlient />} />
            <Route path="/lista-klientow" element={<KlientList />} />
            <Route path="/edytuj-rower/:id" element={<EditRower />} />
            <Route path="/lista-rowerow" element={<RowerList />} />
            <Route path="/dodaj-rower" element={<DodajRower />} />
            <Route path="/dodaj-wypo" element={<DodajWypo />} />
            <Route path="/lista-wypo" element={<ListaWypozyczen />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
    </Router>
    </AuthProvider>
  );
}

export default App;
