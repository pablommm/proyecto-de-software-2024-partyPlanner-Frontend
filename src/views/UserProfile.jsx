import { useState, useContext } from 'react'
import UserContext from 'src/Services/context'
import { makeStyles } from '@material-ui/core/styles'
import {
  Avatar,
  Box,
  Button,
  CardContent,
  Grid,
  Typography,
} from '@material-ui/core'
import TextField from '@mui/material/TextField'
import usuarioService from '../Services/login.service'
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  avatar: {
    width: 100,
    height: 100,
  },
  userInfo: {
    margin: theme.spacing(2),
  },
  texto: {
    color: theme.palette.text.secondary,
    padding: theme.spacing(2)
  },
  campo: {
    margin: 15,
  }
}))

const UserProfile = () => {
  const classes = useStyles()
  const [user, setUser] = useContext(UserContext)

  const [editedUser, setEditedUser] = useState({
    nombreYApellido: user.nombreYApellido,
    username: user.username,
    pass: user.contrasenia,
    // Agrega aquí otros campos editables del usuario si los hay
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditedUser(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSaveChanges = async () => {


    try {
      const usuarioObjeto = await usuarioService.actualizarUsuario(usuarioModificado)
      const usuarioId = usuarioObjeto.id
      localStorage.setItem('usuId', usuarioId.toString())
      setUser(usuarioObjeto)      
      }      
      catch (error) {
      console.error('Error al enviar la solicitud de actualización:', error)
    }
  }

  return (
    <Box className={classes.root} component="form" noValidate autoComplete="off">
      <CardContent>
        <Grid container alignItems="center">
          <Grid item>
            <Avatar className={classes.avatar}>
              {/* Imagen de perfil del usuario */}
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
      <Grid container className={classes.statsGrid}>
        <Grid item className={classes.userInfo} >
          <TextField
            className={classes.campo}
            required
            id="outlined-required"
            label="Nombre del usuario"
            name="nombreYApellido"
            value={editedUser.nombreYApellido}
            onChange={handleInputChange}
          />
          <TextField
            className={classes.campo}
            required
            id="outlined-required"
            label="Username"
            name="username"
            value={editedUser.username}
            onChange={handleInputChange}
          />
          <TextField
            className={classes.campo}
            required
            id="outlined-required"
            label="contrasenia"
            name="contrasenia"
            value={editedUser.contrasenia}
            onChange={handleInputChange}
          />
          <Typography variant="h6" className={classes.texto}>
            Saldo
          </Typography>
        </Grid>
      </Grid>
      <Button variant="contained" color="primary" fullWidth onClick={handleSaveChanges}>
        Guardar Cambios
      </Button>
    </Box>
  )
}

export default UserProfile