import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemsListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import { CartProvider } from './Context/CartContext';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <CartProvider>
        <NavBar/>
        <Routes>
          <Route path='/' element={<ItemListContainer />}/>
          <Route path='/category/:categoryId' element={<ItemListContainer />}/>
          <Route path='/item/:itemId' element={<ItemDetailContainer/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/checkout' element={<Checkout />}/>
          <Route path='*' element={<h1>404 Not Found</h1>}/>
        </Routes>
      </CartProvider>
    </BrowserRouter>
    </div>
  );
}

export default App;
