import { useEffect, useState } from 'react';
import OrderAddress from './OrderAddress';
import OrderDetails from './OrderDetails';
import { Modal, Button } from 'react-bootstrap';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';

export default function PaidOrders() {
    const [orders, setOrders] = useState([]);
    const [expandedOrders, setExpandedOrders] = useState({});
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const token = localStorage.getItem('token');

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/order/admin/orders/?status=paid&ordering=created_at`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
            .then(res => res.json())
            .then(setOrders)
            .catch(err => console.error('Error fetching orders:', err));
    }, [token]);

    const toggleExpanded = (orderId) => {
        setExpandedOrders(prev => ({
            ...prev,
            [orderId]: !prev[orderId]
        }));
    };

    const handleShowAddress = (address) => {
        setSelectedAddress(address);
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit'
        });
    };

    return (
        <div className="container mt-4">
            <h3>Paid Orders</h3>
            {orders.map(order => (
                <div className="card mb-3" key={order.id}>
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <div>
                            <button className="btn btn-sm btn-link" onClick={() => toggleExpanded(order.id)}>
                                <FaChevronDown className={expandedOrders[order.id] ? 'rotate-180' : ''} />
                            </button>
                            <strong className="ms-2">{formatDate(order.created_at)}</strong>
                        </div>
                        {order.shipping_address && (
                            <Button variant="outline-primary" size="sm" onClick={() => handleShowAddress(order.shipping_address)}>
                                Address
                            </Button>
                        )}
                    </div>
                    {expandedOrders[order.id] && (
                        <OrderDetails order={order} />
                    )}
                </div>
            ))}

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Shipping Address</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedAddress && <OrderAddress address={selectedAddress} />}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
