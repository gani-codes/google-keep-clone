import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
export const sideBarItems = [
    {
        id: 1,
        icon: <LightbulbOutlinedIcon />,
        label: "Notes",
        route: "/"
    },
    {
        id: 2,
        icon: <ArchiveOutlinedIcon />,
        label: "Archive",
        route: "/archive"
    },
    {
        id: 3,
        icon: <DeleteOutlineOutlinedIcon />,
        label: "Bin",
        route: "/bin"
    },
]