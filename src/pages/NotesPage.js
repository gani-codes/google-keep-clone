import { Box } from '@mui/material'
import React from 'react'
import CreateNoteForm from '../components/createNoteForm/CreateNoteForm';
import Notes from '../components/Notes/Notes';

const NotesPage = () => {
    return (
        <>
            <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
                <CreateNoteForm />
                <Notes />
            </Box>
        </>
    )
}

export default NotesPage
