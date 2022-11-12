import React, { useRef, useState } from 'react'
import { Box, Button, ClickAwayListener, MenuItem, styled, TextField } from '@mui/material'
import NotificationImportantOutlinedIcon from '@mui/icons-material/NotificationImportantOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';

const FormContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    margin: 96px auto;
    box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%);
    border-color: #e0e0e0;
    width: 600px;
    border-radius: 8px;
    min-height: 30px;
    padding: 10px 15px;
`

const FormIcons = styled(Box)`
    display:flex;
    justify-content:space-between;
    margin-top:4px
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

const CreateNoteForm = () => {

    const [showTextField, setShowTextField] = useState(false);

    const displayTextField = () => {
        setShowTextField(true);
    }

    const formContainerRef = useRef();

    const handleClickAway = () => {
        setShowTextField(false);
        formContainerRef.current.style.minheight = '30px'
    }
    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <FormContainer sx={{ width: { xs: '320px', md: '600px' } }} ref={formContainerRef}>
                {showTextField ? <TextField placeholder="Title"
                    variant="standard"
                    InputProps={{ disableUnderline: true }}
                    style={{ marginBottom: 10 }}
                    name='heading'
                /> : ''}
                <TextField placeholder="Take a note..."
                    multiline
                    maxRows={Infinity}
                    variant="standard"
                    InputProps={{ disableUnderline: true }}
                    name='text'
                    onClick={displayTextField}
                />
                {showTextField ? <FormIcons>
                    <FormIcons>
                        {
                            formIconList.map(formIcon => (
                                <MenuItem key={formIcon.id} sx={{ p: 1, fontSize: 0.5, borderRadius: '50%', color: '#202124', opacity: 0.71 }}>
                                    {formIcon.icon}
                                </MenuItem>
                            ))
                        }
                    </FormIcons>
                    <Button onClick={handleClickAway} variant="text" sx={{ color: '#000' }}>Close</Button>
                </FormIcons> : ''}
            </FormContainer>
        </ClickAwayListener >
    )
}

export default CreateNoteForm
