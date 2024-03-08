import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";

//TODO faire la feuille de contact (formulaire)
//TODO faire la page de A propos pour parler de l'entreprise
//TODO faire un compte (historique de commande)
//TODO faire une login register rester connecter !!!
//TODO Faire un panier 

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Home />} />
            <Route path="product" element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);




