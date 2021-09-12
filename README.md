# Work Day Scheduler
<img width="1770" alt="Screen Shot 2021-09-11 at 9 03 45 PM" src="https://user-images.githubusercontent.com/85598391/132968179-a7da0ab4-92fd-465f-bde2-a16f433ff68c.png">

When the user opens the planner they are given the date and able to jump right into scheduling their day.

<br><br>

# The Code 
## Looping & Appending

To make the work day scheduler flexable we have each row created and appended within a loop.

```javascript
//fills work day scheduler container depending on business hours 
for (let i = 0; i < hours.length; i++) {
    getRow(hours[i]);
 }
```

```javascript
function getRow(hours) {

  //using jquery creats elements for workday scheduler
  let row  = $(`<div class="row time-block">`).attr("id", hours);
  let hourEl = $(`<div class="col-md-1 hour">`).attr("id",`hour-${hours}-label`);
  let textBox = $(`<textarea class="col-md-10 description">`).attr("id",`textarea-${hours}`);
  let saveButton = $(`<button class= "btn saveBtn col-md-1">`).attr("id",`btn-hour-${hours}`);

  //calls getHourDisplay() and sets text to given hour
  hourEl.text(getHourDisplay(hours));

  //appends a save icon to saveButton
  saveButton.append(`<i class="fa fa-save"/>`);

  //fills textBox value with local storage Data
  textBox.val(localStorage.getItem(`${hours}`));

  //appends hourEl, textBox and saveButton to row
  row.append(hourEl);
  row.append(textBox);
  row.append(saveButton);

  //appends each row to the container
  container.append(row); 
 }
```
<br>

## Past, Present, Future Color coding

To assist the user in quickly noticing date, rows are colored depending on if the row of time is in the past `lightgrey` present `red` or future `green`. 

```javascript
//changes textBox background depending on the current time
if(hours === currentHour) {
    textBox.attr("style","background-color: red");
}else if(hours > currentHour) {
    textBox.attr("style","background-color: green");
}else {
    textBox.attr("style","background-color:lightgrey");
}
```
<br>

## Saving Scheduled Items

Saving to local storage allows the user to save the schedule for later. When save button is clicked for its row, the `textarea`'s contents are saved to local storage.

```javascript
function saveInput(hour){
    //hour fills in what text box to pull value from
    localStorage.setItem(hour, $(`#textarea-${hour}`).val());
}
```


<br>

## Live Project
https://doug-coder64.github.io/workDayScheduler/
