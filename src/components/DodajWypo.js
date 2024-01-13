import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

function DodajWypozyczenie() {
    const [klienci, setKlienci] = useState([]);
    const [rowery, setRowery] = useState([]);
    const [wybraneRowery, setWybraneRowery] = useState([]);
    const [klientId, setKlientId] = useState('');
    const [dataWypozyczenia, setDataWypozyczenia] = useState('');
    const [dataZwrotu, setDataZwrotu] = useState('');
    const [message, setMessage] = useState('');
    
    useEffect(() => {
        // Pobierz listę klientów
        fetch('https://bike.local/api/klient')
            .then(response => response.json())
            .then(data => setKlienci(data))
            .catch(error => console.error('Error:', error));

        // Pobierz listę rowerów
        fetch('https://bike.local/api/rower')
            .then(response => response.json())
            .then(data => setRowery(data))
            .catch(error => console.error('Error:', error));
    }, []);

    const handleRowerChange = (rowerId) => {
        if (wybraneRowery.includes(rowerId)) {
            setWybraneRowery(wybraneRowery.filter(id => id !== rowerId));
        } else {
            setWybraneRowery([...wybraneRowery, rowerId]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Walidacja
        if (!klientId || wybraneRowery.length === 0 || !dataWypozyczenia || !dataZwrotu) {
            setMessage("Proszę uzupełnić wszystkie wymagane pola!");
            return;
        }
    
        const wypozyczenie = {
            klient_id: klientId,
            rowery: wybraneRowery, // Tablica ID rowerów
            data_wypozyczenia: dataWypozyczenia,
            data_zwrotu: dataZwrotu,
        };

        console.log(JSON.stringify(wypozyczenie));
    
        fetch('https://bike.local/api/wypozyczenie', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(wypozyczenie)
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    setMessage(data.error);
                } else {
                    setMessage('Wypożyczenie zostało utworzone pomyślnie!');
                    setKlientId('');
                    setWybraneRowery([]);
                    setDataWypozyczenia('');
                    setDataZwrotu('');
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
                <Form.Group controlId="klientId" className="mb-3">
                    <Form.Label>Klient</Form.Label>
                    <Form.Control as="select" value={klientId} onChange={e => setKlientId(e.target.value)}>
                        <option value="">Wybierz klienta</option>
                        {klienci.map(klient => (
                            <option key={klient.id} value={klient.id}>
                                {klient.imie} {klient.nazwisko}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="rowerId">
                    <Form.Label>Rower</Form.Label>
                    {rowery.map(rower => (
                        <Form.Check 
                            key={rower.id}
                            type="checkbox"
                            label={`${rower.marka} ${rower.model}`}
                            value={rower.id}
                            checked={wybraneRowery.includes(rower.id)}
                            onChange={() => handleRowerChange(rower.id)}
                        />
                    ))}
                </Form.Group>

                <Form.Group controlId="dataWypozyczenia" className="mb-3">
                    <Form.Label>Data Wypożyczenia</Form.Label>
                    <Form.Control type="datetime-local" value={dataWypozyczenia} onChange={e => setDataWypozyczenia(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="dataZwrotu" className="mb-3">
                    <Form.Label>Data Zwrotu</Form.Label>
                    <Form.Control type="datetime-local" value={dataZwrotu} onChange={e => setDataZwrotu(e.target.value)} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Utwórz Wypożyczenie
                </Button>
            </Form>
        </div>
    );
}

export default DodajWypozyczenie;
