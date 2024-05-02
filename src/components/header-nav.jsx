import { useContext } from 'react'
import UserContext from 'src/Services/context'
import { useState } from 'react'

import {
    AppBar,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    
} from '@mui/material'
import { AccountCircle } from "@mui/icons-material"
import MenuIcon from '@mui/icons-material/Menu'
//import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
export const HeaderNav = () => {
    const [anchorEl, setAnchorEl] = useState(null)
    //const navigate = useNavigate()

    
   
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const [user, setUser] = useContext(UserContext)

    const cerrarSession =() =>{
        setUser(null)
        console.log("se cerro la sesion correctamente",user)
    }

    return (
        <Box sx={{ flexGrow: 0 }}>
            <AppBar position="static">
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleMenu}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <h9>Bienvenido {user.nombreYApellido && user.nombreYApellido ? user.nombreYApellido: 'deslogueado'}</h9>
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                            edge="end"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem component={Link} to="/perfilUsuario">My account</MenuItem>
                            <MenuItem component={Link} to="/Login" onClick={cerrarSession}>Cerrar Sesion</MenuItem>
                            
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
