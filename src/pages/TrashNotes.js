import { Box, Grid, styled } from '@mui/material';
import React, { useContext } from 'react'
import NoteCard from '../components/Notes/NoteCard';
import UserContext from '../context/user/UserContext';

const TrashNotes = () => {
    const DrawerHeader = styled('div')(({ theme }) => ({
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));
    const { allNotes } = useContext(UserContext);


    const allTrashNotes = allNotes.filter(note => note.isTrash && !note.isArchived)

    return (
        <Box sx={{ p: 3, width: '100%' }}>
            <DrawerHeader />
            <Grid container sx={{ justifyContent: { xs: "center" } }}>
                {allTrashNotes.map((singleNote) => (
                    <Grid item key={singleNote.id}>
                        <NoteCard singleNote={singleNote} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default TrashNotes
