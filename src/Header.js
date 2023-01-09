import React from 'react';
import './header.css';
import PropTypes from 'prop-types';
import { makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

// drawer
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250
  }
}));

function ElevationScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
          disableHysteresis: true,
          threshold: 0,
          target: window ? window() : undefined,
        });

    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
}

ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
};

export default function Header(props) {

  const classes = useStyles();

  const [state, setState] = React.useState({
    top: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  // use SwipeableDrawer
  return (
      <div className={classes.root}>
        <ElevationScroll {...props}>
          <AppBar position="sticky" className="AppHeader">
              <Toolbar>

                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" aria-haspopup="true" onClick={toggleDrawer('top', true)}>
                  <MenuIcon />
                  <Drawer anchor='left' open={state['top']} onClose={toggleDrawer('top', false)}>
                  <div className={classes.list} onClick={toggleDrawer('top', false)} onKeyDown={toggleDrawer('top', false)}>
                    <Typography>Bitfinex</Typography>
                    <Divider />
                    <List>
                      <ListItem button selected={true}>
                        <ListItemIcon>
                          <CheckCircleRoundedIcon color='action'/>
                        </ListItemIcon>
                        <ListItemText primary="Bitfinex"/>
                      </ListItem>
                    </List>
                    <Typography>Bybit</Typography>
                    <Divider />
                    <List>
                      <ListItem button>
                        <ListItemText primary="Bybit"/>
                      </ListItem>
                    </List>
                    <Typography>Bitmex</Typography>
                    <Divider />
                    <List>
                      <ListItem button>
                        <ListItemText primary="Bitmex"/>
                      </ListItem>
                    </List>
                  </div>
                </Drawer>
              </IconButton>

              <Typography variant="h6" className={classes.title}>
               Belfort  <small>(Trading Tracker) v0.1</small>
              </Typography>
            </Toolbar>
          </AppBar>
        </ElevationScroll>
        <Toolbar/>
      </div>
    );
}
