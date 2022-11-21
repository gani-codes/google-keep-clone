import { Box, Grid } from '@mui/material'
import { styled } from '@mui/material/styles'
import React, { useContext } from 'react'
import NoteCard from '../components/Notes/NoteCard';
import UserContext from '../context/user/UserContext';

const ArchiveNotes = () => {
    const DrawerHeader = styled('div')(({ theme }) => ({
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));

    const { allNotes } = useContext(UserContext);


    const allArchivedNotes = allNotes.filter(note => note.isArchived && !note.isTrash)
    return (
        <Box sx={{ p: 3, width: '100%' }}>
            <DrawerHeader />
            <Grid container sx={{ justifyContent: { xs: "center" } }}>
                {allArchivedNotes.map((singleNote) => (
                    <Grid item key={singleNote.id}>
                        <NoteCard singleNote={singleNote} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default ArchiveNotes
