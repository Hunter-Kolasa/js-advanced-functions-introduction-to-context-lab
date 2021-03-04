let createEmployeeRecord = function(row){
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(employeeRowData) {
    return employeeRowData.map(function(row){
        return createEmployeeRecord(row)
    })
}

let createTimeInEvent = function(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

let createTimeOutEvent = function(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

let hoursWorkedOnDate = function(record, dateSought) {
    let clockIn = record.timeInEvents.find(function(e) {
        return e.date === dateSought 
    });
    let clockOut = record.timeOutEvents.find(function(e) {
        return e.date === dateSought
    });
    return (clockOut.hour - clockIn.hour) / 100;
}

let wagesEarnedOnDate = function(employee, dateSought){
    let rawWage = (hoursWorkedOnDate(employee, dateSought)
        * employee.payPerHour)
    return parseFloat(rawWage.toString())
}

let allWagesFor = function(employee){
    let eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable

}
let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(record => record.firstName = firstName)
}
let calculatePayroll = function(employeeArray) {
    return employeeArray.reduce(function(memo, e) {
        return memo + allWagesFor(e)
    }, 0)
}
