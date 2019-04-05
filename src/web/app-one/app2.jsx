import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import themes from './themes';
import store from 'app/store';
import LocaleProvider from 'app/components/locale/LocaleProvider';
import { BrowserRouter, Route, Switch, Link, HashRouter } from 'react-router-dom'
import getAsyncComponent from 'app/utils/getAsyncComponent';
import checkPermission from 'app/utils/checkPermission';
import MenuList from './pages/MenuList';
// 异步引入 js
const about = getAsyncComponent(
    () => import(/* webpackChunkName: 'foot-about' */'app/pages/about/footer')
);
// const author = getAsyncComponent(
//     () => import(/* webpackChunkName: 'foot-author' */'app/pages/about/author')
// );
// 验证权限
const authorAuthernation = checkPermission(
    () => true
);
let showStore = store();

const App = () => (
    <BrowserRouter>
                    <div>
                    <Link to={"/about"}>
                        about
                    </Link>
                    {/* <Link to={"/author"}>
                        author
                    </Link> */}
                    </div>
                    <div>menu down</div>
                    <Switch>
                        <Route path="/about" component={about}/>
                        {/* <Route path="/author" component={authorAuthernation(author)}/> */}
                    </Switch>
                </BrowserRouter>
);

render(<App/>, document.getElementById('app'));

