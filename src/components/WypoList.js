import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ListaWypozyczen() {
    const [wypozyczenia, setWypozyczenia] = useState([]);

    useEffect(() => {
        fetch('https://bike.local/api/wypozyczenie')
            .then(response => response.json())
            .then(data => setWypozyczenia(data))
            .catch(error => console.error('Błąd pobierania danych:', error));
    }, []);

    // Reszta logiki komponentu...

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Klient</th>
                    <th>Rower(y)</th>
                    <th>Data Wypożyczenia</th>
                    <th>Data Zwrotu</th>
                    <th>Cena Wypożyczenia</th>
                    <th>Akcje</th>
                </tr>
            </thead>
            <tbody>
                {wypozyczenia.map(wypozyczenie => (
                    <tr key={wypozyczenie.id}>
                        <td>{wypozyczenie.id}</td>
                        <td>
                            <Link to={`/edytuj-klient/${wypozyczenie.klient_id}`}>
                                {wypozyczenie.klient_id}
                            </Link>
                        </td>
                        <td>
                            {wypozyczenie.rowery.map(rowerId => (
                                <span key={rowerId}>
                                    <Link to={`/edytuj-rower/${rowerId}`}>
                                        {rowerId}
                                    </Link>
                                    {wypozyczenie.rowery.length > 1 && ', '}
                                </span>
                            ))}
                        </td>
                        <td>{wypozyczenie.data_wypozyczenia}</td>
                        <td>{wypozyczenie.data_zwrotu}</td>
                        <td>{wypozyczenie.cena_wypo}</td>
                        <td>
                            {/* Przyciski akcji, np. edycja, usuwanie */}
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default ListaWypozyczen;
