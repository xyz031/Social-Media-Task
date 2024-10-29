import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

const Headers = () => {
    return (
        <>
            <Navbar className="bg-dark" style={{height:"60px"}}>
                <Container>

                        <NavLink to="/" className="text-light text-decoration-none">Record a Memory</NavLink>
                    <Navbar.Collapse className="justify-content-end">

                    <NavLink to="/getuser" className="text-light text-decoration-none">Memories</NavLink>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Headers