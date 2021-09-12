$(document).ready(function () {
    //Regular business hours
    const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17];
        
    //container to put rows in
    let container = $(`#container`);
    
    //pulls current date
    const today = new Date();
    const currentHour = today.getHours();

    //date formatting for todays date shown on top of page
    let dateFormatting = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    //sets date and formatting for top of page
    $('#currentDay').text(today.toLocaleDateString("en-US", dateFormatting));
  
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

        //changes textBox background depending on the current time
        if(hours === currentHour) {
            textBox.attr("style","background-color: red");
        }else if(hours > currentHour) {
            textBox.attr("style","background-color: green");
        }else {
            textBox.attr("style","background-color:lightgrey");
        }
        
        //When saveButton experiences a click event then saveInput() is called
        saveButton.on("click", function(e){saveInput(hours)});
    }

    //function creates time XAM or XPM
    function getHourDisplay(hours){
        let formattedHours = 0;
        if(hours <= 12){
            //if hour is less than or equal to 12 then we add AM to end of it
            formattedHours = hours + "AM";
        }else{
            //if hour is greater than 12 then we subtract it by 12 and add PM 
            formattedHours = (hours - 12) + "PM";
        }
        return formattedHours;
    }
    
    //saves text box input to local storage when save button is clicked
    function saveInput(hour){

        //hour fills in what text box to pull value from
        localStorage.setItem(hour, $(`#textarea-${hour}`).val());
    }
    

    //fills work day scheduler container depending on business hours
    for (let i = 0; i < hours.length; i++) {
      getRow(hours[i]);
    }
});
