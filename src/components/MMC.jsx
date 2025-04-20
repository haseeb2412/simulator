import {
  Paper,
  TextField,
  Box,
  Grid,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
} from '@mui/material'
import { useRef, useState } from 'react'
// import { factorialize } from '../utils/factorialize'

export const MMC = () => {
  // input controlling states
  const [numberOfServers, setNumberOfServers] = useState(0)
  const [lambda, setLambda] = useState(0)
  const [arrivalRate, setArrivalRate] = useState('')
  const [miu, setMiu] = useState(0)
  const [serviceRate, setServiceRate] = useState('')
  const [showResult, setShowResult] = useState(false)

  const [update, setUpdate] = useState(false)

  const p = useRef(0)
  const l = useRef(0)
  const lq = useRef(0)
  const w = useRef(0)
  const wq = useRef(0)

  const calculateResult = (e) => {
    e.preventDefault()

    let newArrivalRate = arrivalRate
    let newServiceRate = serviceRate
    let newLambda = lambda
    let newMiu = miu

    if (arrivalRate === '' || serviceRate === '') {
      alert('you need to select rates for both arrival and service')
      return
    } else if (arrivalRate === 'Customer Per Day') {
      if (serviceRate === 'Customer Per Hour') {
        newArrivalRate = 'Customer Per Hour'
        newLambda = lambda * 24
      } else if (serviceRate === 'Customer Per Minute') {
        newArrivalRate = 'Customer Per Minute'
        newLambda = lambda * 24 * 60
      } else if (serviceRate === 'Customer Per Second') {
        newArrivalRate = 'Customer Per Second'
        newLambda = lambda * 24 * 60 * 60
      }
    } else if (arrivalRate === 'Customer Per Hour') {
      if (serviceRate === 'Customer Per Day') {
        newServiceRate = 'Customer Per Hour'
        newMiu = miu * 24
      } else if (serviceRate === 'Customer Per Minute') {
        newArrivalRate = 'Customer Per Minute'
        newLambda = lambda * 60
      } else if (serviceRate === 'Customer Per Second') {
        newArrivalRate = 'Customer Per Second'
        newLambda = lambda * 60 * 60
      }
    } else if (arrivalRate === 'Customer Per Minute') {
      if (serviceRate === 'Customer Per Day') {
        newServiceRate = 'Customer Per Minute'
        newMiu = miu * 24 * 60
      } else if (serviceRate === 'Customer Per Hour') {
        newServiceRate = 'Customer Per Minute'
        newMiu = miu * 60
      } else if (serviceRate === 'Customer Per Second') {
        newArrivalRate = 'Customer Per Second'
        newLambda = lambda * 60
      }
    } else if (arrivalRate === 'Customer Per Second') {
      if (serviceRate === 'Customer Per Day') {
        newServiceRate = 'Customer Per Second'
        newMiu = miu * 24 * 60 * 60
      } else if (serviceRate === 'Customer Per Hour') {
        newServiceRate = 'Customer Per Second'
        newMiu = miu * 60 * 60
      } else if (serviceRate === 'Customer Per Minute') {
        newServiceRate = 'Customer Per Second'
        newMiu = miu * 60
      }
    }

    setArrivalRate(newArrivalRate)
    setServiceRate(newServiceRate)
    setLambda(newLambda)
    setMiu(newMiu)

    const ro = newLambda / (numberOfServers * newMiu)

    p.current = ro
    lq.current = (ro * ro) / (1 - ro)
    wq.current = (ro * ro) / (1 - ro) / newLambda
    w.current = (ro * ro) / (1 - ro) / newLambda + 1 / newMiu
    l.current = ((ro * ro) / (1 - ro) / newLambda + 1 / newMiu) * newLambda

    console.log(update)
    setUpdate((prev) => !prev)
    setShowResult(true)
  }

  return (
    <div className="model-container">
      <Grid container spacing={2}>
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
                Number of Servers (C):
              </Typography>
              <TextField
                sx={{ margin: '10px 0', minWidth: '80%' }}
                id="filled-number"
                label="Number Of Servers"
                type="number"
                value={numberOfServers === 0 ? null : numberOfServers}
                onChange={(e) => setNumberOfServers(Number(e.target.value))}
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
              height: '30vh',
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
                Arrival:
              </Typography>
              <TextField
                id="filled-number"
                label="λ"
                type="number"
                sx={{ margin: '10px 0', minWidth: '80%' }}
                value={lambda === 0 ? null : lambda}
                onChange={(e) => setLambda(Number(e.target.value))}
              />
              <FormControl sx={{ m: 1, minWidth: '80%' }}>
                <InputLabel id="demo-simple-select-autowidth-label">
                  Rate
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  autoWidth
                  label="Rate"
                  value={arrivalRate === 0 ? null : arrivalRate}
                  onChange={(e) => setArrivalRate(e.target.value)}
                >
                  <MenuItem value="">
                    <em>No Unit</em>
                  </MenuItem>
                  <MenuItem value={'Customer Per Day'}>
                    Customer Per Day
                  </MenuItem>
                  <MenuItem value={'Customer Per Hour'}>
                    Customer Per Hour
                  </MenuItem>
                  <MenuItem value={'Customer Per Minute'}>
                    Customer Per Minute
                  </MenuItem>
                  <MenuItem value={'Customer Per Second'}>
                    Customer Per Second
                  </MenuItem>
                </Select>
              </FormControl>
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
              height: '30vh',
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
                Service:
              </Typography>
              <TextField
                id="filled-number"
                label="μ"
                type="number"
                sx={{ margin: '10px 0', minWidth: '80%' }}
                value={miu === 0 ? null : miu}
                onChange={(e) => setMiu(Number(e.target.value))}
              />
              <FormControl sx={{ m: 1, minWidth: '80%' }}>
                <InputLabel id="demo-simple-select-autowidth-label">
                  Rate
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={serviceRate === 0 ? null : serviceRate}
                  onChange={(e) => setServiceRate(e.target.value)}
                  autoWidth
                  label="Rate"
                >
                  <MenuItem value="">
                    <em>No Unit</em>
                  </MenuItem>
                  <MenuItem value={'Customer Per Day'}>
                    Customer Per Day
                  </MenuItem>
                  <MenuItem value={'Customer Per Hour'}>
                    Customer Per Hour
                  </MenuItem>
                  <MenuItem value={'Customer Per Minute'}>
                    Customer Per Minute
                  </MenuItem>
                  <MenuItem value={'Customer Per Second'}>
                    Customer Per Second
                  </MenuItem>
                </Select>
              </FormControl>
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
            // sx={{ padding: '20px' }}
            xs={12}
            md={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              sx={{
                width: '100%',
                height: '30vh',
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
                <Typography variant="h5">Arrivals</Typography>
                <Typography variant="h3">{lambda}</Typography>
                <Typography variant="h5">{arrivalRate}</Typography>
              </Paper>
            </Box>
          </Grid>
          <Grid
            item
            // sx={{ padding: '20px' }}
            xs={12}
            md={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              sx={{
                width: '100%',
                height: '30vh',
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
                <Typography variant="h5">Service</Typography>
                <Typography variant="h3">{miu}</Typography>
                <Typography variant="h5">{serviceRate}</Typography>
              </Paper>
            </Box>
          </Grid>
          <Grid
            item
            // sx={{ padding: '20px' }}
            xs={12}
            md={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              sx={{
                width: '100%',
                height: '30vh',
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
                  average Customers in system ( L )
                </Typography>
                <Typography variant="h3" sx={{ textAlign: 'center' }}>
                  {l.current.toFixed(5)}
                </Typography>
                <Typography variant="h6" sx={{ textAlign: 'center' }}>
                  Average number of customers in the system
                </Typography>
                {/* <Typography variant="p">L = 2.0432</Typography> */}
              </Paper>
            </Box>
          </Grid>
          <Grid
            item
            // sx={{ padding: '20px' }}
            xs={12}
            md={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              sx={{
                width: '100%',
                height: '30vh',
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
                  average Customers in queue ( Lq )
                </Typography>
                <Typography variant="h3" sx={{ textAlign: 'center' }}>
                  {lq.current.toFixed(5)}
                </Typography>
                <Typography variant="h6" sx={{ textAlign: 'center' }}>
                  Average number of customers in the queuq
                </Typography>
              </Paper>
            </Box>
          </Grid>
          <Grid
            item
            // sx={{ padding: '20px' }}
            xs={12}
            md={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              sx={{
                width: '100%',
                height: '30vh',
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
                <Typography variant="h6">
                  average wait in system ( W )
                </Typography>
                <Typography variant="h3">{w.current.toFixed(5)}</Typography>
                <Typography variant="h6">
                  Average time customer waits in the system
                </Typography>
              </Paper>
            </Box>
          </Grid>
          <Grid
            item
            // sx={{ padding: '20px' }}
            xs={12}
            md={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              sx={{
                width: '100%',
                height: '30vh',
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
                <Typography variant="h6">
                  average wait in queue ( Wq )
                </Typography>
                <Typography variant="h3">{wq.current.toFixed(5)}</Typography>
                <Typography variant="h6">
                  Average time customer waits in the queue
                </Typography>
              </Paper>
            </Box>
          </Grid>
          <Grid
            item
            // sx={{ padding: '20px' }}
            xs={12}
            md={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              sx={{
                width: '100%',
                height: '30vh',
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
                <Typography variant="h6">
                  Server Utilization Rate( P )
                </Typography>
                <Typography variant="h3">{p.current}</Typography>
                <Typography variant="h6">
                  Percentage of time server is utilized
                </Typography>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      ) : null}
    </div>
  )
}
