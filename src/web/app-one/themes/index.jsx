import { createMuiTheme } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: purple[500]
        },
        secondary: {
            main: '#11cb5f'
        }
    },
    typography: {
        useNextVariants: true,
        // Use the system font instead of the default Roboto font.
        fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        ].join(','),
        fontWeightMedium: 500,
        body1: {
        fontWeight: 500,
        },
        subtitle1: {
        fontSize: 12,
        },
        button: {
        fontStyle: 'italic',
        },
    }
});

export default theme;
