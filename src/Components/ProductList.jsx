import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import ModifyProduct from './ModifyProduct';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingProduct, setEditingProduct] = useState(null)
    const baseURL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetch(`${baseURL}/inventory/products/`)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch products:', err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="text-center mt-5">Loading products...</div>;
    }

    if (!products.length) {
        return <div className="text-center mt-5">No products found.</div>;
    }

    return (
        <div className="container mt-4">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                {products.map(product => (
                    <div key={product.id} className="col">
                        <ProductCard
                            product={product}
                            onEditClick={setEditingProduct}
                        />
                    </div>
                ))}
            </div>

            {/* Conditionally show ModifyProduct modal */}
            {editingProduct && (
                <ModifyProduct
                    product={editingProduct}
                    onClose={() => setEditingProduct(null)}
                    onSave={(updatedProduct) => {
                        // Update products state with new data
                        setProducts((prev) =>
                            prev.map(p =>
                                p.id === updatedProduct.id ? updatedProduct : p
                            )
                        );
                        setEditingProduct(null);
                    }}
                />
            )}
        </div>
    );
}

export default ProductList;
