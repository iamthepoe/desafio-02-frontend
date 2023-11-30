import { URL } from "../constants";
import { useEffect, useState } from "react";

export default function User({handleLoginRedirect}) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await fetch(`${URL}/user`, {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        });

        if(response.status === 401){
            alert("Seu login expirou!");
            return handleLoginRedirect();
        }

        const data = await response.json();
        setUser({ ...data });
      } catch (error) {
        alert("Algo de errado aconteceu!")
      }
    };

    getUserInfo();
  }, []);

  return (
    <section className="flex flex-col justify-center align-center text-center gap-3">
      <form
        id="form"
        className="
          flex flex-col justify-center items-center w-full
          gap-3
        "
      >
        <input
        className="text-white"
          placeholder="Nome de Usuário"
          type="text"
          required
          value={user.name}
          readOnly
        />

        <input
        className="text-white"
          placeholder="Email"
          type="email"
          required
          value={user.email}
          readOnly
        />

        <div>
          {user.phones &&
            user.phones.map((phone, index) => (
              <div key={index}>
                <input
                  placeholder="DDD"
                  className="mx-2 text-white"
                  type="text"
                  maxLength={2}
                  minLength={2}
                  value={phone.ddd}
                  readOnly
                />

                <input
                className="text-white"
                  placeholder="Número"
                  type="text"
                  maxLength={9}
                  minLength={9}
                  value={phone.number}
                  readOnly
                />
              </div>
            ))}
        </div>
        <button 
            className="bg-red-500 w-44 h-8"
            onClick={()=>{
                localStorage.token = undefined;
                handleLoginRedirect();
            }}>
            Sair
        </button>
      </form>
      
    </section>
  );
}
