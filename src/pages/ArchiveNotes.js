import { Box, Grid } from '@mui/material'
import { styled } from '@mui/material/styles'
import React, { useContext } from 'react'
import NoteCard from '../components/Notes/NoteCard';
import UserContext from '../context/user/UserContext';

import Masonry from 'react-masonry-css'
import '../components/Notes/notes.css'

const ArchiveNotes = () => {
    const DrawerHeader = styled('div')(({ theme }) => ({
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));


    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1
    };

    const { allArchivedNotes } = useContext(UserContext);

    return (
        <Box sx={{ p: 3, width: '100%' }}>
            <DrawerHeader />
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {allArchivedNotes.map((singleNote, index) => (
                    <Grid key={index} item >
                        <NoteCard singleNote={singleNote} page={'archived'} />
                    </Grid>
                )).reverse()}
            </Masonry>
        </Box>

    )

}
export default ArchiveNotes
