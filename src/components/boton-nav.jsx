import { useState } from "react"
import { BottomNavigation, BottomNavigationAction } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import { DoneOutlineOutlined } from "@mui/icons-material"
import { Link } from "react-router-dom"

export const BottomNav = () => {

    const [value, setValue] = useState(0)

    return (
        <BottomNavigation
            className='footer'
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue)
            }}
        >
            <BottomNavigationAction component={Link} to="/login" label="Evento" icon={<PersonIcon />} />
            <BottomNavigationAction component={Link} to="/login" label="Servicios" icon={<DoneOutlineOutlined />} />

        </BottomNavigation>

    )

}