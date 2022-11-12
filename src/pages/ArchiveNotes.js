import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import React from 'react'

const ArchiveNotes = () => {
    const DrawerHeader = styled('div')(({ theme }) => ({
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));
    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <DrawerHeader />
            <Box sx={{ mt: 15 }}>
                Archive
            </Box>
        </Box>
    )
}

export default ArchiveNotes
