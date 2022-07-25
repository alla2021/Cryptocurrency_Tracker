import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {useState} from "react";

 const SubscribeForm = () => {
     const [email, setEmail] =useState('')

     async function subscriberUser(e: React.FormEvent<HTMLFormElement>) {
         e.preventDefault();

         const response = await fetch("http://localhost:5000/subscribe", {
             method: "POST",
             headers: {
                 "Content-Type": "application/json",
             },
             body: JSON.stringify({
                 email,
             }),
         });

         const data = await response.json();
         console.log(data);
     }

    return(
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Sign an email to receive information on changing the course
                        </Typography>
                        <Box component="form" noValidate  sx={{ mt: 1 }}  onSubmit={subscriberUser}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <Button
                                fullWidth
                                variant="contained"
                                type='submit'
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Subscribe
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
    )
 }
 export default SubscribeForm;
