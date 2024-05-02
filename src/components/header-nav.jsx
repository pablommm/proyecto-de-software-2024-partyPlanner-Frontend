import { useContext, useState } from 'react'
import UserContext from 'src/Services/context'
import {
    AppBar,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Fade,

    Grid
} from '@mui/material'
import { AccountCircle } from "@mui/icons-material"
import { Link } from 'react-router-dom'
import { ExitToApp } from "@mui/icons-material"


export const HeaderNav = () => {
    const [anchorEl, setAnchorEl] = useState(null)
    const [user, setUser] = useContext(UserContext)

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const cerrarSession = () => {
        setUser(null)
        console.log("se cerro la sesion correctamente", user)
    }

    return (
        <Box sx={{ flexGrow: 0 }}>
            <AppBar position="static">
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <h9>Bienvenido {user.nombreYApellido ? user.nombreYApellido : 'deslogueado'}</h9>
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                            edge="end"
                            onClick={handleMenu}
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            TransitionComponent={Fade}
                        >
                            <Fade in={Boolean(anchorEl)}>
                                <Grid container direction="column">

                                    <Grid item>
                                        <MenuItem component={Link} to="/perfilUsuario">
                                            <IconButton color="inherit">
                                                <AccountCircle />
                                            </IconButton>
                                            Mi cuenta
                                        </MenuItem>
                                    </Grid>
                                    <Grid item>
                                        <MenuItem component={Link} to="/Login" onClick={cerrarSession}>
                                            <IconButton color="inherit">
                                                <ExitToApp />
                                            </IconButton>
                                            Cerrar Sesión
                                        </MenuItem>
                                    </Grid>
                                </Grid>
                            </Fade>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
