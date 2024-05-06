import { BottomNavigation, BottomNavigationAction } from "@mui/material"
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useState } from "react"
import { Link } from "react-router-dom"

const BotomNav = () => {

    const [value, setValue] = useState(0)


    return (

        <BottomNavigation
            className='footer'
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue)
            }}
            showLabels
        >
            <BottomNavigationAction label="Instalaciones" component={Link} to="/instalaciones" icon={<AutoAwesomeOutlinedIcon sx={{ color: '#ff9800' }} />} />
            <BottomNavigationAction label="Mis eventos" component={Link} to="/eventos" icon={<FavoriteIcon sx={{ color: '#ba000d' }} />} />

        </BottomNavigation>
    )
}

export default BotomNav