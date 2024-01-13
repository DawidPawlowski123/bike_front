import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';

function EditRower() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [rowerData, setRowerData] = useState({
        marka: '',
        model: '',
        cena: '',
        nr_seryjny: '',
        status: '',
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Pobierz dane rowera do edycji
        fetch(`https://bike.local/api/rower/${id}`)
            .then(response => response.json())
            .then(data => setRowerData(data))
            .catch(error => console.error('Error:', error));
    }, [id]);

    const handleChange = (e) => {
        setRowerData({ ...rowerData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        console.log(JSON.stringify(rowerData));
        e.preventDefault();
        // Wykonaj aktualizację danych rowera
        fetch(`https://bike.local/api/rower/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(rowerData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setMessage('Dane rowera zostały zaktualizowane pomyślnie!');
                navigate("/lista-rowerow");
            })
            .catch(error => {
                setMessage('Wystąpił błąd. Spróbuj ponownie później.');
                console.error('Error:', error);
            });
    };

    return (
        <div className="container mt-5">
            {message && <Alert variant="info">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="marka" className="mb-3">
                    <Form.Label>Marka</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="marka"
                        value={rowerData.marka} 
                        onChange={handleChange} 
                        placeholder="Wprowadź markę" 
                    />
                </Form.Group>

                <Form.Group controlId="model" className="mb-3">
                    <Form.Label>Model</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="model"
                        value={rowerData.model} 
                        onChange={handleChange} 
                        placeholder="Wprowadź model" 
                    />
                </Form.Group>

                <Form.Group controlId="cena" className="mb-3">
                    <Form.Label>Cena</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="cena"
                        value={rowerData.cena} 
                        onChange={handleChange} 
                        placeholder="Wprowadź cena" 
                    />
                </Form.Group>

                <Form.Group controlId="nr_seryjny" className="mb-3">
                    <Form.Label>Numer seryjny</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="nr_seryjny"
                        value={rowerData.nr_seryjny} 
                        onChange={handleChange} 
                        placeholder="Wprowadź numer seryjny" 
                    />
                </Form.Group>

                <Form.Group controlId="status" className="mb-3">
                    <Form.Label>Status</Form.Label>
                    <Form.Control 
                        as="select" 
                        value={rowerData.status} 
                        onChange={handleChange}
                    >
                        <option value="gotowy">Gotowy</option>
                        <option value="wypozyczony">Wypożyczony</option>
                        <option value="uszkodzony">Uszkodzony</option>
                    </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Zaktualizuj
                </Button>
            </Form>
        </div>
    );
}

export default EditRower;
