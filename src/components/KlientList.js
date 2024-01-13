import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';

function KlientList() {
    const [klienci, setKlienci] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://bike.local/api/klient')
            .then(response => response.json())
            .then(data => setKlienci(data))
            .catch(error => console.error('Błąd pobierania danych:', error));
    }, []);

    const handleEditClick = (klientId) => {
        navigate(`/edytuj-klient/${klientId}`);
    };

    const handleDelete = (klientId) => {
        if (window.confirm('Czy na pewno chcesz usunąć tego klienta?')) {
            fetch(`https://bike.local/api/klient/${klientId}`, {
                method: 'DELETE',
                // Jeśli wymagane, dodaj odpowiednie nagłówki, np. dla autoryzacji
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Coś poszło nie tak przy usuwaniu klienta');
                    }
                    return response.json();
                })
                .then(() => {
                    // Usuń klienta z lokalnego stanu, aby odświeżyć listę na stronie
                    setKlienci(currentKlienci => currentKlienci.filter(klient => klient.id !== klientId));
                })
                .catch(error => {
                    console.error('Błąd:', error);
                });
        }
    };

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Imię</th>
                    <th>Nazwisko</th>
                    <th>Numer Telefonu</th>
                    <th>Email</th>
                    <th>Nr Dokumentu</th>
                    <th>Akcje</th>
                </tr>
            </thead>
            <tbody>
                {klienci.map(klient => (
                    <tr key={klient.id}>
                        <td>{klient.imie}</td>
                        <td>{klient.nazwisko}</td>
                        <td>{klient.numer_tel}</td>
                        <td>{klient.email}</td>
                        <td>{klient.nr_dokumentu}</td>
                        <td>
                            <Button variant="outline-primary"  onClick={() => handleEditClick(klient.id)}>
                                Edytuj
                            </Button>{' '}
                            <Button variant="outline-danger" onClick={() => handleDelete(klient.id)}>
                                Usuń
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default KlientList;
