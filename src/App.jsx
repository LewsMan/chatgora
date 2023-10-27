import { useEffect, useState, createContext } from "react";
import { createClient } from "@supabase/supabase-js";
import { Login, Chat } from "./components"
import "./reset.css"

const supabase = createClient(
  import.meta.env.VITE_SUPA_CLIENT,
  import.meta.env.VITE_SUPA_ANON
);

export const AppContext = createContext();

function App() {
  const [user, setUser] = useState()

  return (
    <AppContext.Provider value={{user, setUser, supabase}}>
      {user
        ? <Chat />
        : <Login />}
    </AppContext.Provider>
  )
}

export default App
