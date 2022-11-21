import { Box, Grid } from '@mui/material'
import React, { useContext } from 'react'
import UserContext from '../../context/user/UserContext'
import NoteCard from './NoteCard'


const Notes = () => {
    const { allNotes } = useContext(UserContext)
    return (
        <Box sx={{ p: 3, width: '100%' }}>
            <Grid container sx={{ justifyContent: { xs: "center", md: "flex-start" } }}>
                {allNotes.map((singleNote, index) => (
                    <Grid key={index} item >
                        <NoteCard singleNote={singleNote} />
                    </Grid>
                ))}
            </Grid>
        </Box >
    )
}

export default Notes
