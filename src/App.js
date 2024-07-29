import React, { useState } from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import Register from "./pages/Register.js";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import Order from "./pages/Order.js";
import Recover from "./pages/Recover.js";
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BannerProvider } from './components/BannerContext';
import Banner from './components/Banner';
import { BasketProvider } from './components/BasketContext';

//TODO faire la feuille de contact (formulaire)
//TODO faire la page de A propos pour parler de l'entreprise
//TODO faire un compte (historique de commande)

export default function App() {
	const [isLoged, setIsLoged] = useState(false);

	return (
		<BasketProvider>
		<BannerProvider>
		<div className="App">
			<Banner />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Header setIsLoged={setIsLoged} isLoged={isLoged} />}>
						<Route index element={<Home />} />
						<Route path="product" element={<Home />} />
						<Route path="contact" element={<Contact />} />
						<Route path="order" element={<Order />} />
						<Route path="*" element={<NoPage />} />
						<Route path="register" element={<Register login={setIsLoged}/>} />
						<Route path="ForgotPwd" element={<Recover />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
		</BannerProvider>
		</BasketProvider>
	);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);