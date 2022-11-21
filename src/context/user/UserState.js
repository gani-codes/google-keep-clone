import { useEffect, useState } from "react"
import axios from 'axios';
import UserContext from "./UserContext"

const UserState = ({ children }) => {
    const [user, setUser] = useState(null);
    const [allNotes, setAllNotes] = useState([]);
    useEffect(() => {
        const checkUser = async () => {
            try {
                const { data } = await axios.get("http://localhost:8000/api/auth/login/success", { withCredentials: true });
                // setUser(data.user._json);
                // console.log(data.user._json.name)
                setUser(data.user);
                // console.log(data.user)
            } catch (error) {
                console.log(error)
            }
        }
        checkUser();
    }, []);

    useEffect(() => {
        const fetchAllNotes = async () => {
            try {
                const { data } = await axios.get("http://localhost:8000/api/notes/", { withCredentials: true });
                // console.log(data);
                setAllNotes(data.notes)
            } catch (error) {
                console.log(error.response)
            }
        }

        user && fetchAllNotes();
    }, [user])




    return (
        <UserContext.Provider value={{ user, setUser, allNotes, setAllNotes }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserState;
