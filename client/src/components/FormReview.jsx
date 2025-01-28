import React, { useState } from 'react'
import axios from 'axios'

export default function FormReview({ id, onSubmit }) {

    const initReview = {
        property_id: id,
        name: '',
        vote: '',
        text: '',
        days: '',
        date: ''
    }

    const [review, setReview] = useState(initReview)

    function handleChange(e) {

        const { name, value } = e.target
        setReview({
            ...review,
            [name]: value
        })
    }

    function addRew(e) {
        e.preventDefault()

        console.log('Sending review:', review)

        axios.post(`http://localhost:3000/api/properties/${id}`, review)
            .then((res) => {
                setReview(initReview)
                onSubmit()
            })
            .catch((err) => {
                console.error(err)
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
                <div className='flex justify-around flex-col'>
                    <button type="submit" className="mt-6 w-3xs rounded-md bg-green px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-green-300 cursor-pointer bg-green-400 hover:bg-green-500 transition hover:-translate-y-1 hover:scale-101 delay-100">Aggiungi</button>
                </div>
            </form>
        </>
    )
}