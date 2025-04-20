import { Paper, TextField, Box, Grid, Typography, Button } from '@mui/material'
import { useRef, useState } from 'react'

export const NormalRandomNumbers = () => {
  // input controlling states
  const [max, setMax] = useState(0)
  const [min, setMin] = useState(0)
  const [totalNumbers, setTotalNumbers] = useState(0)
  const [numbers, setNumbers] = useState([])
  const [sd, setSd] = useState(0)
 
  const [update, setUpdate] = useState(false)

  const [showResult, setShowResult] =useState(false)

  const calculateResult = (e) => {
    e.preventDefault()
    const arr = []

    for(let i = 0; i < totalNumbers; i++){
        arr.push(0)
    }

    const mean = (max + min) / 2

    setNumbers(() => {
        return arr.map(item => {
            return mean + (sd * Math.random())
        })
    })

    console.log(numbers)
    
    console.log(update)
    setUpdate((prev) => !prev)

    setShowResult(true)
  }

  return (
    <div className="model-container">
      <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
        <Grid
          item
          sx={{ padding: '20px' }}
          xs={12}
          md={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            sx={{
              width: '100%',
              height: '25vh',
            }}
          >
            <Paper
              elevation={5}
              sx={{
                borderRadius: '16px',
                backgroundColor: 'white',
                color: 'black',
                width: '100%',
                height: '100%',
                display: 'flex',
                padding: '10px',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6" sx={{ textAlign: 'center' }}>
                Normal Maximum Number
              </Typography>
              <TextField
                sx={{ margin: '10px 0', minWidth: '80%' }}
                id="filled-number"
                label="Unifom max"
                type="number"
                value={max === 0 ? null : max}
                onChange={(e) => setMax(Number(e.target.value))}
              />
            </Paper>
          </Box>
        </Grid>
        <Grid
          item
          sx={{ padding: '20px' }}
          xs={12}
          md={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            sx={{
              width: '100%',
              height: '25vh',
            }}
          >
            <Paper
              elevation={5}
              sx={{
                borderRadius: '16px',
                backgroundColor: 'white',
                color: 'black',
                width: '100%',
                height: '100%',
                display: 'flex',
                padding: '10px',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6" sx={{ textAlign: 'center' }}>
                Normal Minimum Number
              </Typography>
              <TextField
                sx={{ margin: '10px 0', minWidth: '80%' }}
                id="filled-number"
                label="Unifom min"
                type="number"
                value={min === 0 ? null : min}
                onChange={(e) => setMin(Number(e.target.value))}
              />
            </Paper>
          </Box>
        </Grid>
        <Grid
          item
          sx={{ padding: '20px' }}
          xs={12}
          md={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            sx={{
              width: '100%',
              height: '25vh',
            }}
          >
            <Paper
              elevation={5}
              sx={{
                borderRadius: '16px',
                backgroundColor: 'white',
                color: 'black',
                width: '100%',
                height: '100%',
                display: 'flex',
                padding: '10px',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6" sx={{ textAlign: 'center' }}>
                Total Numbers
              </Typography>
              <TextField
                sx={{ margin: '10px 0', minWidth: '80%' }}
                id="filled-number"
                label="Total Numbers"
                type="number"
                value={totalNumbers === 0 ? null : totalNumbers}
                onChange={(e) => setTotalNumbers(Number(e.target.value))}
              />
            </Paper>
          </Box>
        </Grid>
        <Grid
          item
          sx={{ padding: '20px' }}
          xs={12}
          md={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            sx={{
              width: '100%',
              height: '25vh',
            }}
          >
            <Paper
              elevation={5}
              sx={{
                borderRadius: '16px',
                backgroundColor: 'white',
                color: 'black',
                width: '100%',
                height: '100%',
                display: 'flex',
                padding: '10px',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6" sx={{ textAlign: 'center' }}>
                Normal Standard Deviation
              </Typography>
              <TextField
                sx={{ margin: '10px 0', minWidth: '80%' }}
                id="filled-number"
                label="Standard Deviation"
                type="number"
                value={sd === 0 ? null : sd}
                onChange={(e) => setSd(Number(e.target.value))}
              />
            </Paper>
          </Box>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        size="large"
        onClick={calculateResult}
        sx={{
          backgroundColor: '#2e3c56',
          color: '#ebebeb',
          transition: '0.2s',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          '&:hover': {
            backgroundColor: '#2e3c56',
            color: '#ebebeb',
            transform: 'scale(1.15) translateX(-50%)',
          },
        }}
      >
        Calculate
      </Button>
      {showResult ? (
        <Grid
          container
          spacing={2}
          sx={{ marginTop: '50px', justifyContent: 'center' }}
        >
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              sx={{
                width: '100%',
                // height: '30vh',
              }}
            >
              <Paper
                elevation={5}
                sx={{
                  borderRadius: '16px',
                  backgroundColor: '#2E3C56',
                  color: '#EBEBEB',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  padding: '10px',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h6" sx={{ textAlign: 'center' }}>
                  Random Numbers
                </Typography>
                <Typography variant="h3" sx={{ textAlign: 'center' }}>
                    {numbers.map((item, index) => {
                        return <span style={{margin: "4px"}}>{item.toFixed(2)} <br/></span>
                    })}
                </Typography>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      ) : null}
    </div>
  )
}
