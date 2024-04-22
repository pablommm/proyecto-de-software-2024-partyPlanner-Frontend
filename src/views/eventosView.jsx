import { Container, Grid } from "@mui/material"
import EventCard from "src/components/EventCard"

const Eventos = () => {
    return (

        <Container className="main" style={{ marginBottom: "5rem" }}>
            <Grid container spacing={3} justifyContent="center">
                <EventCard />
            </Grid>

        </Container>

    )
}

export default Eventos
