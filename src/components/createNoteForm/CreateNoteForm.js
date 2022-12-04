import React, { useContext, useRef, useState } from 'react'
import { Box, Button, ClickAwayListener, MenuItem, styled, TextField } from '@mui/material'
import UserContext from '../../context/user/UserContext';
import axios from 'axios';
import { formIconList } from '../../utils/noteCardIcons';

const FormContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    margin: 96px auto;
    box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%);
    border-color: #e0e0e0;
    width: 600px;
    border-radius: 8px;
    min-height: 30px;
    padding: 10px 15px;
`

const FormIcons = styled(Box)`
    display:flex;
    justify-content:space-between;
    margin-top:4px
`

const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL })

const CreateNoteForm = () => {
    const { user, allNotes, setAllNotes, setNotes, notes } = useContext(UserContext);

    const [showTextField, setShowTextField] = useState(false);

    const formContainerRef = useRef();
    const displayTextField = () => {
        setShowTextField(true);
    }

    const [note, setNote] = useState({ title: "", desc: "" })

    const emptyNote = {
        title: "",
        desc: ""
    }

    const handleClickAway = async () => {
        if (note.desc.length !== 0 || note.title.length !== 0) {
            try {
                const { data } = await axiosInstance.post('/api/notes/', {
                    title: note.title,
                    desc: note.desc,
                    userId: user._id || user.sub
                })
                if (data.success) {
                    setAllNotes([...allNotes, note])
                    setNotes([...notes, note])
                    //need to clear input after submission
                    setNote(emptyNote)
                }
            } catch (error) {
                console.log(error)
            }
        }
        setShowTextField(false);
        formContainerRef.current.style.minheight = '30px'
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <FormContainer sx={{ width: { xs: '320px', md: '600px' } }} ref={formContainerRef}>
                {showTextField ? <TextField placeholder="Title"
                    onChange={onChange}
                    variant="standard"
                    InputProps={{ disableUnderline: true }}
                    style={{ marginBottom: 10 }}
                    name='title'
                    value={note.title}
                /> : ''}
                <TextField placeholder="Take a note..."
                    onChange={onChange}
                    multiline
                    maxRows={Infinity}
                    variant="standard"
                    InputProps={{ disableUnderline: true }}
                    onClick={displayTextField}
                    name='desc'
                    value={note.desc}
                />
                {showTextField ? <FormIcons>
                    <FormIcons>
                        {
                            formIconList.map(formIcon => (
                                <MenuItem key={formIcon.id} sx={{ p: 1, fontSize: 0.5, borderRadius: '50%', color: '#202124', opacity: 0.71 }}>
                                    {formIcon.icon}
                                </MenuItem>
                            ))
                        }
                    </FormIcons>
                    <Button onClick={handleClickAway} variant="text" sx={{ color: '#000' }}>Close</Button>
                </FormIcons> : ''}
            </FormContainer>
        </ClickAwayListener >
    )
}

export default CreateNoteForm
