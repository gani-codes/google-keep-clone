import { Box, styled } from '@mui/material'
import React from 'react'
import CreateNoteForm from '../components/createNoteForm/CreateNoteForm';

const NotesPage = () => {
    const DrawerHeader = styled('div')(({ theme }) => ({
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));
    return (
        <>
            <Box sx={{ display: 'flex', width: '100%' }}>
                <DrawerHeader />
                <CreateNoteForm />
            </Box>
        </>
    )
}

export default NotesPage
