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
    <>
      <form
        id="form"
        className="
          flex flex-col justify-center items-center w-full
          gap-3
        "
      >
        <input
          placeholder="Nome de Usuário"
          type="text"
          required
          value={user.name}
          readOnly
        />

        <input
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
                  className="mx-2"
                  type="text"
                  maxLength={2}
                  minLength={2}
                  value={phone.ddd}
                  readOnly
                />

                <input
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
      </form>
      <button onClick={()=>{
        localStorage.token = undefined;
        handleLoginRedirect();
      }}>
        Sair
      </button>
    </>
  );
}
