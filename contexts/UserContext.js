import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    nome: 'Usuário',
    sobrenome: '',
    numero: '',
    cep: '',
    cidade: '',
    estado: '',
    rua: '',
    bairro: '',
    numeroResidencia: ''
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
