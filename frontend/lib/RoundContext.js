import { createContext, useState } from "react";

export const RoundContext = createContext([])

export function RoundContextProvider({ children }) {
  const [rounds, setRounds] = useState([]);

  return (
    <RoundContext.Provider value={{rounds, setRounds}}>
      {children}
    </RoundContext.Provider>
  )
}