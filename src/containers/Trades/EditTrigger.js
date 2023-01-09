import React, { useState } from 'react';

import { makeStyles} from '@material-ui/core/styles';

// redux


import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';

// trade add form
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '10%',
    flexShrink: 0,
  },
 formControl: {
    margin: theme.spacing(2),
    width: 200
  },
  margin: {
    margin: theme.spacing(2),
  }
}));

export default function EditTrigger( props ) {

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  // closes the dialog
  const handleClose = () => {
    setOpen(false);
  };

  // opens the dialog
  const handleOpen = () => {
    setOpen(true);
  };
  
  const formatter = new Intl.NumberFormat('en-US');


  // called when a field in the form has been modified, use for validation
  const handleChange = (event, b) => {
    let value = event.target.value;
    let name = event.target.name;


  //  const newTrigger = trigger;

//    setTrigger(newTrigger);

    switch(name) {
      case 'percent':
        setPercent(value);
        //@TODO change this..
        setAmount((value / 100) * props.trade.size);
        break;
      case 'trigger':
        setTrigger(value);
        break;
      default:
        break;
    }

  };

  // called when the form has been submitted
  const handleSubmit = () => {

  };

  const [trigger, setTrigger] = React.useState(props.trigger);
  const [amount, setAmount] = useState(props.trigger.amount);

  const [percent, setPercent] = useState(50);
  
  /*const trigger = {
    type: 'sell',
    name: 'TP1',
    target: '12500',
    percent: '50',
    amount: '0.2',
  };*/

  return (
    <>
    <Fab color="default" aria-label="add" className={classes.fab} onClick={handleOpen} size="small">
      <EditIcon/>
    </Fab>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit Trigger</DialogTitle>
      <DialogContent>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-helper-label">Type</InputLabel>
          <Select
           labelId="demo-simple-select-helper-label"
           id="demo-simple-select-helper"
           value={ trigger.type }
           onChange={handleChange}
          >
            <MenuItem value="sell">Sell</MenuItem>
            <MenuItem value="stop">Stop</MenuItem>
          </Select>
        </FormControl>

        <FormControl className={classes.margin}>
          <TextField
            label="Name"
            id="standard-basic"
            value={ trigger.name }
            onChange={ handleChange }
          />
        </FormControl>

      <div>
       <FormControl className={ classes.formControl } variant="outlined">
          <InputLabel htmlFor="outlined-adornment-target">Target Price</InputLabel>
          <OutlinedInput
           id="outlined-adornment-target"
           value={ trigger.targetPrice }
           onChange={handleChange}
           startAdornment={<InputAdornment position="start">$</InputAdornment>}
           labelWidth={10}
          />
        </FormControl>

        <FormControl className={ classes.formControl } variant="outlined">
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
           id="outlined-adornment-amount"
           value={ percent }
           name="percent"
           onChange={ handleChange }
           endAdornment={<InputAdornment position="end">% ({ formatter.format(amount) + ' ' + props.trade.assetName })</InputAdornment>}
           labelWidth={3}
          />
        </FormControl>
      </div>

      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit} color="primary">
          Update
        </Button>
      </DialogActions>
 
    </Dialog>
    </>
  );

}
