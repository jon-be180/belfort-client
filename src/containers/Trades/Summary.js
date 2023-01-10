import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function AccountSummary(data) {

  const classes = useStyles();

  const currencyFormatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
  });

  return (
    <Grid container className={classes.root} justify="center" spacing={2}>
      <Grid item xs={3}>
        <Card className={classes.root}>
          <CardContent>
            <Typography variant="body2" component="p">
              Size: { currencyFormatter.format(data.accountSize) }
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={3}>
        <Card className={classes.root}>
          <CardContent>
            <Typography variant="body2" component="p">
              Exposure: { data.exposure }%
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={3}>
        <Card className={classes.root}>
          <CardContent>
            <Typography variant="body2" component="p">
              Years P&L: { data.pnl }%
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={3}>
        <Card className={classes.root}>
          <CardContent>
            <Typography variant="body2" component="p">
              Years Win Ratio: { data.winRatio }%
            </Typography>
          </CardContent>
      </Card>
      </Grid>
    </Grid>
  );
}

AccountSummary.propTypes = {
  exposure: PropTypes.number.isRequired,
  pnl: PropTypes.number.isRequired,
  winRatio: PropTypes.number.isRequired,
}
