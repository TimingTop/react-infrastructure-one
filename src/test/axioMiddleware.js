import { REQUEST, SUCCESS, FAILURE } from './../store/constants'
import config from '../config'
import { logout } from '../pages/auth/auth'
import {iamIntegrationEnabled} from '../utils/configUtil'
const logoutUrl = config.idm.logoutUrl


const bindInterceptors = (client, injectedParameters, middlewareInterceptors) => {
    
    client.interceptors.request.use(middlewareInterceptors.request.success.bind(null, injectedParameters), middlewareInterceptors.request.error.bind(null, injectedParameters))
    client.interceptors.response.use(middlewareInterceptors.response.success.bind(null, injectedParameters), middlewareInterceptors.response.error.bind(null, injectedParameters))
}


const isAxiosRequest = (action) => action.payload && action.payload.request;
const getClientName = (action) => action.payload.client ? action.payload.client : 'default'

export default (clientMap, middlewareInterceptors) => {


    const setupedClients = {}

    return ({ getState, dispatch }) => (next) => (action) => {
        
        if (!isAxiosRequest(action)) {
            return next(action)
        }

        const axiosAction = action
        const clientName = getClientName(axiosAction)

        let axiosClient = clientMap.get(clientName)
        if(axiosClient === undefined){
            throw new Error(`Client with name "${clientName}" has not been defined in middleware`);
        }

        const getSourceAction = () => axiosAction
        if(!setupedClients[clientName]){
            const injectToInterceptor = { getState, dispatch, getSourceAction }
            bindInterceptors(axiosClient, injectToInterceptor, middlewareInterceptors)

            setupedClients[clientName] = axiosClient
        }
        
        let previousActionData = {previousAction: axiosAction};
        next({ ...axiosAction, type: axiosAction.type, status: REQUEST });
        // let conf = {...axiosAction.payload.request, reduxSourceAction: action}
        return axiosClient.request(axiosAction.payload.request)
            .then(
                (response) => {
                    const nextAction = {
                        type: axiosAction.type,
                        payload: response,
                        meta: {
                            previousAction: axiosAction
                        },
                        status: SUCCESS
                    }
                    next(nextAction)
                    if(axiosAction.payload.onSuccess){
                        axiosAction.payload.onSuccess(response)
                    }
                    return response
                },
                (error) => {

                    //error handle
                    if(error.response && error.response.status === 401){
                        logout()
                        if (iamIntegrationEnabled()) {
                            window.location.replace(location.origin + '/userForceLogout')
                        } else {
                            window.location.replace(logoutUrl)
                        }
                        throw new Error('logout')
                    }
                    if(error.response && error.response.status === 403){
                        let message = error.response.data.message
                        if(message && message.toLowerCase().includes('unauthorized access')){
                            window.location.replace(location.origin + '/unauthorizedAccess')
                            throw new Error('Unauthorized Access')
                        }
                    }
                    const nextAction = {
                        type: axiosAction.type,
                        error: error,
                        meta: {
                            previousAction: axiosAction
                        },
                        status: FAILURE
                    }
                    next(nextAction)
                    if(axiosAction.payload.onFail){
                        axiosAction.payload.onFail(error)
                    }
                    return Promise.reject(error)
                })
    }
}






import axios from 'axios'
import config from '../config'

export const [REQUEST, SUCCESS, FAILURE] = ['REQUEST', 'SUCCESS', 'FAILURE']

export const Clients = {
    DEFAULT: 'default',
    BASE: 'base',
    FLOW_DESIGNER: 'flowDesigner',
    DATAPARSER: 'dataparser',
    FOTA: 'fota',
    JOB: 'job',
	PRE_PROVISION: 'preProvision',
	LWM2M: 'lwm2m',
    LWM2M_SERVERS: 'lwm2mServers',
    APPLICATIONS: 'applications',
	STATISTICS: 'statistics',
	ACCOUNT: 'account',
	CHECK_USERNAME: 'checkUserName',
	USER_PROFILE: 'idmRegister',
	SCEF: 'scef',
}

const clientMap = new Map()
clientMap.set(Clients.DEFAULT, axios.create({
	baseURL: config.resources.endpoint,
	responseType: 'json'
}))
clientMap.set(Clients.BASE, axios.create({
	baseURL: config.backend.endpoint,
	responseType: 'json'
}))
clientMap.set(Clients.FLOW_DESIGNER, axios.create({
	baseURL: config.flowDesigner.endpoint,
	responseType: 'json'
}))
clientMap.set(Clients.DATAPARSER, axios.create({
	baseURL: config.dataparser.endpoint,
	responseType: 'json'
}))
clientMap.set(Clients.FOTA, axios.create({
	baseURL: config.fota.endpoint,
	responseType: 'json'
}))
clientMap.set(Clients.JOB, axios.create({
	baseURL: config.job.endpoint,
	responseType: 'json'
}))
clientMap.set(Clients.PRE_PROVISION, axios.create({
	baseURL: config.preProvision.endpoint,
	responseType: 'json'
}))
clientMap.set(Clients.LWM2M, axios.create({
	baseURL: config.lwm2m.endpoint,
	responseType: 'json'
}))
clientMap.set(Clients.LWM2M_SERVERS, axios.create({
	baseURL: config.lwm2mServers.endpoint,
	responseType: 'json'
}))
clientMap.set(Clients.APPLICATIONS, axios.create({
	baseURL: config.applications.endpoint,
	responseType: 'json'
}))
clientMap.set(Clients.STATISTICS, axios.create({
	baseURL: config.statistics.endpoint,
	responseType: 'json'
}))
clientMap.set(Clients.ACCOUNT, axios.create({
	baseURL: config.account.endpoint,
	responseType: 'json'
}))
clientMap.set(Clients.CHECK_USERNAME, axios.create({
	baseURL: config.idm.checkUserNameEndpoint,
	responseType: 'json'
}))
clientMap.set(Clients.USER_PROFILE, axios.create({
	baseURL: config.userProfile.endpoint,
	responseType: 'json'
}))
clientMap.set(Clients.SCEF, axios.create({
	baseURL: config.backend.endpoint + '/scef/v1',
	responseType: 'json'
}));

export default clientMap



import { createStore, applyMiddleware } from 'redux'
import * as R from 'ramda'
import storefrontApp from '../reducers'
import axiosMiddleware from '../middlewares/axiosMiddleware'
import refreshToken from '../middlewares/refreshToken'
import { createLogger } from 'redux-logger'
import clientMap from './constants'


const interceptors = {
	request: {
		success: ({ dispatch, getState, getSourceAction }, config) => {
			return config
		},
		error: ({ dispatch, getState, getSourceAction }, error) => {
			
			console.error('---------------axios request error---------------', error)
			let params = {}
			if(!R.isNil(error.response) && !R.isNil(error.response.data)){
                let response = error.response
                // params = new Error(response.data.message)
                params.response = response
                params.code = response.status
                params.request = error.request
                params.config = error.config
            }
			return Promise.reject(params)
		}
	},
	response: {
		success: ({ dispatch, getState, getSourceAction }, response) => {
			return response
		},
		error: ({ dispatch, getState, getSourceAction }, error) => {
			
			console.error('---------------axios response error---------------', error)
			let params = {}
            if(!R.isNil(error.response) && !R.isNil(error.response.data)){
                let response = error.response

                params.response = response
                params.code = response.status
                params.request = error.request
                params.config = error.config
            }else{
                params = error
                params.code = 0
                params.response = {
                    data: {
                        error: "Network Error",
                        exception: "Unkonw Exception",
                        message: "Network Error",
                        path: params.config.url,
                        status: 0,
                        timestamp:new Date().getTime()
                    },
                    config: params.config,
                    request: params.request,
                    header: {},
                    status: 0,
                    statusText: ""
                }
            }
			return Promise.reject(params)
		}
	}
}

function createStoreWithMiddleware(app) {
	if (process.env.NODE_ENV === 'development') {
		const logger = createLogger();
		return applyMiddleware(
			refreshToken,
			axiosMiddleware(clientMap, interceptors),
			logger,
		)(createStore)(app)
	} else {
		return applyMiddleware(
			refreshToken,
			axiosMiddleware(clientMap, interceptors),
		)(createStore)(app)
	}
}
export default config => {
	return createStoreWithMiddleware(storefrontApp)
}

