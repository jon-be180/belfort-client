import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Container  from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
}));


export default function Login() {

    const classes = useStyles();

    const dispatch = useDispatch();

    // save button
    // @TODO partly hard coded
    const handleSubmit = (event) => {
        dispatch(
            /*doLogin({
          ExchangeAccountId: exchangeAccountId,
          TradeSystemID: tradeSystemId
        })*/
        );
    };

    const [email, setEmail] = React.useState(1);
    const [password, setPassword] = React.useState(1);

    // im not keen on how long winded all this is, can i just do like php if func exists then $this->$func($val) ?
    // input validation and state storage
    const handleChange = (event, b) => {
        var value = event.target.value;
        var name = event.target.name;

        switch (name) {
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                //TODO error
                break;
        }
    };

    return (
        <Container component="main" maxWidth="xs">
             <div className={classes.paper}>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <form className={classes.root} autoComplete="off">
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleSubmit}
                >
                    Sign In
                </Button>
            </form>
            </div>
        </Container>
    );
}