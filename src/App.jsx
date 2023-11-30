import { useState } from 'react'
import SignUp from './pages/SingUp'
import SignIn from './pages/SignIn'
import './App.css'
import User from './pages/User'
function App() {

  const [page, setPage] = useState('signup');

  return (
    <>
      <main className='flex flex-col h-[100vh] w-full justify-center items-center'>
        <div className='flex flex-col w-full h-28 items-center gap-1'>
          <h1 className='text-3xl'>Escribo</h1>
          <h2>Inovação para o aprendizado</h2>
          {page === 'signup' ? (
            <SignUp 
              handleLoginRedirect={() => setPage('login')} 
              handleUserRedirect={()=> setPage('user')} 
            />
          ) : null}

          {page === 'login' ? (
            <SignIn 
              handleSignUpRedirect={() => setPage('signup')}
              handleUserRedirect={()=> setPage('user')}  
            />
          ) : null}

          {page === 'user' ? (
            <User handleLoginRedirect={() => setPage('login')} />
          ) : null}
        </div>
      </main>
    </>
  )
}

export default App
