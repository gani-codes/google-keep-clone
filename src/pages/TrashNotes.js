import { Box, styled } from '@mui/material';
import React from 'react'

const TrashNotes = () => {
    const DrawerHeader = styled('div')(({ theme }) => ({
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));
    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <DrawerHeader />
            <Box sx={{ mt: 15 }}>
                Bin
            </Box>
        </Box>
    )
}

export default TrashNotes
