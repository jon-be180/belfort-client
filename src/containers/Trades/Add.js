import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

// redux testing
import { useDispatch } from 'react-redux';
import { createTrade } from '../../actions/tradeActions';


// add button
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

// trade add form
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '10%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
     color: theme.palette.text.secondary,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 140,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  fab: {
    bottom: theme.spacing(-2),
    float: 'right'
  },

}));

export default function TradesAdd(props) {

  const classes = useStyles();

  //@TODO import this instead, thats what all the cool kids to
  const [open, setOpen] = React.useState(false);

  // used for creating the trade
  const [exchangeAccountId, setExchangeAccountId] = React.useState(props.exchangeAccountId);
  const [tradeSystemId, setTradeSystemId] = React.useState(1); //TODO allow others, quadrigo only for now
  const [direction, setDirection] = React.useState('long');
  const [pair, setPair] = React.useState('BTCUSD');
  const [margin, setMargin] = React.useState(1);
  const [amount, setAmount] = React.useState(0);
  const [entryPrice, setEntryPrice] = React.useState(0);
  const [reason, setReason] = React.useState('');
  const [tradeManagerSettings, setTradeManagerSettings] = React.useState(0);

  const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
  });
  // attempt to get the live bitcoin price
  // @TODO store this more permanently so it only needs updating every hour or so
  const [BtcPrice, setBtcPrice] = React.useState(0);
  React.useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=0')
      .then(res => res.json())
      .then(
        (result) => {
          setBtcPrice(result.prices[0][1])
        },
        (error) => {
          
        });
  }, [])

  // this was from the redux tutorial but idk what it does really
  // and none of the other guides i found explain it at all
  // keeping it in case i do need it and the other stuff is all wrong
  //  const price = useSelector(state => state.trade);

  // dialog open/close
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const dispatch = useDispatch();

  // save button
  // @TODO partly hard coded
  const handleSubmit = (event) => {
    dispatch(createTrade({
      ExchangeAccountId: exchangeAccountId,
      TradeSystemID: tradeSystemId,
      pair: pair,
      isActive: 1,
      direction: direction,
      size: amount,
      assetName: "BTC",
      reasons: "[{\"date\": "+Date.now()+", \"text\": \""+reason+"\"}]",
      price: entryPrice,
      margin: margin,
      date: Date.now(),
      systemName: "Blah",
      exchangeAccountName: "Something",
      tradeManagerSettings: { atr: tradeManagerSettings },
    }));
  };
  

  // im not keen on how long winded all this is, can i just do like php if func exists then $this->$func($val) ?
  // input validation and state storage
  const handleChange = (event, b) => {
    var value = event.target.value;
    var name = event.target.name;

    switch(name) {
      case 'exchangeAccountId':
        setExchangeAccountId(value);
        break;
      case 'tradeSystemId':
        setTradeSystemId(value);
        break;
      case 'direction':
        setDirection(value);
        break;
      case 'pair':
        setPair(value);
        break;
      case 'margin':
        setMargin(value);
        break;
      case 'amount':
        setAmount(value);
        break;
      case 'entryPrice':
        setEntryPrice(value);
        break;
      case 'reason':
        setReason(value);
        break;
      case 'tradeManagerSettings':
        // @TODO this structure is far too fixed, needs to be smarter
        setTradeManagerSettings(value);
        break;
      default:
        //TODO error
        break;
    }
  };

  return (
    <>
    <Fab color="primary" aria-label="add" className={classes.fab} onClick={handleOpen}>
      <AddIcon/>
    </Fab>

    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
       <DialogTitle id="form-dialog-title">Open a Trade</DialogTitle>
         <DialogContent>
           <Typography>Current price of this asset is: { formatter.format(BtcPrice) }</Typography>

           <FormControl className={classes.formControl}>
             <InputLabel id="demo-simple-select-helper-label">Exchange Account</InputLabel>
             <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              name="exchangeAccountId"
              value={ exchangeAccountId }
              onChange={handleChange}
             >
               <MenuItem value="0">Select</MenuItem>
               <MenuItem value="1">Bitfinex Main</MenuItem>
               <MenuItem value="2">Bybit Main</MenuItem>
             </Select>
           </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-helper-label">Trade System</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              name="tradeSystemId"
              value={ tradeSystemId }
              onChange={ handleChange }
            >
              <MenuItem value="1">Quadrigo</MenuItem>
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-helper-label">Direction</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              name="direction"
              value={ direction }
              onChange={handleChange}
            >
              <MenuItem value="long">Long</MenuItem>
              <MenuItem value="short">Short</MenuItem>
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-helper-label">Trading Pair</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              name="pair"
              value={ pair }
              onChange={handleChange}
            >
              <MenuItem value="BTCUSD">BTC/USD</MenuItem>
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <TextField id="standard-basic" label="Margin" name="margin" value={margin} onChange={handleChange} type="number" />
          </FormControl>

          <FormControl fullWidth className={classes.formControl} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
            <OutlinedInput
             id="outlined-adornment-amount"
             value={ amount }
             name="amount"
             type="number"
             onChange={ handleChange }
             labelWidth={ 10 }
            />
          </FormControl>

          <FormControl fullWidth className={classes.formControl} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
            <OutlinedInput
             id="outlined-adornment-amount"
             value={ entryPrice }
             name="entryPrice"
             type="number"
             onChange={ handleChange }
             labelWidth={ 10 }
            />
          </FormControl>


          <FormControl fullWidth className={classes.formControl} variant="outlined">
            <TextField
              multiline 
              rows={3} 
              label="Reason to open the trade"
              id="outlined-adornment-reason"
              value={ reason }
              name="reason"
              onChange={ handleChange }
            />
          </FormControl>

          <FormControl component="fieldset">
            <FormLabel component="legend">Quadrigo Settings:</FormLabel>
            <FormGroup>
              <FormControl fullWidth className={classes.formControl} variant="outlined">
                <TextField
                  label="Current ATR value"
                  id="outlined-adornment-reason"
                  name="tradeManagerSettings"
                  value={ tradeManagerSettings }
                  onChange={ handleChange }
                />
              </FormControl>
            </FormGroup>
          </FormControl>

        </DialogContent>
        <DialogActions>
          <Button onClick={ handleClose } color="primary">
            Cancel
          </Button>
          <Button onClick={ handleSubmit } color="primary">
            Open Trade
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );

}

