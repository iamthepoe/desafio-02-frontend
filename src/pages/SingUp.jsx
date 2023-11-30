import { useState } from "react";
import { URL } from "../constants";

export default function SignUp({handleLoginRedirect, handleUserRedirect}) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phones: [
      { ddd: "", number: "" }
    ]
  });

  const handlePhoneChange = (index, key, value) => {
    const updatedPhones = [...user.phones];
    updatedPhones[index][key] = value;
    setUser({ ...user, phones: updatedPhones });
  };

  const signUp = async () => {
    const response = await fetch(`${URL}/sign-up`, {
        body: JSON.stringify({ ...user }),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

    localStorage['token'] = data.token;

    if(response.status === 201){
      alert('Cadastro Realizado com Sucesso!')
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
          await signUp();
        }}
      >
        <input
          className="text-white"
          placeholder="Nome de Usuário"
          type="text"
          required
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />

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

        <div>
          {user.phones.map((phone, index) => (
            <div key={index}>
              <input
                placeholder="DDD"
                className="mx-2 text-white"
                type="text"
                maxLength={2}
                minLength={2}
                value={phone.ddd}
                onChange={(e) => handlePhoneChange(index, "ddd", e.target.value)}
              />

              <input
                className="text-white"
                placeholder="Número"
                type="text"
                maxLength={9}
                minLength={9}
                value={phone.number}
                onChange={(e) => handlePhoneChange(index, "number", e.target.value)}
              />
            </div>
          ))}
        </div>

        <button type="submit" className="bg-lime-500 w-44 h-8">
            Enviar
        </button>
      </form>
      <p
        className="text-lime-500 underline hover:cursor-pointer"
        onClick={handleLoginRedirect}
      >
        Já possui cadastro? Clique para fazer o Login.
      </p>
    </section>
  );
}
