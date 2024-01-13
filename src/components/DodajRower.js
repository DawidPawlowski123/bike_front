import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

function DodajRower() {
    const [marka, setMarka] = useState('');
    const [model, setModel] = useState('');
    const [cena, setCena] = useState('');
    const [nrSeryjny, setNrSeryjny] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('gotowy');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Walidacja
        if (!marka || !model) {
            setMessage("Pola marka i model nie mogą być puste!");
            return;
        }

        fetch('https://bike.local/api/rower', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                marka: marka,
                model: model,
                cena: cena,
                nr_seryjny: nrSeryjny,
                status: status
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                setMessage(data.error);
            } else {
                setMessage('Rower został dodany pomyślnie!');
                setMarka('');
                setModel('');
                setCena('');
                setNrSeryjny('');
            }
        })
        .catch((error) => {
            setMessage('Wystąpił błąd. Spróbuj ponownie później.');
        });
    };

    return (
        <div className="container mt-5">
            {message && <Alert variant="info">{message}</Alert>}

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="marka" className="mb-3">
                    <Form.Label>Marka</Form.Label>
                    <Form.Control type="text" value={marka} onChange={e => setMarka(e.target.value)} placeholder="Wprowadź markę roweru" />
                </Form.Group>

                <Form.Group controlId="model" className="mb-3">
                    <Form.Label>Model</Form.Label>
                    <Form.Control type="text" value={model} onChange={e => setModel(e.target.value)} placeholder="Wprowadź model roweru" />
                </Form.Group>

                <Form.Group controlId="cena" className="mb-3">
                    <Form.Label>Cena</Form.Label>
                    <Form.Control type="text" value={cena} onChange={e => setCena(e.target.value)} placeholder="Wprowadź cenę roweru" />
                </Form.Group>

                <Form.Group controlId="nrSeryjny" className="mb-4">
                    <Form.Label>Numer Seryjny</Form.Label>
                    <Form.Control type="text" value={nrSeryjny} onChange={e => setNrSeryjny(e.target.value)} placeholder="Wprowadź numer seryjny roweru" />
                </Form.Group>

                <Form.Group controlId="status" className="mb-3">
                    <Form.Label>Status</Form.Label>
                    <Form.Control 
                        as="select" 
                        value={status} 
                        onChange={e => setStatus(e.target.value)}
                    >
                        <option value="gotowy">Gotowy</option>
                        <option value="wypozyczony">Wypożyczony</option>
                        <option value="uszkodzony">Uszkodzony</option>
                    </Form.Control>
                </Form.Group>
                
                <Button variant="primary" type="submit">
                    Dodaj
                </Button>
            </Form>
        </div>
    );
}

export default DodajRower;
