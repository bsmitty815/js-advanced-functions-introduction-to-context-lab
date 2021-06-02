// Your code here



    function createEmployeeRecord(info) {
        // returns the values of info
        return {firstName: info[0], familyName: info[1], title: info[2], payPerHour: info[3], timeInEvents: [], timeOutEvents: []};
    }

    function createEmployeeRecords(employees) {
        //uses map method to go through all the values in an array
    return employees.map(employee => {
        return createEmployeeRecord(employee)
    })
    }

    function createTimeInEvent(employeeRecord, time) {
        let newRecord = {
            type: 'TimeIn',
            hour: parseInt(time.split(" ")[1], 10), //splits the string to an array and gets 1 index. use parseInt to turn from a string
            date: time.split(" ")[0] //splits the string to an array and gets 0 index
        }
        employeeRecord.timeInEvents = [...employeeRecord.timeInEvents, newRecord];
        return employeeRecord;
    }

    function createTimeOutEvent(employeeRecord, time) {
        let newRecord = {
            type: 'TimeOut',
            hour: parseInt(time.split(" ")[1], 10), //splits the string to an array and gets 1 index. use parseInt to turn from a string
            date: time.split(" ")[0] //splits the string to an array and gets 0 index
        }
        employeeRecord.timeOutEvents = [...employeeRecord.timeOutEvents, newRecord];
        return employeeRecord;
    }

    function hoursWorkedOnDate(employee, time) {
        const result1 = employee.timeInEvents.filter(tie => tie.date === time); // filter method will filter to the right value
        const result2 = employee.timeOutEvents.filter(toe => toe.date === time);
        return (result2[0].hour - result1[0].hour) / 100;
    }

    
    function wagesEarnedOnDate(employee, date) {
        const result2 = hoursWorkedOnDate(employee, date) // passing through the employee hours
        return result2 * employee.payPerHour 
    }

    function allWagesFor(employeeRecord) {
        const everyDateWorked = employeeRecord.timeInEvents.map(event => event.date); // map through the array to get the date inside timeInEvents
        const totalWages = everyDateWorked.reduce(function(acc, val) {  // use the reduce method to go through the variable which 
            //acc + val;                                               gets all the dates and then adds them all up     
            return acc + wagesEarnedOnDate(employeeRecord, val)         //returning the results
        }, 0);
            return totalWages;  //returning the new variable
    }

    function findEmployeeByFirstName(employeeRecords, firstName) {
        return employeeRecords.find(element => element.firstName === firstName)
         //find goes through the recrods and has the element find the firstName and if it equals
         //the firstName argument it returns it
    }

    function calculatePayroll(employeeRecords) {
        let allEmployeeWages = 0;               // set the anitial value before adding all the employees up
        for (let i = 0; i < employeeRecords.length; i++) {  //create a for loop to go through all the employees
            allEmployeeWages += allWagesFor(employeeRecords[i]) // now add the employee wages to the initial value
        }    //allEmployeeWages goes on the left becuse when you are seeting it eqyal to something it has to be set equal on the left
        return allEmployeeWages;
    }