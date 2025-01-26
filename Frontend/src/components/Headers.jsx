import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { PersonFill } from 'react-bootstrap-icons';

const Headers = () => {
    return (
        
        <Navbar 
            variant="dark" 
            expand="lg" 
            className="shadow-sm"
            collapseOnSelect
            style={{ 
                backgroundColor: '#1a73e8',
                backgroundImage: 'linear-gradient(to right, #1a73e8, #4285f4)',
                height: '70px',
                // Mobile-first media query
                '@media (max-width: 992px)': {
                    height: '60px'
                }
            }}
        >
            <Container fluid="xxl">
                <Navbar.Brand 
                    as={NavLink} 
                    to="/" 
                    className="d-flex align-items-center"
                    style={{
                        fontSize: '1.25rem',
                        '@media (max-width: 576px)': {
                            fontSize: '1.1rem',
                            letterSpacing: '0.2px'
                        }
                    }}
                >
                    <span className="fw-semibold">
                        <span className=" d-sm-inline">User Registration</span>
                        {/* <span className="d-inline d-sm-none">UR</span> */}
                    </span>
                </Navbar.Brand>

                <Navbar.Toggle 
                    aria-controls="basic-navbar-nav" 
                    className="border-0"
                    style={{
                        ':focus': {
                            boxShadow: 'none'
                        }
                    }}
                >
                    <span className="navbar-toggler-icon" />
                </Navbar.Toggle>

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto py-2 py-lg-0">
                        <NavLink 
                            to="/getuser" 
                            className={({ isActive }) => 
                                `nav-link d-flex align-items-center ${
                                    isActive ? 'text-white' : 'text-light'
                                }`
                            }
                            style={{
                                transition: 'all 0.3s ease',
                                fontSize: '0.95rem',
                                position: 'relative',
                                padding: '0.5rem 1rem',
                                '@media (max-width: 992px)': {
                                    padding: '0.75rem 1.25rem'
                                }
                            }}
                        >
                            <PersonFill className="me-2" size={18} />
                            <span className="fw-medium">Admin Dashboard</span>
                            <span 
                                className="position-absolute bottom-0 start-0 end-0"
                                style={{
                                    height: '2px',
                                    backgroundColor: 'rgba(255,255,255,0.8)',
                                    transform: 'scaleX(0)',
                                    transition: 'transform 0.3s ease',
                                }}
                            />
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>

            {/* Mobile menu background overlay */}
            <style>
                {`
                @media (max-width: 992px) {
                    .navbar-collapse {
                        position: absolute;
                        top: 100%;
                        left: 0;
                        right: 0;
                        background: #1a73e8;
                        z-index: 1000;
                        padding: 0 1rem;
                        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    }
                    .nav-link:hover .position-absolute,
                    .nav-link:focus .position-absolute {
                        transform: scaleX(1) !important;
                    }
                }
                `}
            </style>
        </Navbar>
    );
};

export default Headers;