import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faNoteSticky, faSearch, faSignIn, faSignOut } from '@fortawesome/free-solid-svg-icons'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import useAuth from '../hooks/useAuth';

export interface NavbarProps {
}

export interface NavbarState {
}

export default function SiteNavbar(props: NavbarProps) {
  const userAuth = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(()=>{
    setIsLoggedIn(userAuth.isAuthenticated);
  },[userAuth])
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
      <LinkContainer to="/"><Navbar.Brand href="#home">Мыслеграм</Navbar.Brand></LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          {userAuth.isAuthenticated?
          <LinkContainer to="blog/add"><Nav.Link><FontAwesomeIcon icon={ faNoteSticky }/> Добавить пост</Nav.Link></LinkContainer>
          :
          <LinkContainer to="login"><Nav.Link><FontAwesomeIcon icon={ faNoteSticky }/> Добавить пост</Nav.Link></LinkContainer>
}         {userAuth.isAuthenticated?
          <LinkContainer to="profile"><Nav.Link><FontAwesomeIcon icon={ faGear }/> Профиль</Nav.Link></LinkContainer>
          :
          <LinkContainer to="login"><Nav.Link><FontAwesomeIcon icon={ faGear }/> Профиль</Nav.Link></LinkContainer>
}
          </Nav>
          {isLoggedIn?(
          <Nav>
          <LinkContainer to="/" onClick={()=>{localStorage.removeItem("token");userAuth.setIsAuthenticated(false)}}><Nav.Link>Выйти({userAuth.username}) <FontAwesomeIcon icon={ faSignOut }/></Nav.Link></LinkContainer>
          </Nav>
          ):(
          <Nav>
          <LinkContainer to="login"><Nav.Link>Вход <FontAwesomeIcon icon={ faSignIn }/></Nav.Link></LinkContainer>
          <LinkContainer to="register"><Nav.Link>Регистрация <FontAwesomeIcon icon={ faSignOut }/></Nav.Link></LinkContainer>
          </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
    );
}
