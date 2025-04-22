import { useState } from 'react'
import {
  InputLabel,
  MenuItem,
  FormControl,
  Box,
  Select,
  Button,
} from '@mui/material'
import { FitTest, GGC, MGC, MMC, Navbar } from './components'
import { RandomNumbers } from './components/RandomNumbers'
import Dialog from '@mui/material/Dialog'
import { NormalRandomNumbers } from './components/NormalRandomNumbers'
import { Calculator } from './components/Calculator'

export const MainApp = () => {
  const [model, setModel] = useState('mmc')
  const [showCalc, setShowCalc] = useState(false);
  const [open, setOpen] = useState(false)


  return (
    <>
      <div style={{ padding: '40px', background:'rgb(13, 17, 23)' }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#00ff9d',
            color: '#000',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#00e68c',
            },
          }}
          onClick={() => setShowCalc(true)}
        >
          Open Calculator
        </Button>

        <Calculator open={showCalc} onClose={() => setShowCalc(false)} />
      </div>
      <div
        className="main-container"
        style={{
          padding: '30px',
          background: '#0d1117', // Dark Web3 background
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          fontFamily: 'Segoe UI, Arial, sans-serif',
          color: '#f5f5f5',
        }}
      >
        <Box
          sx={{
            margin: '20px 0px',
            backgroundColor: '#161b22', // Slightly lighter dark card
            padding: '24px',
            borderRadius: '14px',
            boxShadow: '0 6px 20px rgba(0,255,157,0.1)', // Neon green glow
            width: 'fit-content',
          }}
        >
          <FormControl sx={{ minWidth: 220 }}>
            <InputLabel
              id="demo-simple-select-autowidth-label"
              sx={{ color: '#00ff9d', fontWeight: 'bold' }}
            >
              Select Model
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={model}
              onChange={(event) => setModel(event.target.value)}
              autoWidth
              label="Select Model"
              sx={{
                backgroundColor: '#21262d',
                color: '#f5f5f5',
                borderRadius: '10px',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: '#30363d',
                },
                '& .MuiSelect-icon': {
                  color: '#00ff9d',
                },
              }}
            >
              <MenuItem value="mmc">M/M/C</MenuItem>
              <MenuItem value="mgc">M/G/C</MenuItem>
              <MenuItem value="ggc">G/G/C</MenuItem>
              <MenuItem value="fit test">Goodness of fit test</MenuItem>
              <MenuItem value="uniform">Uniform random numbers</MenuItem>
              <MenuItem value="normal">Normal random numbers</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <div
          style={{
            marginTop: '20px',
            width: '100%',
            maxWidth: '850px',
            background: '#161b22',
            padding: '24px',
            borderRadius: '14px',
            boxShadow: '0 8px 24px rgba(0,191,255,0.15)', // Electric blue shadow
          }}
        >
          {model === 'mmc' ? (
            <MMC />
          ) : model === 'mgc' ? (
            <MGC />
          ) : model === 'ggc' ? (
            <GGC />
          ) : model === 'fit test m' ? (
            <ChiSquareTest />
          ) : model === 'fit test' ? (
            <FitTest />
          ) : model === 'uniform' ? (
            <RandomNumbers />
          ) : model === 'normal' ? (
            <NormalRandomNumbers />
          ) : null}
        </div>
      </div>
    </>
  )
}
