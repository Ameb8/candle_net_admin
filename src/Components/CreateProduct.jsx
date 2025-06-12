import { useState } from 'react';

function CreateProductForm() {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        description: '',
        price: '',
        image: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData(prev => ({ ...prev, image: file }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const baseURL = import.meta.env.VITE_API_URL;
        const url = `${baseURL}/inventory/products/`;

        const csrfToken = document.cookie
            .split('; ')
            .find(row => row.startsWith('csrftoken='))
            ?.split('=')[1];

        const payload = new FormData();
        payload.append('name', formData.name);
        payload.append('category', formData.category);
        payload.append('description', formData.description);
        payload.append('price', formData.price);
        payload.append('image', formData.image);

        try {
            const response = await fetch(url, {
                credentials: "include",
                method: 'POST',
                headers: {
                    'X-CSRFToken': csrfToken
                },
                body: payload,
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error creating product:', errorData);
                alert('Failed to create product.');
                return;
            }

            const result = await response.json();
            console.log('Product created:', result);
            alert('Product created successfully!');

            // Optional: reset form
            setFormData({
                name: '',
                category: '',
                description: '',
                price: '',
                image: null,
            });

        } catch (err) {
            console.error('Network error:', err);
            alert('Network error. Could not create product.');
        }
    };


    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
            <h2>Create Product</h2>

            <label>
                Product Name:
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </label>

            <br />

            <label>
                Category:
                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                />
            </label>

            <br />

            <label>
                Description:
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
            </label>

            <br />

            <label>
                Price:
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    step="0.01"
                    min="0"
                />
            </label>

            <br />

            <label>
                Product Image:
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                />
            </label>

            <br /><br />

            <button type="submit">Create Product</button>
        </form>
    );
}

export default CreateProductForm;
