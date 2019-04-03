import React from 'react';
import {Link} from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default class menu extends React.Component {

    render() {
        return (
            <div>
                <List component="nav">
                    <Link to={"/about"}>
                        <ListItem button>
                            <ListItemText primary="About"/>
                        </ListItem>
                    </Link>
                    <Link to={"/author"}>
                        <ListItem button>
                            <ListItemText primary="Author"/>
                        </ListItem>
                    </Link>
                </List>
            </div>
        )
    }
}