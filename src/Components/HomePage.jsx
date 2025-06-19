import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import ProductList from './ProductList';
import UpdateAbout from "./UpdateAbout.jsx";
import UpdateContact from "./UpdateContact.jsx";
import PaidOrders from "./PaidOrders.jsx";
import AdminRegisterForm from "./AdminRegisterForm.jsx";

function HomePage() {
    return (
        <Router>
            <Navbar />
            <div className="container-fluid content-with-sidebar">
                <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/orders" element={<PaidOrders />} />
                    <Route path="/about" element={<UpdateAbout />} />
                    <Route path="/contact" element={<UpdateContact />} />
                    <Route path="/create" element={<AdminRegisterForm />} />/
                </Routes>
            </div>
        </Router>
    );
}

export default HomePage;
