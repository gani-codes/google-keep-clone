import { Box, Button, Card, CardActions, CardContent, styled, Typography } from '@mui/material';
import React, { useContext, useRef, useState } from 'react'
import UserContext from '../../context/user/UserContext';
import axios from 'axios';
import EditNote from './EditNote';


const StyledCard = styled(Box)`
    // border: 0.15px solid #e0e0e0;
    border-radius: 8px;
    // width: 250px;
    // margin: 8px;
    box-shadow: none;
    cursor:default;
`
const FormIcons = styled(Box)`
    display:flex;
    justify-content:space-between;
    width:100%;
    margin-top:4px;
`
const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL })

const NoteCard = ({ singleNote, page }) => {
    const [displayNoteActions, setDisplayNoteActions] = useState(false);
    const { notes, setNotes, allArchivedNotes, setAllArchivedNotes, allTrashNotes, setAllTrashNotes } = useContext(UserContext)

    const editModalRef = useRef(null);
    const openEditModal = () => {
        editModalRef.current.click();
    }

    const handleMouseOver = () => {
        setDisplayNoteActions(true);
    }

    const handleMouseOut = () => {
        setDisplayNoteActions(false);
    }

    const handleNoteAction = async (e) => {
        const actionType = e.target.name;
        if (actionType === 'archive') {
            try {
                const { data } = await axiosInstance.put(`/api/notes/${singleNote._id}`, { isArchived: true })
                if (data.success) {
                    //need to fetch all notes here and update archived notes
                    const updatedNotes = notes.filter(note => note._id !== data.note._id);
                    console.log(updatedNotes)
                    setNotes(updatedNotes)
                    setAllArchivedNotes([...allArchivedNotes, singleNote]);
                }
            } catch (error) {
                console.log(error)
            }
        }
        else if (actionType === 'unarchive') {
            try {
                const { data } = await axios.put(`/api/notes/${singleNote._id}`, { isArchived: false })
                if (data.success) {
                    //need to fetch all notes here and update archived notes
                    const updatedNotes = allArchivedNotes.filter(note => note._id !== data.note._id); // rest all notes
                    console.log(updatedNotes)
                    setAllArchivedNotes(updatedNotes);
                    setNotes([...notes, singleNote])
                }
            } catch (error) {
                console.log(error)
            }
        }
        else if (actionType === 'bin') {
            try {
                //make an call to move the note in bin
                const { data } = await axiosInstance.put(`/api/notes/${singleNote._id}`, { isTrash: true, isArchived: false });
                console.log(data.note)
                if (data.success) {
                    //need to fetch all notes here and update trash notes
                    const updatedNotes = notes.filter(note => note._id !== data.note._id);
                    console.log(updatedNotes)
                    setNotes(updatedNotes)
                    setAllTrashNotes([...allTrashNotes, singleNote]);

                    //updating archived notes if a note is sent to bin from archive
                    if (page === 'archived') {
                        const updatedArchivedNotes = allArchivedNotes.filter(note => note._id !== data.note._id); // rest all notes
                        setAllArchivedNotes(updatedArchivedNotes);
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
        else if (actionType === 'restore') {
            try {
                const { data } = await axiosInstance.put(`/api/notes/${singleNote._id}`, { isTrash: false })
                if (data.success) {
                    //need to fetch all notes here and update archived notes
                    const updatedNotes = allTrashNotes.filter(note => note._id !== data.note._id); // rest all notes
                    console.log(updatedNotes)
                    setAllTrashNotes(updatedNotes);
                    setNotes([...notes, singleNote])
                }
            } catch (error) {
                console.log(error)
            }
        }
        else if (actionType === 'delete') {
            try {
                //make an call to move the note in bin
                const { data } = await axiosInstance.delete(`/api/notes/${singleNote._id}`);
                if (data.success) {
                    //need to fetch all notes here and update trash notes
                    const updatedNotes = allTrashNotes.filter(note => note._id !== singleNote._id);
                    console.log(updatedNotes)
                    setAllTrashNotes(updatedNotes);
                }
            } catch (error) {
                console.log(error)
            }
        }
        else { console.log(actionType) }
    }

    const card = (
        <React.Fragment>
            <CardContent onClick={openEditModal}>
                <Typography variant="h5" component="div">
                    {singleNote.title}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {singleNote.desc.length > 0 ? singleNote.desc : singleNote.title > 0 ? '' : 'Empty Note'}
                </Typography>
            </CardContent>
            <CardActions sx={{ opacity: displayNoteActions ? 1 : 0 }}>
                <FormIcons>
                    {/* <Button onClick={handleNoteAction} name='edit' size='small' variant='outlined' sx={{ color: '#000', mr: 0.5 }}>Edit</Button> */}
                    <Button onClick={handleNoteAction} name={page === 'delete' ? 'delete' : 'bin'} size='small' variant='outlined' sx={{ color: '#000', mr: 0.5 }}>{page === 'delete' ? 'Delete' : 'Bin'}</Button>
                    <Button onClick={handleNoteAction} name={page === 'archived' ? 'unarchive' : page === 'delete' ? 'restore' : 'archive'} size='small' variant='outlined' sx={{ color: '#000', mr: 0.5 }}>{page === 'archived' ? 'Unarchive' : page === 'delete' ? 'Restore' : 'Archive'}</Button>
                </FormIcons>
            </CardActions>
        </React.Fragment >
    );

    return (
        <>
            <StyledCard onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                <Card variant="outlined">{card}</Card>
            </StyledCard>
            <EditNote note={singleNote} page={page} ref={editModalRef} />
        </>
    )
}

export default NoteCard;
