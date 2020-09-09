import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

// tabs
import Reports from './containers/Reports/Reports';
import Trades from './containers/Trades/Trades';
import Charts from './containers/Charts/Charts';
import Settings from './containers/Settings';

// render
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
          >
            {value === index && (
                      <Box p={3}>
                        {children}
                      </Box>
                    )}
          </div>
        );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
}

const useStyles = makeStyles((theme) => ({
    root: {
          flexGrow: 1,
        },
    
}));



export default function App() {

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: 'dark',
        }
      })
    ,[]
  );


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/">
            <Container className={classes.root} maxWidth="xl">
              <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                  <Tab label="Trades" {...a11yProps(0)} />
                  <Tab label="Signals" {...a11yProps(1)} />
                  <Tab label="Reports" {...a11yProps(2)} />
                  <Tab label="Settings" {...a11yProps(3)} />
                </Tabs>
              </AppBar>
              <TabPanel value={value} index={0}>
                <Trades/>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Charts/>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <Reports/>
              </TabPanel>
              <TabPanel value={value} index={3}>
                <Settings/>
              </TabPanel>
            </Container>
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );

}
