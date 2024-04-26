import { Container, Grid } from "@mui/material"
import { Link } from "react-router-dom"
import EventCard from "src/components/EventCard"

const Eventos = () => {



    return (
        <Container className="main" style={{ marginBottom: "5rem" }}>
            <Grid container spacing={3} justifyContent="center">
                <EventCard component={Link} to={"/eventDetails"} />
            </Grid>
        </Container>
    )
}

export default Eventos
