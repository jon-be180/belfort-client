import React, { useEffect, useState, Fragment } from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import dayjs from 'dayjs';

// redux
import { useSelector, useDispatch } from 'react-redux';

// actions
import { fetchInactiveTrades } from '../../actions/tradeActions';
import { fetchPrices } from '../../actions/tradeActions';
import { completeTrade } from '../../actions/tradeActions';
import { deleteTrade } from '../../actions/tradeActions';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';

// trades list
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import PanToolIcon from '@material-ui/icons/PanTool';
import DoneIcon from '@material-ui/icons/Done';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import { green } from '@material-ui/core/colors';
import { red } from '@material-ui/core/colors';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import EditTrigger from './EditTrigger.js';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: '100px' // add spacing for the add button above
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


export default function TradesList() {

  const classes = useStyles();

  const userId  = useSelector(state => state.user.id);
  const loading = useSelector(state => state.trade.isFetching);

  const dispatch = useDispatch();

  const trades = useSelector(state => state.trade.inactiveTrades);
  // use [] at the end to stop infinite loading every time the state changes
  // the [] is the list of variables for the function to run when it changes, however
  // when i use trades it still loops forever
  // also there's a warning about dispatch() but no specific "fix" is posible i think 
  useEffect(() => {
    dispatch(fetchInactiveTrades(userId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const doCompleteTrade = (tradeId) => (event) => {
    dispatch(completeTrade(tradeId, userId));
  };
  const doDeleteTrade = (tradeId) => (event) => {
    dispatch(deleteTrade(tradeId, userId));
  };

  // a global place for this instead?
  const currencyFormatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
  });
  const percentFormatter = new Intl.NumberFormat('en-US', {
      style: 'percent'
  });

  // attempt to get the live bitcoin price
  // @TODO store this more permanently so it only needs updating every hour or so
  const prices = useSelector(state => state.trade.prices);

  useEffect(() => {
    dispatch(fetchPrices());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // @TODO this doesnt trigger properly causing errors
  if(loading || prices === undefined) {
    return (
      <>
        <div className={classes.root}>
          <Typography>Closed Trades</Typography>
          <Card className={classes.none}>
            <Typography>Loading...</Typography>
          </Card>
        </div>
      </>
    );
  }

  return (
      <>
        <div className={classes.root}>
        <Typography>Closed Trades</Typography>
    { trades.map((value, index) => {
      return (
    <Accordion key={value.ID} expanded={expanded === 'panel'+value.ID} onChange={handleChange('panel'+value.ID)}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography className={classes.heading_sm}>{ value.pair }</Typography>
              <Typography className={classes.heading_sm}>
        { prices.BTCUSD < value.price 
         ?     <span style={{ color: red[500] }}><ArrowDownwardIcon/> -{ percentFormatter.format(1 - ( prices.BTCUSD / value.price)) }</span>
         :     <span style={{ color: green[500] }}><ArrowUpwardIcon/> +{ percentFormatter.format((prices.BTCUSD / value.price) - 1) }</span>
        }
              </Typography>
              <Typography className={classes.heading_sm}>{ value.size } { value.assetName }</Typography>
              <Typography className={classes.heading_sm}>{ value.margin }x { value.direction }</Typography>
              <Typography className={classes.heading_lg}>Opened: { dayjs(value.date).format("DD-MM-YYYY") } ({ dayjs().diff(value.date, 'days') } days ago)</Typography>
              <div className={classes.column}>
                Entry Price: {currencyFormatter.format(value.price)}
              </div>
              <div className={classes.column}>
                Current Price: { currencyFormatter.format(prices.BTCUSD) }
              </div>
            </AccordionSummary>
            <AccordionDetails>

        
     <Grid container xe={12} spacing={2}>


    <Grid item xe={12}>
    <Card className={classes.root}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              <ArrowUpwardIcon style={{ color: green[500] }}/>
              TP1 Sell
            </Typography>
            <Typography variant="h5" component="h2" style={{ textDecoration: 'line-through'}} >
              Target: $12,000
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Size: 1.5 BTC (50%)
            </Typography>
            <Typography variant="body2" component="p">
              <DoneIcon style={{ color: green[500] }}/>
              Complete
            </Typography>
          </CardContent>
    </Card>
    </Grid>


    <Grid item xe={12}>
    <Card className={classes.root}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item>
                <ArrowUpwardIcon style={{ color: green[500] }}/>
              </Grid>
              <Grid item xe={4}>
                TP2 Sell
              </Grid>
              <Grid item>
                <EditTrigger trade={value} />
              </Grid>
            </Grid>
            <Typography variant="h5" component="h2">
              Target: $12,500
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Size: 1.5 BTC (25%)
            </Typography>
            <Typography variant="body2" component="p">
              <HourglassEmptyIcon />
              Pending
            </Typography>
          </CardContent>
    </Card>
    </Grid>
    <Grid item xe={12}>
    <Card className={classes.root}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item>
                <ArrowUpwardIcon style={{ color: green[500] }}/>
              </Grid>
              <Grid item xe={4}>
                TP3 Sell
              </Grid>
              <Grid item>
                <EditTrigger trade={value} />
              </Grid>
            </Grid>
            <Typography variant="h5" component="h2">
              Target: $13,000
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Size: 1.5 BTC (25%)
            </Typography>
            <Typography variant="body2" component="p">
              <HourglassEmptyIcon />
              Pending
            </Typography>
          </CardContent>
    </Card>
    </Grid>
    <Grid item xe={12}>
    <Card className={classes.root}>
          <CardContent>

            <Grid container spacing={3}>
              <Grid item>
                <PanToolIcon style={{ color: red[500] }}/>
              </Grid>
              <Grid item xe={4}>
                Stop
              </Grid>
              <Grid item>
                <EditTrigger trade={value} />
              </Grid>
            </Grid>

            <Typography variant="h5" component="h2">
              Target: $8,000
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Size: 3 BTC (100%)
            </Typography>
            <Typography variant="body2" component="p">
              <HourglassEmptyIcon />
              Pending
            </Typography>
          </CardContent>
    </Card>
    </Grid>
    </Grid>       
        
    <Grid container xe={12} spacing={2}>
    <Card className={classes.root}>
          <CardContent>
            <Typography variant="h5" component="h2">
              Log: 
              <List>
                { JSON.parse(value.reasons).map((reason, reasonIndex) => {
                  return (
                    <Fragment key={reasonIndex}>
                      <ListItem>
                        <ListItemText primary={ dayjs(reason.date).format('DD-MM-YYYY') + " - " + reason.text } />
                      </ListItem>
                      <Divider/>
                    </Fragment>
                  )
                })}
              </List>
            </Typography>
          </CardContent>
    </Card>
    </Grid>

              <AccordionActions>
                <Tooltip title="Close the trade, mark it as finished">
                  <Button variant="contained" size="small" color="primary" onClick={doCompleteTrade(value.ID)}>
                    Complete Trade
                  </Button>
                </Tooltip>
                <Tooltip title="Delete all trace of the trade">
                  <Button variant="contained" size="small" color="secondary" onClick={doDeleteTrade(value.ID)}>
                    Delete Trade
                  </Button>
                </Tooltip>
              </AccordionActions>
           </AccordionDetails>
          </Accordion>
     )
    })}

    </div>
      </>
    );
}
