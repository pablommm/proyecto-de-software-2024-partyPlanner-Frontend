import { BottomNavigation, BottomNavigationAction } from "@mui/material"
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import FavoriteIcon from '@mui/icons-material/Favorite'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'
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
            <BottomNavigationAction label="Instalaciones" component={Link} to="/instalaciones" icon={<AutoAwesomeOutlinedIcon />} />
            <BottomNavigationAction label="Mis eventos" component={Link} to="/eventos" icon={<FavoriteIcon />} />
            <BottomNavigationAction label="Nuevo" component={Link} to="/nuevo" icon={<AddBoxOutlinedIcon />} />
        </BottomNavigation>
    )
}

export default BotomNav