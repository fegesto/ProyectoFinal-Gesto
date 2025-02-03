import logoMarca from './assets/logoMarca.png'
import CartWidget from '../CartWidget/CartWidget'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './NavBar.css'
import { NavLink, Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className='NavBarContainer'>
            <Navbar bg="light" data-bs-theme="light">
                <Container>
                    <Navbar.Brand><Link to='/'><img src={logoMarca} className="d-inline-block align-top" alt='logo de Artesanias PatryAppe' width = "70"/></Link></Navbar.Brand>
                    <Nav className="me-auto">
                    <Button variant="primary" className='btnBoostrap'><NavLink to ={`/category/Almohadones`} className= {({ isActive }) => isActive ? 'ActiveOption' :'disabled'}>Almohadon matero</NavLink></Button>
                    <Button variant="primary" className='btnBoostrap'><NavLink to ={`/category/Amigurimis`} className= {({ isActive }) => isActive ? 'ActiveOption' :'disabled'}>Amigurumis</NavLink></Button>
                    <Button variant="primary" className='btnBoostrap'><NavLink to ={`/category/Sahumerios`} className= {({ isActive }) => isActive ? 'ActiveOption' :'disabled'}>Sahumerios</NavLink></Button>
                    </Nav>
                    <CartWidget /><Link to={`/cart`} className=  {({ isActive }) => isActive ? 'ActiveOption' :'Option'}></Link>
                </Container>
            </Navbar>
        </nav>
    )
}

export default NavBar