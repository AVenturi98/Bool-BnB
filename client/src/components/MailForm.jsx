import React, { useState } from 'react'

export default function MailForm({ owner }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = { firstName, lastName, email, message, owner }

        // Validazione
        if (!firstName || !lastName || !email || !message) {
            setError('Tutti i campi sono obbligatori.')
            return
        }

        if (firstName.trim() === '' || lastName.trim() === '' || email.trim() === '' || message.trim() === '') {
            setError('I campi non possono essere vuoti.')
            return
        }

        if (firstName.length > 100 || lastName.length > 100 || email.length > 100) {
            setError('I campi nome, cognome ed email non possono superare i 100 caratteri.')
            return
        }

        if (message.length > 255) {
            setError('Il messaggio non può superare i 255 caratteri.')
            return
        }

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
        setFirstName('')
        setLastName('')
        setEmail('')
        setMessage('')
        setTimeout(() => {
            setStatus('')
        }, 2000)
    };


    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                            Nome
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                placeholder="Nome"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                                maxLength={100}
                                className="block w-full rounded-md bg-slate-100 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
                            Cognome
                        </label>
                        <div className="mt-2">
                            <input type="text"
                                placeholder="Cognome"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                                maxLength={100}
                                className="block w-full rounded-md bg-slate-100 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-4">
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                            Email
                        </label>
                        <div className="mt-2">
                            <input type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                maxLength={100}
                                className="block w-full rounded-md bg-slate-100 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-4">
                        <label htmlFor="text" className="block text-sm/6 font-medium text-gray-900">
                            Messaggio
                        </label>
                        <div className="mt-2">
                            <textarea
                                placeholder="Messaggio"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                                maxLength={255}
                                className="block w-full rounded-md bg-slate-100 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                            />
                        </div>
                    </div>
                </div>
                <div className='flex justify-around flex-col'>
                    <button type="submit" className="mt-6 w-3xs rounded-md bg-green px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-green-300 cursor-pointer bg-green-400 hover:bg-green-500 transition hover:-translate-y-1 hover:scale-101 delay-100">Invia</button>
                    <p>{status}</p>
                    <span className='text-red-600 mt-3'>{error}</span>
                </div>
            </form>
        </>
    )
}