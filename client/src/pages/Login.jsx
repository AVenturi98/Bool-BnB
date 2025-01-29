import logo from '../assets/logo.svg'
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router';

export default function Login({setOwnerName, authenticated, setAuthenticated }) {
  useAuth(); // Utilizza il contesto dell'autenticazione

  const handleOnSubmit = async (e) => {
    e.preventDefault()

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      // Effettua una richiesta POST al server
      const response = await axios.post('http://localhost:3000/api/properties/login', { email, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("ownerName", response.data.ownerName);
      console.log(response.data.ownerName);
      // Salva il token
      setAuthenticated(true); // Aggiorna lo stato globale
      console.log(authenticated);
      
      // Se il login è riuscito
      alert(`Benvenuto ${response.data.ownerName}!`); // Mostra il messaggio di successo
      // Esempio di redirezione alla dashboard
      window.location.href = '/my-properties';
    } catch (error) {
      // Se il login fallisce
      if (error.response && error.response.status === 401) {
        alert('Email o password non corretti');
      } else {
        console.error('Errore durante il login:', error);
        alert('Errore del server, riprova più tardi.');
      }
    }
  };



  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Link to='/'>
            <img
              alt="Bool BnB"
              src={logo} // Aggiungi logo qui
              className="mx-auto h-40 w-auto"
            />
          </Link>
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleOnSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-slate-100 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-slate-100 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-green-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-green-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
