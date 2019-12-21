import React, {Component} from 'react';
import '../app/App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AppLogo from '../../images/logoFull.png';
import grey from '@material-ui/core/colors/grey';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles'
import Tab from '../tab/Tab'


const appBarTheme = createMuiTheme({
    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            main: '#dfdfdf',
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
            light: '#0066ff',
            main: '#0044ff',
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#ffcc00',
        },
        // error: will use the default color
    },
});



class Home extends Component {
    render() {
        return (
            <ThemeProvider theme={appBarTheme}>
                <AppBar position="static" color={"primary"}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <img src={AppLogo} height={30} alt={"logo"}/>
                        </IconButton>
                        <Typography variant="h6">
                            INVENTORY MANAGEMENT SYSTEM
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
                <Tab/>
            </ThemeProvider>
        );
    }
}

export default Home;