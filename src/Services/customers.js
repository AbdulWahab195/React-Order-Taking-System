import firebase from 'firebase';
import { config } from '../config';
if (!firebase.apps.length) {
    firebase.initializeApp(config);
 }

const db = firebase.firestore();

const loading = () => ({ type: 'LOADING' });
const loading_complete = () => ({ type: 'LOADING_COMPLETE' });

const customers = {
    getCustomers: options => async dispatch => {
        dispatch(loading());
        const [success, failure] = options.types;
        const promise = (resolve, reject) => {
            return db.collection("customers").get()
                .then(customersSnapshot => {
                    dispatch(loading_complete());
                    resolve(dispatch({
                        type: success,
                        payload: customersSnapshot.docs.map(doc => doc.data())   
                    }))
                })
                .catch(err => {
                    dispatch(loading_complete());
                    reject(dispatch({
                        type: failure,
                        payload: err.message
                    }))
                });
        }

        return new Promise(promise);
    },
    saveCustomerIdToRedux: options => async dispatch => {
        const [success] = options.types;
        const promise = (resolve, reject) => {
            resolve(dispatch({
                type: success,
                payload: options.Id
            }))
        };
        return new Promise(promise);
    }
}



export { customers };
