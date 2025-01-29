import React, { useState, useContext } from 'react'
import axios from 'axios'
import GlobalContext from '@/contexts/GlobalContext'

export default function FormReview({ id, onSubmit = () => { }, callback = () => { } }) {

    const initReview = {
        property_id: id,
        name: '',
        vote: '',
        text: '',
        days: ''
    }

    const [review, setReview] = useState(initReview)
    const [error, setError] = useState(null)

    const { setIsLoading } = useContext(GlobalContext)

    function handleChange(e) {
        const { name, value } = e.target
        setReview({
            ...review,
            [name]: value
        })
    }

    function addRew(e) {
        e.preventDefault()

        // Validazione
        if (isNaN(review.vote) || isNaN(review.days)) {
            setError('Il voto e i giorni devono essere numeri')
            return
        }

        if (review.vote < 1 || review.vote > 5) {
            setError('Il voto deve essere compreso tra 1 e 5')
            return
        }

        if (review.days < 1 || review.days > 365) {
            setError('I giorni devono essere maggiori di 0 e minori di 365')
            return
        }

        if (review.text.trim() === '' || review.text.length > 255) {
            setError('Il testo della recensione non può essere vuoto o superare i 255 caratteri')
            return
        }

        if (review.name.trim() === '' || review.name.length > 100) {
            setError('Il nome non può essere vuoto o superare i 100 caratteri')
            return
        }

        setIsLoading(true)

        axios.post(`http://localhost:3000/api/properties/${id}`, review)
            .then((res) => {
                setReview(initReview)
                onSubmit()
                callback()
                alert('Recensione aggiunta')
            })
            .catch((err) => {
                console.error(err)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }


    return (
        <>
            <form onSubmit={addRew}>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                            Nome
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                placeholder="Nome"
                                name="name"
                                value={review.name}
                                onChange={handleChange}
                                required
                                maxLength={100}
                                className="block w-full rounded-md bg-slate-100 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="days" className="block text-sm/6 font-medium text-gray-900">
                            Giorni di permanenza
                        </label>
                        <div className="mt-2">
                            <input type="number"
                                placeholder="Giorni"
                                value={review.days}
                                name="days"
                                onChange={handleChange}
                                required
                                min={1}
                                max={365}
                                className="block w-full rounded-md bg-slate-100 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-4">
                        <label htmlFor="vote" className="block text-sm/6 font-medium text-gray-900">
                            Voto
                        </label>
                        <div className="mt-2">
                            <input type="number"
                                placeholder="Voto"
                                value={review.vote}
                                name="vote"
                                onChange={handleChange}
                                required
                                min={1}
                                max={5}
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
                                value={review.text}
                                name="text"
                                onChange={handleChange}
                                required
                                maxLength={255}
                                className="block w-full rounded-md bg-slate-100 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                            />
                        </div>
                    </div>
                </div>
                <div className='flex justify-between items-center'>
                    <button type="submit" className="my-6 w-3xs rounded-md bg-green px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-green-300 cursor-pointer bg-green-600 hover:bg-cyan-600 transition hover:-translate-y-1 hover:scale-101 delay-100">Aggiungi</button>
                    <span className='text-red-600'>{error}</span>
                </div>
            </form>
        </>
    )
}