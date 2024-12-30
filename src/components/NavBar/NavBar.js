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
        <nav>
            <Navbar bg="light" data-bs-theme="light">
                <Container>
                    <Navbar.Brand><Link to='/'><img src={logoMarca} className="d-inline-block align-top" alt='logo de Artesanias PatryAppe' width = "70"/></Link></Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link><NavLink to ={`/category/Almohadones`} className= {({ isActive }) => isActive ? 'ActiveOption' :'Option'}><Button variant="primary" className='btnBoostrap'>Almohadon matero</Button></NavLink></Nav.Link>
                        <Nav.Link><NavLink to ={`/category/Amigurimis`} className= {({ isActive }) => isActive ? 'ActiveOption' :'Option'}><Button variant="primary" className='btnBoostrap'>Amigurumis</Button></NavLink></Nav.Link>
                        <Nav.Link><NavLink to ={`/category/Sahumerios`} className= {({ isActive }) => isActive ? 'ActiveOption' :'Option'}><Button variant="primary" className='btnBoostrap'>Sahumerios</Button></NavLink></Nav.Link>
                    </Nav>
                    <CartWidget />
                </Container>
            </Navbar>
        </nav>
    )
}

export default NavBar