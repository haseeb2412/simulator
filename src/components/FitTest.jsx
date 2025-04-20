import {
  Paper,
  TextField,
  Box,
  Grid,
  Typography,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material'
import { useRef, useState } from 'react'

import {factorialize} from '../utils/factorialize'

export const FitTest = () => {
  // input controlling states
  const [binsInput, setBinsInput] = useState("");
  const [observedFrequenciesInput, setObservedFrequenciesInput] = useState("");
  const [distributionType, setDistributionType] = useState("poisson");
  const [chiSquareResult, setChiSquareResult] = useState(null);
  const [isHypothesisAccepted, setIsHypothesisAccepted] = useState(false);
  const [criticalValue, setCriticalValue] = useState(null);
  
  const significance = "0.05"

  const calculateResult = (event) => {
    event.preventDefault();

    if (!binsInput || !observedFrequenciesInput) {
      return;
    }
    const bins = binsInput.split(",").map((value) => parseInt(value.trim()));
    const observedFrequencies = observedFrequenciesInput
      .split(",")
      .map((value) => parseInt(value.trim()));

    if (observedFrequencies.length !== bins.length) {
      return;
    }
    const totalObserved = observedFrequencies.reduce(
      (total, value) => total + value,
      0
    );
    const MLE = bins.reduce(
      (acc, bin, index) => acc + bin * observedFrequencies[index],
      0
    );
    let expectedFrequencies = [];
    if (distributionType === "poisson") {
      const lambda = MLE / totalObserved;

      for (let i = 0; i < bins.length; i++) {
        const Probability =
          (Math.exp(-lambda) * Math.pow(lambda, i)) / factorialize(i);
        const expected = Probability * totalObserved;
        expectedFrequencies.push(expected);
      }
    } else if (distributionType === "uniform") {
      const expectedFrequency = totalObserved / bins.length;
      expectedFrequencies = Array(bins.length).fill(expectedFrequency);
    }

    let chiSquareResult = 0;
    for (let i = 0; i < bins.length; i++) {
      const observed = observedFrequencies[i];
      const expected = expectedFrequencies[i];
      chiSquareResult += Math.pow(observed - expected, 2) / expected;
    }
    console.log(chiSquareResult)
    setChiSquareResult(chiSquareResult);

    const degreesOfFreedom = bins.length - 1;
    const chiSquareCriticalValues = {
      0.05: {
        1: 3.841,
        2: 5.991,
        3: 7.815,
        4: 9.488,
        5: 11.07,
      },
    };
    const significanceLevel = 0.05;
    const newcriticalValue =
      chiSquareCriticalValues[significanceLevel][degreesOfFreedom];
    setCriticalValue(newcriticalValue);
    setIsHypothesisAccepted(chiSquareResult <= newcriticalValue);
  };

  return (
    <div className="model-container">
      <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
        <Grid
          item
          sx={{ padding: '20px' }}
          xs={12}
          md={6}
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
                Comma seperated Bins:
              </Typography>
              <TextField
                sx={{ margin: '10px 0', minWidth: '80%' }}
                id="filled-number"
                label="Bins"
                type="text"
                value={binsInput === '' ? null : binsInput}
                onChange={(e) => setBinsInput(e.target.value)}
              />
            </Paper>
          </Box>
        </Grid>
        <Grid
          item
          sx={{ padding: '20px' }}
          xs={12}
          md={6}
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
                Comma seperated Observed Frequencies:
              </Typography>
              <TextField
                sx={{ margin: '10px 0', minWidth: '80%' }}
                id="filled-number"
                label="Expected Frequencies"
                type="text"
                value={observedFrequenciesInput === '' ? null : observedFrequenciesInput}
                onChange={(e) => setObservedFrequenciesInput(e.target.value)}
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
              <Typography variant="h6">
                {' '}
                Select the distribution type{' '}
              </Typography>
              <FormControl sx={{ m: 1, minWidth: '80%' }}>
                <InputLabel id="demo-simple-select-autowidth-label">
                  Distribution
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  autoWidth
                  label="Distribution"
                  value={distributionType === '' ? null : distributionType}
                  onChange={(e) => setDistributionType(e.target.value)}
                >
                  <MenuItem value={'poisson'}>Poisson Distribution</MenuItem>
                  <MenuItem value={'uniform'}>Uniform Distribution</MenuItem>
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
      {chiSquareResult !== null ? (
        <Grid
          container
          spacing={2}
          sx={{ marginTop: '50px', justifyContent: 'center' }}
        >
          <Grid
            item
            xs={12}
            // md={6}
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
                  display: 'flex',
                  padding: '10px',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h3" sx={{ textAlign: 'center' }}>
                  Results
                </Typography>
                <Typography variant="h6" sx={{ textAlign: 'center' }}>
                  Chi Square Value: {chiSquareResult.toFixed(3)}
                </Typography>
                <Typography variant="h6" sx={{ textAlign: 'center' }}>
                  Significance Level: {significance}
                </Typography>
                <Typography variant="h6" sx={{ textAlign: 'center' }}>
                  Critical Value: {criticalValue}
                </Typography>
                <Typography variant="h6" sx={{ textAlign: 'center' }}>
                  Hypothesis : {isHypothesisAccepted ? `Accept null hypothesis, the given data follows the ${distributionType}` : `Reject null hypothesis, the given data does not follows the ${distribution}`}
                </Typography>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      ) : null}
    </div>
  )
}
