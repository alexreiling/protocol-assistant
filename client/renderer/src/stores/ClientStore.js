import Store from "./Store";
import {stores} from '../config'
let test = 0;

var clientStore = new Store(stores.clients.storeName, stores.clients.options);

clientStore.setTest = (value) => test = value
clientStore.getTest = () => test;
export default clientStore