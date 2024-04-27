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

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  Box: {
    width: 200,
    height: 200,
  },

  CardContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', 
  },

  avatar: {
    width: 100,
    height: 100,    
    
    

  },
  userInfo: {
    marginLeft: theme.spacing(2),
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
    marginBottom: theme.spacing(1),
  },
  statIcon: {
    marginRight: theme.spacing(1),
  },
  statValue: {
    fontWeight: 'bold',
  },
  
}))

const UserProfile = () => {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      
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
        <Grid item className={classes.userInfo}>
              <Typography variant="h6"  className={classes.texto}>
                Nombre del usuario
              </Typography>
              <Typography variant="h6" className={classes.texto}>
                Username
              </Typography>
              <Typography variant="h6" className={classes.texto}>
                Rol
              </Typography>
              <Typography variant="h6" className={classes.texto}>
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
