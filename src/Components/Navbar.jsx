import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import newIcon from '../assets/new.png';
import deleteIcon from '../assets/delete.png';
import CreateProductForm from './CreateProduct.jsx';

function Navbar() {
    const [showForm, setShowForm] = useState(false);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
                <a className="navbar-brand" href="/">candle_co Admin</a>

                <div className="ms-auto d-flex align-items-center gap-3">
                    <button
                        className="btn btn-outline-light d-flex align-items-center gap-2"
                        onClick={() => setShowForm(prev => !prev)}
                    >
                        <img src={newIcon} alt="Create" width="20" height="20" />
                        Create Product
                    </button>

                    <button className="btn btn-outline-danger d-flex align-items-center gap-2">
                        <img src={deleteIcon} alt="Delete" width="20" height="20" />
                        Remove Products
                    </button>

                    <button className="btn btn-outline-light">
                        Order History
                    </button>

                    <button className="btn btn-warning text-dark fw-semibold">
                        Pending
                    </button>
                </div>
            </nav>

            {showForm && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 9999,
                    }}
                >
                    <div
                        style={{
                            background: 'white',
                            padding: '20px',
                            borderRadius: '10px',
                            position: 'relative',
                            maxWidth: '500px',
                            width: '100%',
                        }}
                    >
                        <button
                            onClick={() => setShowForm(false)}
                            style={{
                                position: 'absolute',
                                top: 10,
                                right: 10,
                                border: 'none',
                                background: 'transparent',
                                fontSize: '1.5rem',
                                cursor: 'pointer',
                            }}
                        >
                            &times;
                        </button>
                        <CreateProductForm />
                    </div>
                </div>
            )}
        </>
    );
}

export default Navbar;
