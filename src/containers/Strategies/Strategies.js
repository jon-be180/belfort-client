import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import StrategiesAdd from './Add';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: '25px',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '15%',
    flexShrink: 0,
  },
  heading_sm: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '10%',
    flexShrink: 0,
  },
  heading_lg: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '20%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  column: {
    flexBasis: '33.33%',
  },
  none: {
    padding: '25px',
  }
}));

export default function Strategies() {

  const classes = useStyles();

  const strategies = [
    {
      id: 1,
      name: 'Daily Baseline v1',
      jsonLaunchSettings: { strategy: 'MFI', pair: 'BTCUSD' },
      link: 'https://gekim.be180.co.uk:2004'
    },
    {
      id: 2,
      name: 'Daily baseline v2',
      jsonLaunchSettings: { strategy: 'MA20', pair: 'ETHUSD' },
      link: 'https://gekim.be180.co.uk:2004'
    },
  ];

  return (
    <>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
      >
        {strategies.map((value, index) => {
          return (
            <Card className={classes.root}>
              <CardContent>
                <Typography className={classes.heading_sm}>{value.name}</Typography>
                <Typography className={classes.heading_sm}>{value.status}</Typography>

              </CardContent>
              <CardActions>
                <Button variant="contained" color="secondary">
                  Stop
                </Button>
                <a href={value.link} target="_blank" rel="noopener noreferrer">
                  <Button variant="contained" color="primary">
                    View
                  </Button>
                </a>
              </CardActions>
            </Card>
          )
        })}
      </Grid>
      <StrategiesAdd />
    </>
  );

}