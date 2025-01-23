import React, { useState } from 'react'

export default function MailForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = { firstName, lastName, email, message }

        try {
            const response = await fetch('http://localhost:3000/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            setStatus(result.message);
        } catch (error) {
            setStatus('Errore durante l\'invio.');
            console.error(error);
        }
    };


    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nome"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <input type="text"
                    placeholder="Cognome"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                <input type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Messaggio"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />
                <button type="submit">Invia</button>
                <p>{status}</p>
            </form>
        </>
    )
}