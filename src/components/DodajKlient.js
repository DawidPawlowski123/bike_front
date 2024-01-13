import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

function DodajKlient() {
    const [imie, setImie] = useState('');
    const [nazwisko, setNazwisko] = useState('');
    const [numerTel, setNumerTel] = useState('');
    const [email, setEmail] = useState('');
    const [nrDokumentu, setNrDokumentu] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!imie || !nazwisko) {
            setMessage("Pola imię i nazwisko nie mogą być puste!");
            return;
        } else if (/\d/.test(imie) || /\d/.test(nazwisko)) {
            setMessage("Imię i nazwisko nie mogą zawierać cyfr!");
            return;
        }

        fetch('https://bike.local/api/klient', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                imie: imie,
                nazwisko: nazwisko,
                numer_tel: numerTel,
                email: email,
                nr_dokumentu: nrDokumentu
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                setMessage(data.error);
            } else {
                setMessage('Klient został dodany pomyślnie!');
                setImie('');
                setNazwisko('');
                setNumerTel('');
                setEmail('');
                setNrDokumentu('');
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
                <Form.Group controlId="imie" className="mb-3">
                    <Form.Label>Imię</Form.Label>
                    <Form.Control type="text" value={imie} onChange={e => setImie(e.target.value)} placeholder="Wprowadź imię" />
                </Form.Group>

                <Form.Group controlId="nazwisko" className="mb-3">
                    <Form.Label>Nazwisko</Form.Label>
                    <Form.Control type="text" value={nazwisko} onChange={e => setNazwisko(e.target.value)} placeholder="Wprowadź nazwisko" />
                </Form.Group>

                <Form.Group controlId="numerTel" className="mb-3">
                    <Form.Label>Numer telefonu</Form.Label>
                    <Form.Control type="text" value={numerTel} onChange={e => setNumerTel(e.target.value)} placeholder="Wprowadź numer telefonu" />
                </Form.Group>

                <Form.Group controlId="email" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Wprowadź email" />
                </Form.Group>

                <Form.Group controlId="nrDokumentu" className="mb-4">
                    <Form.Label>Numer dokumentu</Form.Label>
                    <Form.Control type="text" value={nrDokumentu} onChange={e => setNrDokumentu(e.target.value)} placeholder="Wprowadź numer dokumentu" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Dodaj
                </Button>
            </Form>
        </div>
    );
}

export default DodajKlient;
