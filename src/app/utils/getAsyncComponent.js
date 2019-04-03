import React from 'react';

// with webpackChunkName together
export default function getAsyncComponent(load) {

    return class AsyncComponent extends React.Component {
        // es2017 grammar
        // like promise 
        // await must with async
        async componentDidMount() {
            // wait load the js
            const {defaut: component} = await load();
            this.setState({
                component
            });
        }

        render() {
            const {component} = this.state;
            return component? 
                    <component {...this.props} />
                    :
                    null;
        }
    }
}
