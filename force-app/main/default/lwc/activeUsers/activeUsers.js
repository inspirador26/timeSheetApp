import { LightningElement, wire, track } from 'lwc';
import getActiveUsers from '@salesforce/apex/authSessRetrieval.getEmployees';


export default class ActiveUsers extends LightningElement {
    @wire(getActiveUsers)
    employees;



    get responseReceived() {
        if(this.employees) {
            return true;
        }
        return false;

    }

}