import React from 'react'
import '../App';
import AfricaImage from '../assets/Africa_map.png';
import AmericasImage from '../assets/americas.png';
import AsiaImage from '../assets/asia.png';
import EuropeImage from '../assets/europe.png';
import OceaniaImage from '../assets/ocenia.png';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';


const RegionPicker = ({onRegionPickHandler}) => {
  return (
    <div>
     <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Box sx={{ bgcolor: '#fff',
         minheight: '90vh',
         display:"flex",
         alignItems:"center",
         justifyContent:"center",
         width:"100%",
         margin:"10px 0"
          }}
          >
         <Grid container spacing={1} columns={12}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <div className="region-container" onClick={()=>onRegionPickHandler('africa')}>
                    <img src={AfricaImage} alt="#" />
                    <Typography variant="h4">Africa</Typography>
                </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <div className="region-container" onClick={()=>onRegionPickHandler('americas')}>
                    <img src={AmericasImage} alt="#" />
                    <Typography variant="h4">Americas</Typography>
                </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <div className="region-container" onClick={()=>onRegionPickHandler('europe')}>
                    <img src={EuropeImage} alt="#" />
                    <Typography variant="h4">Europe</Typography>
                </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <div className="region-container" onClick={()=>onRegionPickHandler('asia')}>
                    <img src={AsiaImage} alt="#" />
                    <Typography variant="h4">Asia</Typography>
                </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <div className="region-container" onClick={()=>onRegionPickHandler('oceania')}>
                    <img src={OceaniaImage} alt="#" />
                    <Typography variant="h4">Oceania</Typography>
                </div>
            </Grid>
         </Grid>
          </Box>
      </Container>
    </React.Fragment>
    </div>
  )
}

export default RegionPicker