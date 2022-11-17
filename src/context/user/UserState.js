import { useEffect, useState } from "react"
import axios from 'axios';
import UserContext from "./UserContext"

const UserState = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const { data } = await axios.get("http://localhost:8000/api/auth/login/success", { withCredentials: true });
                // setUser(data.user._json);
                // console.log(data.user._json.name)
                setUser(data.user);
                console.log(data.user)
            } catch (error) {
                console.log(error)
            }
        }

        checkUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserState;
