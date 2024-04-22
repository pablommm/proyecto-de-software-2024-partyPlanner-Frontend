import { Button, Container, TextField, Typography } from "@mui/material"

const NuevoEvento = () => {

    return (
        <Container className="main" style={{ marginBottom: "5rem" }} >
            <Typography variant="h5" align="center" gutterBottom>
                Nuevo Evento
            </Typography>
            <form>
                <TextField
                    label="Nombre"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Lugar"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Fecha"
                    type="date"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    label="Hora"
                    type="time"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <div>
                    <Button type="submit" variant="contained" fullWidth>
                        Crear
                    </Button>
                </div>
            </form>
        </Container >
    )
}

export default NuevoEvento
