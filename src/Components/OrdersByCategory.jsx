import { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { Spinner, Alert } from 'react-bootstrap';
import { formatLabel } from "../utils/plotFormatting.js";

export default function OrdersByCategory() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        fetch(`${import.meta.env.VITE_API_URL}/metrics/categories/`, {
            headers: {
                'Authorization': `Token ${token}`,
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then(setData)
            .catch((err) => setError(err.message));
    }, []);

    if (error) return <Alert variant="danger">Error: {error}</Alert>;
    if (!data) return <Spinner animation="border" />;

    return (
        <Plot
            data={[
                {
                    x: data.categories,
                    y: data.quantities,
                    type: 'bar',
                    marker: { color: 'indianred' },
                    name: 'Products Ordered',
                },
            ]}
            layout={{
                title: 'Products Ordered by Category',
                xaxis: { title: 'Category', tickangle: -45 },
                yaxis: formatLabel('Items Sold'),
                margin: { b: 150 },
                autosize: true,
            }}
            style={{ width: '100%', height: '400px' }}
            useResizeHandler
        />
    );
}
