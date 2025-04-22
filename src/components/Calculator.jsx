import React, { useState } from 'react'
import { Dialog, DialogContent, Button } from '@mui/material'

export const Calculator = ({ open, onClose }) => {
  const [input, setInput] = useState('')

  const handleClick = (value) => {
    if (value === 'C') {
      setInput('')
    } else if (value === '=') {
      try {
        // eslint-disable-next-line no-eval
        const result = eval(input)
        setInput(result.toString())
      } catch {
        setInput('Error')
      }
    } else {
      setInput((prev) => prev + value)
    }
  }

  const buttons = [
    '7',
    '8',
    '9',
    '/',
    '4',
    '5',
    '6',
    '*',
    '1',
    '2',
    '3',
    '-',
    '0',
    '.',
    'C',
    '+',
    '=',
  ]

  return (
    <Dialog open={open} onClose={onClose} >
      <DialogContent
        style={{
          backgroundColor: '#161b22',
          color: '#f5f5f5',
          fontFamily: 'Segoe UI',
          borderRadius: '10px',
        }}
      >
        <h1>Calculator</h1>
        <input
          type="text"
          value={input}
          readOnly
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '18px',
            backgroundColor: '#21262d',
            color: '#00ff9d',
            border: 'none',
            borderRadius: '6px',
            marginBottom: '16px',
          }}
        />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 60px)',
            gap: '10px',
            justifyContent: 'center',
          }}
        >
          {buttons.map((btn, i) => (
            <button
              key={i}
              onClick={() => handleClick(btn)}
              style={{
                padding: '10px',
                fontSize: '16px',
                backgroundColor: '#00ff9d',
                color: '#000',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              {btn}
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
