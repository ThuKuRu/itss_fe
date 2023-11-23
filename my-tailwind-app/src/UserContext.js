import { useState } from "react";
import { createContext } from "react";
const UserContext = createContext();
function UserProvider({ children }) {
  const [jwt, setJwt] = useState("");
  return (
    <UserContext.Provider value={{ jwt: jwt, setJwt: setJwt }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
export { UserContext };
