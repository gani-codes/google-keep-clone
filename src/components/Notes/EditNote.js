import React, { useContext, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { TextField, Typography } from '@mui/material';
import UserContext from '../../context/user/UserContext';
import axios from 'axios';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const inputStyle = {
    width: '100%',
    mt: 2,
}

const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL })

const EditNote = ({ note, page }, ref) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [editedNote, setEditedNote] = useState({ title: note.title || "", desc: note.desc || "" })
    const onChange = (e) => {
        setEditedNote({ ...editedNote, [e.target.name]: e.target.value })
    }

    const { allNotes, setAllNotes, setNotes, notes, allArchivedNotes, setAllArchivedNotes } = useContext(UserContext);
    const handleClickAway = async () => {
        if ((editedNote.desc !== note.desc || editedNote.title !== note.title) && (page === 'notes' || page === 'archived')) {
            try {
                const { data } = await axiosInstance.put(`/api/notes/${note._id}`, {
                    title: editedNote.title,
                    desc: editedNote.desc
                })
                if (data.success) {
                    //need to fix issue in rendering the notes properly
                    console.log(data.note)
                    // if updating note from notes page
                    if (page === 'notes') {
                        const newNotes = notes.filter(n => n._id !== note._id)
                        const allNewNotes = allNotes.filter(n => n._id !== note._id)

                        setAllNotes([...allNewNotes, data.note])
                        setNotes([...newNotes, data.note])
                    } else {
                        // if updating note from archived page
                        const newNotes = allArchivedNotes.filter(n => n._id !== note._id)
                        setAllArchivedNotes([...newNotes, data.note]);
                    }
                    handleClose();
                }
            } catch (error) {
                handleClose();
                console.log(error)
            }
        } else {
            handleClose();
        }
    }

    return (
        <div>
            <Button ref={ref} onClick={handleOpen} sx={{ display: 'none' }}>Open modal</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClickAway}
                closeAfterTransition
                BackdropComponent={Backdrop}
                disableAutoFocus={true}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        {page === 'delete' ? <Typography>{note.title}</Typography> : <TextField placeholder="Title"
                            onChange={onChange}
                            variant="standard"
                            InputProps={{ disableUnderline: true }}
                            style={{ marginBottom: 10 }}
                            name='title'
                            value={editedNote.title}
                            id="transition-modal-title"
                            sx={inputStyle}
                        />}

                        {page === 'delete' ? <Typography>{note.desc}</Typography> : <TextField placeholder="Take a note..."
                            onChange={onChange}
                            multiline
                            maxRows={Infinity}
                            variant="standard"
                            InputProps={{ disableUnderline: true }}
                            name='desc'
                            value={editedNote.desc}
                            id="transition-modal-description"
                            sx={inputStyle}
                        />}

                        {/* button for delete forever and restore can be added here */}
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
const ForwardedEditNote = React.forwardRef(EditNote)
export default ForwardedEditNote;