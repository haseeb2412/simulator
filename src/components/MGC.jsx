import {
  Paper,
  TextField,
  Box,
  Grid,
  Typography,
  // MenuItem,
  // Select,
  // InputLabel,
  // FormControl,
  Button,
} from '@mui/material'
import { useRef, useState } from 'react'

export const MGC = () => {
  // input controlling states
  const [numberOfServers, setNumberOfServers] = useState(0)
  const [lambda, setLambda] = useState(0)
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const [update, setUpdate] = useState(false)

  const p = useRef(0)
  const l = useRef(0)
  const lq = useRef(0)
  const w = useRef(0)
  const wq = useRef(0)
  const miu = useRef(0)

  const calculateResult = (e) => {
    e.preventDefault()

    let newMiu = 1 / ((max + min) / 2)
    let varianceOfServiceTime = (max - min) ** 2 / 12

    const ro = lambda / (numberOfServers * newMiu)

    const lqueue =
      (lambda ** 2 * varianceOfServiceTime ** 2 + ro ** 2) / (2 * (1 - ro))

    miu.current = newMiu
    p.current = ro
    lq.current = lqueue
    wq.current = lqueue / lambda
    w.current = lqueue / lambda + 1 / newMiu
    l.current = (lqueue / lambda + 1 / newMiu) * lambda

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
                Arrival mean of exponential distribution:
              </Typography>
              <TextField
                id="filled-number"
                label="λ"
                type="number"
                sx={{ margin: '10px 0', minWidth: '80%' }}
                value={lambda === 0 ? null : lambda}
                onChange={(e) => setLambda(Number(e.target.value))}
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
                Minimum uniform distribution:
              </Typography>
              <TextField
                id="filled-number"
                label="Min"
                type="number"
                sx={{ margin: '10px 0', minWidth: '80%' }}
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
                Maximum uniform distribution:
              </Typography>
              <TextField
                id="filled-number"
                label="Max"
                type="number"
                sx={{ margin: '10px 0', minWidth: '80%' }}
                value={max === 0 ? null : max}
                onChange={(e) => setMax(Number(e.target.value))}
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
          {/* <Grid
            item
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
              </Paper>
            </Box>
          </Grid>
          <Grid
            item
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
                <Typography variant="h3">{miu.current}</Typography>
              </Paper>
            </Box>
          </Grid> */}
          <Grid
            item
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
              </Paper>
            </Box>
          </Grid>
          <Grid
            item
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
