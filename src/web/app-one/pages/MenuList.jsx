import React from 'react';
import {Link} from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default class MenuList extends React.Component {
    
    render() {
        return (
            <div>
                bbbbbbb
                <Link to={"/about"}>
                    about
                </Link>
                <Link to={"/author"}>
                    author
                </Link>
            </div>
        )
    }
}