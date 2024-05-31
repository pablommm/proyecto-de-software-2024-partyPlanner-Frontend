import { useContext, useState,useEffect } from 'react'
import UserContext from 'src/Services/context'
import { makeStyles } from '@mui/styles'
import { Avatar, Box, Button, CardContent, Grid, Typography, TextField } from '@mui/material'
import CreditView from '../components/tarjetaCreditoPablo'
import { Usuario, UsuarioActualizado } from 'src/Dominio/Usuario'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  Box: {
    width: 200,
    height: 200,
  },
  avatar: {
    width: 100,
    height: 100,
  },
  userInfo: {
    margin: theme.spacing(2),
  },
  name: {
    fontWeight: 'bold',
  },
  texto: {
    color: theme.palette.text.secondary,
    padding: theme.spacing(2)
  },

  statsGrid: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  statItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(5),
  },
  statIcon: {
    marginRight: theme.spacing(1),
  },
  statValue: {
    fontWeight: 'bold',
  },
  campo: {
    margin: 15,
  }


}))

const UserProfile = () => {
  const classes = useStyles()
  const [user, setUser] = useContext(UserContext)
  const [nombreYApellido, setNombreYApellido] = useState('')
  const [username, setUsername] = useState('')
  const [pass, setPass] = useState('')
  const [saldo, setSaldo] = useState('')
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    if (user) {
      setNombreYApellido(user.nombreYApellido)
      setUsername(user.username)
      setPass(user.contrasenia) // Suponiendo que user tiene un campo contrasenia
    }
  }, [user])

 
  const handleSubmit = async (event) => {
    console.log("entre al handlesubmit")
    event.preventDefault()
    
    const usuarioModificado = new UsuarioActualizado()
      
      usuarioModificado.nombreYApellido = nombreYApellido
      usuarioModificado.username = username
      usuarioModificado.pass = pass
      

      
        try {
          console.log("estamos enviando este usuario",usuarioModificado)
          const usuarioNuevo = await usuarioService.actualizarUsuario( usuarioModificado)
          console.log("nos trae el nuevo usuario",usuarioNuevo)
        } catch (error) {
          console.error('Error al actualizar usuario', error.message)
          setError('Error al actualizar usuario. Por favor, verifica tus datos.')
        }
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }
  const handleOpenModal = () => {
    setOpenModal(true)
  }

 

  return (

    <Box className={classes.root} component="form"
      sx={{
        'campo': { m: 5, width: '25ch' },
         display:"grid"
      }}
      noValidate
      autoComplete="off">

      <CardContent >        
          <Grid container justifyContent="center">
            <Avatar className={classes.avatar}>              
            </Avatar>
          </Grid>
        
      </CardContent>
      <form onSubmit={handleSubmit}>

        <Grid container >
          <Grid sx={{ display: 'flex', flexDirection: 'column', width:"100%" }} >

            <TextField
              className={classes.campo}
              required
              id="outlined-required"
              label="Nombre del usuario"
              //defaultValue={user.nombreYApellido}
              value={nombreYApellido}
              onChange={(event) => setNombreYApellido(event.target.value)}
              style={{ margin: '10px', padding: '5px 10px' }}
            />
            <TextField
              className={classes.campo}
              required
              id="outlined-required"
              label="Username"
              //defaultValue={user.username}
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              style={{ margin: '10px', padding: '5px 10px' }}
            />
            <TextField
              className={classes.campo}
              required
              id="outlined-required"
              label="contrasenia"
              //defaultValue={user.contrasenia}
              value={pass}
              onChange={(event) => setPass(event.target.value)}
              style={{ margin: '10px', padding: '5px 10px' }}
            />


            <Typography variant="h6" className={classes.texto} style={{ margin: '1', padding: '5px 10px' }} >
              Saldo: $ {saldo}
            </Typography>
            {/*
            <Button variant="contained" color="primary" fullWidth onClick={() => handleRoomClick()} >
              PRUEBA
            </Button>
            */}
          </Grid>

        </Grid>
        <Button variant="contained" color="primary" fullWidth type="submit" sx={{ marginTop: 1 }} >
          Guardar Cambios
        </Button>
      </form>
      <Button variant="contained" color="primary" fullWidth sx={{ marginTop: 1 }} onClick={handleOpenModal}>
        Agregar Saldo
      </Button>
      <CreditView openModal={openModal} cerrarModal={handleCloseModal}></CreditView>
    </Box>

  )
}
export default UserProfile
