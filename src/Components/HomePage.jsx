import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import ProductList from './ProductList';
import UpdateAbout from "./UpdateAbout.jsx";
import PaidOrders from "./PaidOrders.jsx";

function HomePage() {
    return (
        <Router>
            <Navbar />
            <div className="container-fluid content-with-sidebar">
                <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/orders" element={<PaidOrders />} />
                    <Route path="/about" element={<UpdateAbout />} />
                </Routes>
            </div>
        </Router>
    );
}

export default HomePage;
