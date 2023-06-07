import { LightningElement, track } from 'lwc';

export default class Trial extends LightningElement {
    
        // JS Properties 
        pageSizeOptions = [5, 10, 25, 50, 75, 100]; //Page size options
        records = []; //All records available in the data table
        totalRecords = 0; //Total no.of records
        pageSize; //No.of records to be displayed per page
        totalPages; //Total no.of pages
        pageNumber = 1; //Page number    
        recordsToDisplay = []; //Records to be displayed on the page
        bigRecords = [];
        bigRec={};
        daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        yearMonthDay;
        spaces = [];
        @track selection;
        @track selectionTwo;

        // forcefield

        // CREATE MONTHLY CALENDAR
        bigRecords = [
            {month:'January', numberOfDays:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']},
            {month:'February', numberOfDays:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28']},
            {month:'March', numberOfDays:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']},
            {month:'April', numberOfDays:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30']},
            {month:'May', numberOfDays:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']},
            {month:'June', numberOfDays:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30']},
            {month:'July', numberOfDays:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']},
            {month:'August', numberOfDays:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']},
            {month:'September', numberOfDays:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30']},
            {month:'October', numberOfDays:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']},
            {month:'November', numberOfDays:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30']},
            {month:'December', numberOfDays:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']}
        ];

        // GET TOTAL AMOUNT OF DATES (DAYS IN A YEAR)
        sampleIt() {
            for (const item of this.bigRecords) {
                for (let i = 0; i < item.numberOfDays.length; i++) {
                    this.bigRec = {month: item.month, day: i};
                    this.records.push(this.bigRec);
                  }
            }
            return this.records;
        }

        get bDisableFirst() {
            return this.pageNumber == 1;
        }
        get bDisableLast() {
            return this.pageNumber == this.totalPages;
        }

        // connectedCallback method called when the element is inserted into a document
        connectedCallback() {
            // IMMEDIATELY DISPLAY CALENDAR WHEN PAGE LOADS
            this.recordsToDisplay.push(this.bigRecords[0]);

        }

            // GET TOTAL OF BIGRECORDS
            totalRecords = this.sampleIt().length;   
            
            // set pageSize with default value as first option               
            pageSize = this.pageSizeOptions[0]; 
                    
        
        // HANDLE USER INPUT START DATE 
        handleDatePick(event) {
        this.selection = event.target.value.toString() + ', ' + event.target.label.toString();
        }

        handleEndDatePick(event) {
            this.selectionTwo = event.target.value.toString() + ', ' + event.target.label.toString();
            }
        
        // call helper menthod to update pagination logic 
        handleRecordsPerPage(event) {
            this.pageSize = event.target.value;
            this.paginationHelper();
        }
        handleRecordsPerPageTwo(event) {
            this.pageSize = event.target.value;
            this.paginationHelper();
        }
        previousPage() {
            this.pageNumber = this.pageNumber - 1;
            this.paginationHelper();
        }
        nextPage() {
            this.pageNumber = this.pageNumber + 1;
            this.paginationHelper();
        }
        firstPage() {
            this.pageNumber = 1;
            this.paginationHelper();
        }
        lastPage() {
            this.pageNumber = this.totalPages;
            this.paginationHelper();
        }

        // JS function to handel pagination logic 
        paginationHelper() {
            this.recordsToDisplay = [];
            this.spaces=[];
            // calculate total pages
            this.totalPages = 12;
            // set page number 
            if (this.pageNumber <= 1) {
                this.pageNumber = 1;
            } else if (this.pageNumber >= this.totalPages) {
                this.pageNumber = this.totalPages;
            }

            
            this.yearMonthDay = '2023-' + this.bigRecords[this.pageNumber - 1].month + '-' + this.bigRecords[this.pageNumber - 1].numberOfDays[0];
            let d = new Date(this.yearMonthDay);
            console.log('here is d ' + d);
            let day = d.getDay();
            console.log('here is day ' + day);
            
            if(day > 0) {
                let x = parseInt(day);
                console.log(x);
                for (let step = 0; step < x; step++) {
                    // Runs 5 times, with values of step 0 through 4.
                    this.spaces.push(step);
                    } 
                    console.log(this.spaces);
            }

            this.recordsToDisplay.push(this.bigRecords[this.pageNumber - 1]);    

        }
                
    }




         /*
            let count = 1;
            for (const item of this.bigRecords[0].numberOfDays) {
                this.yearMonthDay = '2023-' + this.bigRecords[0].month + '-' + item;
                let d = new Date(this.yearMonthDay);
                let day = weekday[d.getDay()];
                this.daysOfWeek.push(day);
                count++;
                if(count === 8) {
                    break;
                }
              }*/


                /*
                for (const prop in this.bigRecords[this.pageNumber - 1].numberOfDays) {
                    console.log('in for loop...')
                    this.dateConfig = '2023-' + this.bigRecords[0].month + '-' + item;
                    let r = new Date(this.dateConfig);
                    let da = weekday[r.getDay()];
                    console.log('here is da ' + da);
                    console.log('here is item ' + item);
                    this.daysOfWeek.push(da);
                    counter++;
                    if(counter === 8) {
                        break;
                    }*/


                    // set records to display on current page 
            /*for (let i = (this.pageNumber - 1) * this.pageSize; i < this.pageNumber * this.pageSize; i++) {
                if (i === this.totalRecords) {
                    break;
                }*/