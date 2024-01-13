import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';

function EditKlient() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [klientData, setKlientData] = useState({
        imie: '',
        nazwisko: '',
        numer_tel: '',
        email: '',
        nr_dokumentu: '',
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Pobierz dane klienta do edycji
        fetch(`https://bike.local/api/klient/${id}`)
            .then(response => response.json())
            .then(data => setKlientData(data))
            .catch(error => console.error('Error:', error));
    }, [id]);

    const handleChange = (e) => {
        setKlientData({ ...klientData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        console.log(JSON.stringify(klientData));
        e.preventDefault();
        // Wykonaj aktualizację danych klienta
        fetch(`https://bike.local/api/klient/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(klientData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setMessage('Dane klienta zostały zaktualizowane pomyślnie!');
                navigate("/lista-klientow");
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
                <Form.Group controlId="imie" className="mb-3">
                    <Form.Label>Imię</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="imie"
                        value={klientData.imie} 
                        onChange={handleChange} 
                        placeholder="Wprowadź imię" 
                    />
                </Form.Group>

                <Form.Group controlId="nazwisko" className="mb-3">
                    <Form.Label>Nazwisko</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="nazwisko"
                        value={klientData.nazwisko} 
                        onChange={handleChange} 
                        placeholder="Wprowadź nazwisko" 
                    />
                </Form.Group>

                <Form.Group controlId="numerTel" className="mb-3">
                    <Form.Label>Numer telefonu</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="numer_tel"
                        value={klientData.numer_tel} 
                        onChange={handleChange} 
                        placeholder="Wprowadź numer telefonu" 
                    />
                </Form.Group>

                <Form.Group controlId="email" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        type="email" 
                        name="email"
                        value={klientData.email} 
                        onChange={handleChange} 
                        placeholder="Wprowadź email" 
                    />
                </Form.Group>

                <Form.Group controlId="nrDokumentu" className="mb-4">
                    <Form.Label>Numer dokumentu</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="nr_dokumentu"
                        value={klientData.nr_dokumentu} 
                        onChange={handleChange} 
                        placeholder="Wprowadź numer dokumentu" 
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Zaktualizuj
                </Button>
            </Form>
        </div>
    );
}

export default EditKlient;
