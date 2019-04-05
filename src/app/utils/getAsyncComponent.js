import React, {PureComponent, createElement} from 'react';

// with webpackChunkName together
export default function getAsyncComponent(asyncLoad) {

    return class AsyncComponent extends PureComponent {
        // es2017 grammar
        // like promise 
        // await must with async
        
        // async componentDidMount() {
        //     // wait load the js
        //     const {defaut: component} = await asyncLoad();
        //     this.setState({
        //         component
        //     });
        // }
        componentDidMount() {
            asyncLoad().then(({default: component}) => {
                this.setState({
                    component
                })
            });
        }

        render() {
            const {component} = this.state|| {};
            return component? 
                    // <component {...this.props} />
                    createElement(component, {...this.props})
                    :
                    null;
        }
    }
}
