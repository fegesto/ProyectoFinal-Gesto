import logoMarca from './assets/logoMarca.png'
import CartWidget from '../CartWidget/CartWidget'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';


const NavBar = () => {
    return (
        <nav>
            <img src={logoMarca} alt='logo de Artesanias PatryAppe' width = "200px"/>
            <div>
                <Button variant="primary">Almohadon matero</Button>
                <Button variant="primary">Amigurumis</Button>
                <Button variant="primary">Sahumerios</Button>
            </div>
            <CartWidget />
        </nav>
    )
}

export default NavBar