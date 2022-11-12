import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteIcon from '@mui/icons-material/Delete';
export const sideBarItems = [
    {
        id: 1,
        icon: <LightbulbOutlinedIcon />,
        label: "Notes",
        route: "/"
    },
    {
        id: 2,
        icon: <ArchiveIcon />,
        label: "Archive",
        route: "/archive"
    },
    {
        id: 3,
        icon: <DeleteIcon />,
        label: "Bin",
        route: "/bin"
    },
]