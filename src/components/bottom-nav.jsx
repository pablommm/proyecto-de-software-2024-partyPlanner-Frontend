import { BottomNavigation, BottomNavigationAction } from "@mui/material"
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useState, useContext } from "react"
import { Link } from "react-router-dom"
import OtherHouses from "@mui/icons-material/OtherHouses"
import UserContext from 'src/Services/context'

const BotomNav = () => {
    const [value, setValue] = useState(0)
    const [user] = useContext(UserContext)

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
            {user.rol === 'PROPIETARIO' &&
                <BottomNavigationAction label="Mis instalaciones" component={Link} to="/instalacionesPropietario" icon={<OtherHouses sx={{ color: '#482880' }} />} />
            }
        </BottomNavigation>
    )
}

export default BotomNav
