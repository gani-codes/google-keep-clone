import { Box, Grid } from '@mui/material'
import { styled } from '@mui/material/styles'
import React from 'react'
import NoteCard from '../components/Notes/NoteCard';

const ArchiveNotes = () => {
    const DrawerHeader = styled('div')(({ theme }) => ({
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));

    const allArchivedNotes = [
        {
            id: 1,
            title: 'My notes are the best',
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla quia, veniam nostrum impedit nobis nam quam quis minus tenetur inventore numquam, at, consectetur amet similique. Nostrum, corrupti possimus eum unde nesciunt blanditiis!"
        },
        {
            id: 2,
            title: "Buy vegetables for dinner",
            desc: "1kg Tomato, 2kg mutton"
        },
        {
            id: 3,
            title: 'My notes are the best',
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla quia, veniam nostrum impedit nobis nam quam quis minus tenetur inventore numquam, at, consectetur amet similique. Nostrum, corrupti possimus eum unde nesciunt blanditiis!"
        }
    ]
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
