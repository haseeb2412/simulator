import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";

const theme = createTheme();
export default function ChiSquareTest() {
  const [binsInput, setBinsInput] = useState("");
  const [observedFrequenciesInput, setObservedFrequenciesInput] = useState("");
  const [distributionType, setDistributionType] = useState("poisson");
  const [chiSquareResult, setChiSquareResult] = useState(null);
  const [isHypothesisAccepted, setIsHypothesisAccepted] = useState(false);
  const [criticalValue, setCriticalValue] = useState(null);

  const factorial = (n) => {
    if (n === 0 || n === 1) {
      return 1;
    } else {
      return n * factorial(n - 1);
    }
  };

  const handleSubmit = (event) => {
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
          (Math.exp(-lambda) * Math.pow(lambda, i)) / factorial(i);
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
    const criticalValue =
      chiSquareCriticalValues[significanceLevel][degreesOfFreedom];
    setCriticalValue(criticalValue);
    setIsHypothesisAccepted(chiSquareResult <= criticalValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main">
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 4 }}>
          <Grid container flexDirection="row" justifyContent="space-evenly">
            <Grid md={4}>
              <TextField
                type="text"
                label="Bins (comma-separated)"
                fullWidth
                value={binsInput}
                onChange={(e) => setBinsInput(e.target.value)}
              />
            </Grid>
            <Grid md={4}>
              <TextField
                type="text"
                label="frequency (comma-separated)"
                fullWidth
                value={observedFrequenciesInput}
                onChange={(e) => setObservedFrequenciesInput(e.target.value)}
              />
            </Grid>
            <Grid item>
              <Typography sx={{ fontSize: 18, fontWeight: "bold" }}>
                Distribution Type
              </Typography>
              <TextField
                select
                fullWidth
                value={distributionType}
                onChange={(e) => setDistributionType(e.target.value)}
              >
                <MenuItem value="poisson">Poisson Distribution</MenuItem>
                <MenuItem value="uniform">Uniform Distribution</MenuItem>
              </TextField>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            sx={{ mt: 3, mb: 2 }}
          >
            Calculate
          </Button>
          {chiSquareResult !== null && (
            <Box marginTop={2}>
              <Typography variant="h5" gutterBottom>
                Chi-Square Result:
              </Typography>
              <Typography gutterBottom>
                Chi-Square Value: {chiSquareResult.toFixed(2)}
              </Typography>
              <Typography gutterBottom>Significance Level: 0.05</Typography>
              <Typography gutterBottom>
                Critical Value: {criticalValue}
              </Typography>
              <Typography gutterBottom>
                Hypothesis Accepted: {isHypothesisAccepted ? "Yes" : "No"}
              </Typography>
              <Typography gutterBottom>
                Interpretation:{" "}
                {isHypothesisAccepted
                  ? "The observed data fits the expected distribution."
                  : "The observed data does not fit the expected distribution."}
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}