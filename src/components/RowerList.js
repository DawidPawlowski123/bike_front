import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';

function RowerList() {
    const [rowery, setrowery] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://bike.local/api/rower')
            .then(response => response.json())
            .then(data => setrowery(data))
            .catch(error => console.error('Błąd pobierania danych:', error));
    }, []);

    const handleEditClick = (rowerId) => {
        navigate(`/edytuj-rower/${rowerId}`);
    };

    const handleDelete = (rowerId) => {
        if (window.confirm('Czy na pewno chcesz usunąć ten rower?')) {
            fetch(`https://bike.local/api/rower/${rowerId}`, {
                method: 'DELETE',
                // Jeśli wymagane, dodaj odpowiednie nagłówki, np. dla autoryzacji
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Coś poszło nie tak przy usuwaniu rowera');
                    }
                    return response.json();
                })
                .then(() => {
                    // Usuń rower z lokalnego stanu, aby odświeżyć listę na stronie
                    setrowery(currentrowery => currentrowery.filter(rower => rower.id !== rowerId));
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
                    <th>Marka</th>
                    <th>Model</th>
                    <th>Cena</th>
                    <th>Nr seryjny</th>
                    <th>Status</th>
                    <th>Akcje</th>
                </tr>
            </thead>
            <tbody>
                {rowery.map(rower => (
                    <tr key={rower.id}>
                        <td>{rower.marka}</td>
                        <td>{rower.model}</td>
                        <td>{rower.cena}</td>
                        <td>{rower.nr_seryjny}</td>
                        <td>{rower.status}</td>
                        <td>
                            <Button variant="outline-primary"  onClick={() => handleEditClick(rower.id)}>
                                Edytuj
                            </Button>{' '}
                            <Button variant="outline-danger" onClick={() => handleDelete(rower.id)}>
                                Usuń
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default RowerList;
