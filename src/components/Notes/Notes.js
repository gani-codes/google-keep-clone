import { Grid } from '@mui/material'
import React, { useContext } from 'react'
import UserContext from '../../context/user/UserContext'
import NoteCard from './NoteCard'
import Masonry from 'react-masonry-css'
import './notes.css'


const Notes = () => {
    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1
    };
    const { notes } = useContext(UserContext)
    return (
        <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
        >
            {notes.map((singleNote, index) => (
                <Grid key={index} item >
                    <NoteCard singleNote={singleNote} page={'notes'} />
                </Grid>
            )).reverse()}
        </Masonry>
    )
}

export default Notes
