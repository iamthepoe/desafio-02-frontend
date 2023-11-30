import { useState } from "react";
import { URL } from "../constants";

export default function SignIn({handleSignUpRedirect, handleUserRedirect}) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const signIn = async () => {
    const response = await fetch(`${URL}/sign-in`, {
        body: JSON.stringify({ ...user }),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

    localStorage['token'] = data.token;

    if(response.status === 200){
        alert('Login Realizado com Sucesso!')
        handleUserRedirect();
    }else{
        alert("Algo de errado ocorreu.");
    }
  }

  return (
    <section className="flex flex-col justify-center align-center text-center gap-3">
      <form
        id="form"
        className="
          flex flex-col justify-center items-center w-full
          gap-3
        "
        onSubmit={async (e)=>{
          e.preventDefault();
          await signIn();
        }}
      >
        <input
        className="text-white"
          placeholder="Email"
          type="email"
          required
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        <input
            className="text-white"
          placeholder="Senha"
          type="password"
          required
          minLength={8}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />

        <button type="submit" className="bg-lime-500 w-44 h-8">
            Enviar
        </button>
      </form>

      <p
        className="text-lime-500 underline hover:cursor-pointer"
        onClick={handleSignUpRedirect}
      >
        Ainda não possui conta? Clique aqui para cadastrar.
      </p>
    </section>
  );
}
