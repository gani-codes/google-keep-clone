import { Box, Button, Card, CardActions, CardContent, MenuItem, styled, Typography } from '@mui/material';
import React, { useState } from 'react'
import NotificationImportantOutlinedIcon from '@mui/icons-material/NotificationImportantOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';

const StyledCard = styled(Box)`
    border: 0.15px solid #e0e0e0;
    border-radius: 8px;
    width: 250px;
    margin: 8px;
    box-shadow: none;
    cursor:default;
`
const FormIcons = styled(Box)`
    display:flex;
    justify-content:space-between;
    width:100%;
    margin-top:4px;
`
const formIconList = [
    {
        id: 1,
        icon: <NotificationImportantOutlinedIcon />
    },
    {
        id: 2,
        icon: <ColorLensOutlinedIcon />
    },
    {
        id: 3,
        icon: <HighlightOffOutlinedIcon />
    }
]

const NoteCard = ({ singleNote }) => {
    const [displayNoteActions, setDisplayNoteActions] = useState(false);

    const handleMouseOver = () => {
        setDisplayNoteActions(true);
    }

    const handleMouseOut = () => {
        setDisplayNoteActions(false);
    }

    const card = (
        <React.Fragment>
            <CardContent>
                <Typography variant="h5" component="div">
                    {singleNote.title}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {singleNote.desc}
                </Typography>
            </CardContent>
            <CardActions sx={{ opacity: displayNoteActions ? 1 : 0 }}>
                <FormIcons>
                    {
                        formIconList.map(formIcon => (
                            <MenuItem key={formIcon.id} sx={{ p: 1, fontSize: 0.5, borderRadius: '50%', color: '#202124', opacity: 0.71 }}>
                                {formIcon.icon}
                            </MenuItem>
                        ))
                    }
                </FormIcons>
            </CardActions>
        </React.Fragment >
    );

    return (
        <StyledCard onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <Card variant="outlined">{card}</Card>
        </StyledCard>
    )
}

export default NoteCard;
