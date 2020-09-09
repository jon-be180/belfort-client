import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import KeyIcon from '@material-ui/icons/VpnKey';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
    root: {
       '& .MuiTextField-root': {
          margin: theme.spacing(2),
       },
    }
  }));


export default function Settings() {

  const classes = useStyles();

    const exchanges = [
    {
      value: 'bitfinex',
      label: 'Bitfinex'
    },
    {
      value: 'bitmex',
      label: 'Bitmex'
    },
    {
      value: 'buybit',
      label: 'Buybit'
    },
  ];
  const [exchange] = React.useState('bitfinex');

  const handleChange = () => {

  };

  return (
    <>
    <Typography>
    Settings form here, api info account alias, default management strategy
    </Typography>
    <form className={classes.root} autoComplete="off">
      <div>
        <Typography>Account Alias:</Typography>
          <TextField
            id="account-alias"
            label="Alias"
            value=""
            onChange={handleChange}
            helperText="Enter your account alias here, this will be used when referring to trades etc, you can have multiple accounts per exchange"
          >
          </TextField>

          <TextField
            id="account-exchange"
            select
            label="Exchange"
            value={exchange}
            onChange={handleChange}
            helperText="Select the exchange this account uses"
          >
            {exchanges.map((option) => (
              <MenuItem key={option.value} value={option.value}>
               {option.label}
              </MenuItem>
            ))}
          </TextField>

      </div>
     <Divider/>
      <div>
      <Typography>API Details:</Typography>
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item>
          <KeyIcon />
        </Grid>
        <Grid item>
          <TextField
            id="api-key"
            label="API Key"
            value=""
            onChange={handleChange}
            helperText="Enter your exchange's API key here"
          >
          </TextField>
        </Grid>
        <Grid item>
          <KeyIcon />
        </Grid>
        <Grid item>
          <TextField
            id="secret-key"
            label="Secret"
            value=""
            onChange={handleChange}
            helperText="Enter your exchange's Secret key here"
          >
          </TextField>
        </Grid>
      </Grid>
    </div>
    <div>

    </div>
    </form>
    </>
  );
  
}
