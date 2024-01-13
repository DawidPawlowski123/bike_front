import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

function NavigationBar() {
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate(); // Zamiast useHistory()
    useEffect(() => {
        const checkLoginStatus = async () => {
            const response = await fetch("https://bike.local/api/isLoggedIn");
            const data = await response.json();
            setIsLoggedIn(data.logged_in);
        };
        checkLoginStatus();
    }, []);

    const handleLogout = async () => {
        const response = await fetch('https://bike.local/api/logout', {
            method: 'POST'
        });
        if (response.ok) {
            setIsLoggedIn(false);
            navigate("/"); // Przekierowanie po udanym zalogowaniu
        }
    };


    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
            <LinkContainer style={{ paddingLeft: '20px' }} to="/">
                <Navbar.Brand >Wypożyczalnia Rowerów</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {isLoggedIn ? (
                        <>
                    <NavDropdown title="Klient" id="basic-nav-dropdown">
                        <LinkContainer to="/dodaj-klient">
                            <NavDropdown.Item>Dodaj Klienta</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/lista-klientow">
                            <NavDropdown.Item>Lista Klientów</NavDropdown.Item>
                        </LinkContainer>
                    </NavDropdown>
                    <NavDropdown title="Rower" id="basic-nav-dropdown">
                        <LinkContainer to="/dodaj-rower">
                            <NavDropdown.Item>Dodaj Rower</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/lista-rowerow">
                            <NavDropdown.Item>Lista Rowerów</NavDropdown.Item>
                        </LinkContainer>
                    </NavDropdown>
                    <NavDropdown title="Wypożyczenie" id="basic-nav-dropdown">
                    <LinkContainer to="/dodaj-wypo">
                                <Nav.Link className='mr-3'>Dodaj Wypożyczenie</Nav.Link>
                            </LinkContainer>
                        <LinkContainer to="/lista-wypo">
                            <NavDropdown.Item>Lista Wypożyczeń</NavDropdown.Item>
                        </LinkContainer>
                    </NavDropdown>

                        </>
                    ) : null}
                </Nav>
                <Nav>
                    {isLoggedIn ? (
                        <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                    ) : (
                        <LinkContainer to="/login">
                            <Nav.Link>Login</Nav.Link>
                        </LinkContainer>
                    )}
                </Nav>

            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavigationBar;