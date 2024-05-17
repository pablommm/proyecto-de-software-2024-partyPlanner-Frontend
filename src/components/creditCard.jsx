import CardActions from '@mui/joy/CardActions'
import CardContent from '@mui/joy/CardContent'
import Checkbox from '@mui/joy/Checkbox'
import Divider from '@mui/joy/Divider'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Input from '@mui/joy/Input'
import Typography from '@mui/joy/Typography'
import Button from '@mui/joy/Button'
import InfoOutlined from '@mui/icons-material/InfoOutlined'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import { Modal, Box } from '@mui/material'
import PropTypes from 'prop-types'

const CreditCardModal = ({ openModal, cerrarModal }) => {
  // ... other component logic (if needed)

  return (
    <Modal
      open={openModal} // Ensure `openModal` is a boolean value
      onClose={cerrarModal}
      aria-labelledby="modal-modal-title" // Optional: Add a title for accessibility
      aria-describedby="modal-modal-description" // Optional: Add a description for accessibility
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        backgroundColor: 'white',
        padding: '2rem',
      }}>
        <Typography variant="h6" align="center" gutterBottom>
          Add new card
        </Typography>
        <Divider inset="none" />
        <CardContent
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))',
            gap: 1.5,
          }}
        >
          <FormControl sx={{ gridColumn: '1/-1' }}>
            <FormLabel>Card number</FormLabel>
            <Input endDecorator={<CreditCardIcon />} />
          </FormControl>
          <FormControl>
            <FormLabel>Expiry date</FormLabel>
            <Input endDecorator={<CreditCardIcon />} />
          </FormControl>
          <FormControl>
            <FormLabel>CVC/CVV</FormLabel>
            <Input endDecorator={<InfoOutlined />} />
          </FormControl>
          <FormControl sx={{ gridColumn: '1/-1' }}>
            <FormLabel>Card holder name</FormLabel>
            <Input placeholder="Enter cardholder's full name" />
          </FormControl>
          <Checkbox label="Save card" sx={{ gridColumn: '1/-1', my: 1 }} />
          <CardActions sx={{ gridColumn: '1/-1' }}>
            <Button variant="solid" color="primary">
              Add card
            </Button>
          </CardActions>
        </CardContent>
      </Box>
    </Modal>
  )
}

CreditCardModal.propTypes = {
  openModal: PropTypes.bool.isRequired, // Make `openModal` required
  cerrarModal: PropTypes.func.isRequired, // Make `cerrarModal` required
}

export default CreditCardModal
