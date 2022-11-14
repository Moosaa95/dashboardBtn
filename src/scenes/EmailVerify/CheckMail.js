import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const card = (
  <React.Fragment>
    <CardContent sx={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
      <Typography sx={{ fontSize: 14 }} color="#000" gutterBottom>
      </Typography>
      <Typography variant="h5" component="div">
        Thank you for Registrating with us.
      </Typography>
      <Typography variant="body2">
        Please check your admin mail for verification code.
      </Typography>
    </CardContent>
  </React.Fragment>
);

export  function CheckMail() {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="">{card}</Card>
    </Box>
  );
}