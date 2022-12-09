import { useEffect, useState } from "react"
import axios from 'axios';
import UserContext from "./UserContext"

const UserState = ({ children }) => {
    const [user, setUser] = useState(null);
    const [allNotes, setAllNotes] = useState([]);
    const [notes, setNotes] = useState([]);
    const [allArchivedNotes, setAllArchivedNotes] = useState([]);
    const [allTrashNotes, setAllTrashNotes] = useState([]);

    const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL })

    useEffect(() => {
        const checkUser = async () => {
            try {
                const { data } = await axiosInstance.get("/api/auth/login/success", { withCredentials: true });
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
                const { data } = await axiosInstance.get("/api/notes/", { withCredentials: true });
                setAllNotes(data.notes);
                setNotes(data.notes.filter(note => !note.isArchived && !note.isTrash));
                setAllArchivedNotes(data.notes.filter(note => note.isArchived && !note.isTrash));
                setAllTrashNotes(data.notes.filter(note => note.isTrash && !note.isArchived));
            } catch (error) {
                console.log(error.response)
            }
        }

        user && fetchAllNotes();
        // eslint-disable-next-line
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser, allNotes, setAllNotes, notes, setNotes, allArchivedNotes, setAllArchivedNotes, allTrashNotes, setAllTrashNotes }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserState;
