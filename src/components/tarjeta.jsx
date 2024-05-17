//import React from 'react'

import TextField from '@mui/material/TextField'

import  { useState } from 'react'
import {  InputAdornment } from '@material-ui/core'



const CreditCard = () => {
    const [cardNumber, setCardNumber] = useState('') 
    const [cardholderName, setCardholderName] = useState('') 
    const [expiryMonth, setExpiryMonth] = useState('') 
    const [expiryYear, setExpiryYear] = useState('') 
  
    const handleCardNumberChange = (event) => {
      // Implement Luhn's algorithm validation here
      setCardNumber(event.target.value) 
    } 
  
    // Implement validation and formatting for other fields
  

  
    return (
      <div className="credit-card">
        <TextField
          label="Card Number"
          variant="outlined"
          value={cardΝumber}
          onChange={handleCardNumberChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {renderIcon()}
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Cardholder Name"
          variant="outlined"
          value={cardholderName}
          onChange={(event) => setCardholderName(event.target.value)}
        />
        <div className="expiry">
  <TextField
            label="MM"
            variant="outlined"
            type="number"
            value={expiryMonth}
            onChange={(event) => setExpiryMonth(event.target.value)}
            InputLabelProps={{ shrink: true }}
            inputProps={{ maxLength: 2 }}
          />
          <TextField
            label="YYYY"
            variant="outlined"
            type="number"
            value={expiryYear}
            onChange={(event) => setExpiryYear(event.target.value)}
            InputLabelProps={{ shrink: true }}
            inputProps={{ maxLength: 4 }}
          />
        </div>
        <TextField
          label="CVV"
          variant="outlined"
          type="password"
          value={cvv} // Don't store CVV, handle securely
          onChange={() => {}} // Prevent input for CVV
        />
      </div>
    ) 
  } 
  
  export default CreditCard 