import { Paper, TextField, Box, Grid, Typography, Button } from '@mui/material'
import { useRef, useState } from 'react'

export const GGC = () => {
  // input controlling states
  const [numberOfServers, setNumberOfServers] = useState(0)
  const [lambda, setLambda] = useState(0)
  const [arrivalVariance, setArrivalVariance] = useState(0)
  const [miu, setMiu] = useState(0)
  const [serviceVariance, setServiceVariance] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const [update, setUpdate] = useState(false)

  const p = useRef(0)
  const l = useRef(0)
  const lq = useRef(0)
  const w = useRef(0)
  const wq = useRef(0)

  const calculateResult = (e) => {
    e.preventDefault()

    const ca = arrivalVariance / (1 / lambda) ** 2
    const cs = serviceVariance / (1 / miu) ** 2

    const ro = lambda / (numberOfServers * miu)

    const lqueue =
      (ro ** 2 * (1 + cs) * (ca + ro ** 2 * cs)) /
      (2 * (1 - ro) * (1 + ro ** 2 * cs))

    p.current = ro
    lq.current = lqueue
    wq.current = lqueue / lambda
    w.current = lqueue / lambda + 1 / miu
    l.current = (lqueue / lambda + 1 / miu) * lambda

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
              height: '42vh',
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
              <Typography variant="h6" sx={{ textAlign: 'center' }}>
                Arrival variance of exponential distribution:
              </Typography>
              <TextField
                id="filled-number"
                label="variance"
                type="number"
                sx={{ margin: '10px 0', minWidth: '80%' }}
                value={arrivalVariance === 0 ? null : arrivalVariance}
                onChange={(e) => setArrivalVariance(Number(e.target.value))}
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
              height: '42vh',
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
                Service mean of normal distribution:
              </Typography>
              <TextField
                id="filled-number"
                label="λ"
                type="number"
                sx={{ margin: '10px 0', minWidth: '80%' }}
                value={miu === 0 ? null : miu}
                onChange={(e) => setMiu(Number(e.target.value))}
              />
              <Typography variant="h6" sx={{ textAlign: 'center' }}>
                Service variance of normal distribution:
              </Typography>
              <TextField
                id="filled-number"
                label="variance"
                type="number"
                sx={{ margin: '10px 0', minWidth: '80%' }}
                value={serviceVariance === 0 ? null : serviceVariance}
                onChange={(e) => setServiceVariance(Number(e.target.value))}
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
                <Typography variant="h3">{miu}</Typography>
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
