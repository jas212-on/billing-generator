// GlobalContext.js
import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [products, setProducts] = useState([
    { name: "pen", price: 10 },
    { name: "pencil", price: 5 },
    { name: "paper", price: 25 },
    { name: "rubber", price: 15 },
    { name: "pouch", price: 20 }
  ]);

  return (
    <GlobalContext.Provider value={{ products, setProducts }}>
      {children}
    </GlobalContext.Provider>
  );
};
