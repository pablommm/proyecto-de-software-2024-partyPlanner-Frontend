
import PropTypes from 'prop-types'
import QRCode from 'qrcode.react'

const QRCodeComponent = ({ value, size }) => {
    return (
        <QRCode value={value} size={size} />
    )
}

QRCodeComponent.propTypes = {
    value: PropTypes.string.isRequired, 
    size: PropTypes.object.isRequired, 
}

QRCodeComponent.defaultProps = {
    size: 128, 
}

export default QRCodeComponent
