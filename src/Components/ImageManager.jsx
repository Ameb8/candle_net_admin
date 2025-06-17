import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ImageManager({ getURL, addURL, moveURL, deleteURL }) {
    const [images, setImages] = useState([]);
    const [orderedIds, setOrderedIds] = useState([]);
    const token = localStorage.getItem('token');

    // Fetch images on mount
    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        console.log("Fetching from:", getURL)
        const res = await fetch(getURL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data = await res.json();
        const sorted = [...data].sort((a, b) => a.position - b.position);
        setImages(sorted);
        setOrderedIds(sorted.map(item => item.id));
    };

    const moveImage = (fromIndex, toIndex) => {
        const updated = [...orderedIds];
        const [moved] = updated.splice(fromIndex, 1);
        updated.splice(toIndex, 0, moved);
        setOrderedIds(updated);
    };

    const applyOrder = async () => {
        const res = await fetch(moveURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ ordered_ids: orderedIds })
        });
        if (res.ok) {
            await fetchImages();
        }
    };

    const deleteImage = async (id) => {
        const res = await fetch(`${deleteURL}${id}/`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (res.ok) {
            await fetchImages();
        }
    };

    const addImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        const res = await fetch(addURL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        });

        if (res.ok) {
            await fetchImages();
        }
    };

    return (
        <div className="container my-4">
            <div className="d-flex flex-wrap gap-3">
                {orderedIds.map((id, index) => {
                    const imageObj = images.find(img => img.id === id);
                    if (!imageObj) return null;
                    return (
                        <div key={id} className="card" style={{ width: '120px' }}>
                            <img
                                src={imageObj.image.image}
                                alt={`img-${id}`}
                                className="card-img-top img-thumbnail"
                            />
                            <div className="card-body p-2 text-center">
                                <div className="btn-group btn-group-sm mb-1" role="group">
                                    <button
                                        className="btn btn-outline-secondary"
                                        disabled={index === 0}
                                        onClick={() => moveImage(index, index - 1)}
                                    >↑</button>
                                    <button
                                        className="btn btn-outline-secondary"
                                        disabled={index === orderedIds.length - 1}
                                        onClick={() => moveImage(index, index + 1)}
                                    >↓</button>
                                </div>
                                <button
                                    className="btn btn-sm btn-danger w-100"
                                    onClick={() => deleteImage(id)}
                                >Delete</button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-4 d-flex gap-3 align-items-center">
                <input type="file" onChange={addImage} className="form-control w-auto" />
                <button className="btn btn-primary" onClick={applyOrder}>
                    Apply Order
                </button>
            </div>
        </div>
    );
}
