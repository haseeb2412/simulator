import { Button } from '@mui/material'
import React from 'react'

export const Home = ({setShowHome}) => {
  return (
    <div style={{display: "flex", alignItems: "center", flexDirection: "column", width: "100%", height: "auto"}}>
        <h1 style={{margin: "16px 0"}}>Group Members:</h1>
        <div style={{display: "flex", justifyContent: "center", flexWrap: "wrap", width: "90%"}}>
            <h2 style={{textAlign: "center", width: "35%", margin: "10px 0"}}>Muhammad Muzammil Zia</h2>
            <h2 style={{textAlign: "center", width: "35%", margin: "10px 0"}}>Owais Ahsen</h2>
            <h2 style={{textAlign: "center", width: "35%", margin: "10px 0"}}>Askari Zaidi</h2>
            <h2 style={{textAlign: "center", width: "35%", margin: "10px 0"}}>Bilal Hussain Bangash</h2>
        </div>
        <h2 style={{margin: "16px 0"}}>Project Submitted to: Miss Shaista Raees</h2>
        <h3 style={{margin: "16px 0"}}>This project is queueing model, we have implemented multiple queueing models which include mmc, mgc, ggc and chisquare goodness of fit test</h3>
        <Button
        variant="contained"
        size="large"
        onClick={() => setShowHome(false)}
        sx={{
        margin: "16px 0",
          backgroundColor: '#2e3c56',
          color: '#ebebeb',
          transition: '0.2s',
          '&:hover': {
            backgroundColor: '#2e3c56',
            color: '#ebebeb',
            transform: 'scale(1.15)',
          },
        }}
      >
        Go to App
      </Button>
    </div>
  )
}
