import React from 'react';

const checkPermission = (hasPermissions) => 
    (insertComponent) => {
        return class WithPermission extends React.Component {

            render() {
                const pessions = ['A', 'B'];
                let isPermission = hasPermissions();
                if (isPermission) {
                    return <insertComponent {...this.props}/>
                } else {
                    return <div>Not Authorized</div>
                }
            }
        }
    }









export default checkPermission;
