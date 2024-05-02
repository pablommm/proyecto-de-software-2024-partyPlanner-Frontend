//import React from 'react'
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

//import Input from '@mui/material/Input'

//const ariaLabel = { 'aria-label': 'description' }

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

  return (
    
    <Box className={classes.root}  component="form"
    sx={{
      'campo': { m: 5, width: '25ch' },
    }}
    noValidate
    autoComplete="off">
      
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
              defaultValue=" pepito lopez"
              style={{ margin: '10px', padding: '5px 10px' }}
            />
            <TextField
              className={classes.campo}
              required
              id="outlined-required"
              label="Username"
              defaultValue="pLopez"
              style={{ margin: '10px', padding: '5px 10px' }}
            />
            <TextField  
              className={classes.campo}
              required
              id="outlined-required"
              label="Rol"
              defaultValue="Admin"
              style={{ margin: '10px', padding: '5px 10px' }}
            />
                                
            <Typography variant="h6" className={classes.texto} style={{ margin: '10px', padding: '5px 10px' }}>
              Saldo
            </Typography>

          </Grid>

      </Grid>
      <Button variant="contained" color="primary" fullWidth>
        Guardar Cambios
      </Button>
    
     
    </Box>
    
  )
}

export default UserProfile
