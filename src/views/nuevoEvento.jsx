import { Button, Container, TextField } from "@mui/material"

const NuevoEvento = () => {

    return (

        <Container className="main" style={{ marginBottom: "5rem" }} >
            <form >
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
                    fullWidth
                    margin="normal"
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