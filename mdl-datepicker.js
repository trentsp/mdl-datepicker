$.fn.mdldatepicker = function(){
  var selected_year = moment().format("YYYY");
  var selected_date = moment().format("ddd, MMM D");
  var current_viewed_month_year = moment().format("MMMM YYYY");
  var current_viewed_month = moment().format("M");
  var current_viewed_year = moment().format("YYYY");
  var month_start = moment().startOf('month');
  var month_end = moment().endOf('month');

  var theHTML =
    '<div id="mdl-datepicker-div-' + this[0].id + '" class="mdl-cell mdl-cell--2-col mdl-card mdl-shadow--2dp mdl-js-layout mdl-js-ripple-effect mdl-datepicker mdl-datepicker-hide">'+
      '<div class="header-background mdl-datepicker">'+
        '<div id="mdl-datepicker-year-' + this[0].id + '" class="mdl-typography--regular mdl-datepicker"></div>'+
        '<div id="mdl-datepicker-selected-date-' + this[0].id + '" class="mdl-typography--headline mdl-datepicker" style="margin-left:1em;"></div>'+
      '</div>'+
      '<div id="mdl-datepicker-calendar-header-' + this[0].id + '" class="mdl-datepicker" style="display:inline-block; text-align:center;">'+
        '<div id="mdl-datepicker-previous-month-' + this[0].id + '" class="mdl-datepicker" style="display:inline-block;float:left;position:relative;cursor:pointer;" onclick="previousMonth(this);"><i class="material-icons mdl-datepicker">keyboard_arrow_left</i></div>'+
        '<div id="mdl-datepicker-current-viewed-month-year-' + this[0].id + '" class="mdl-datepicker" style="display:inline-block;margin-top:.15em"></div>'+
        '<div id="mdl-datepicker-next-month-' + this[0].id + '" class="mdl-datepicker" style="display:inline-block;float:right;position:relative;cursor:pointer;" onclick = "nextMonth(this);"><i class="material-icons mdl-datepicker">keyboard_arrow_right</i></div>'+
      '</div>'+
      '<div id="mdl-datepicker-calendar-container-' + this[0].id + '" class="mdl-datepicker">'+
        '<table id="mdl-datepicker-daysofweek-' + this[0].id + '" class="mdl-datepicker mdl-typography--regular mdl-datepicker-calendar">'+
          '<tr>'+
            '<td class="mdl-datepicker">S</td>'+
            '<td class="mdl-datepicker">M</td>'+
            '<td class="mdl-datepicker">T</td>'+
            '<td class="mdl-datepicker">W</td>'+
            '<td class="mdl-datepicker">T</td>'+
            '<td class="mdl-datepicker">F</td>'+
            '<td class="mdl-datepicker">S</td>'+
          '</tr>'+
        '</table>'+
        '<table id="mdl-datepicker-calendar-' + this[0].id + '" class="mdl-typography--regular mdl-datepicker-calendar mdl-datepicker">'+
        '</table>'+
        '<div style="display:inline-block; position:absolute; top:85%;">' +
          '<button class="mdl-button mdl-js-button mdl-button--accent" style="position:relative;top:.5em" onclick="hideCalendar();">Cancel</button>' +
          '<button class="mdl-button mdl-js-button mdl-button--primary" style="position:relative;top:.5em; right:0" onclick="insertDate(' + this[0].id + ');">OK</button>' +
        '</div>' +
      '</div>'+
      '<span class="mdl-ripple" />'+
    '</div>';
  var field = this;
  var datePicker = $(theHTML);
  $(field).after(datePicker);
  //
  //                    Show/Hide the DatePicker
  //

  $("body").click(function(target){
    if (!datePicker.hasClass("mdl-datepicker-hide") && target.target.id != field[0].id && $.inArray(target.target, datePicker.find('.mdl-datepicker')) < 0){
      datePicker.addClass("mdl-datepicker-hide");
    } else {
      if (target.target.id == field[0].id){
        datePicker.removeClass("mdl-datepicker-hide");
      }
    }
  });
  //
  //                    Locating the DatePicker
  //
  /*
  var fieldHeight = $(field).height();
	var offsetTop = $(field).offset().top + fieldHeight + 10;
	var offsetLeft = $(field).offset().left;
  datePicker.css('position', 'relative');
	datePicker.css('top', offsetTop);
	datePicker.css('left', offsetLeft);
  */
  datePicker.css('width', "13em");
  datePicker.css('height', "18em");
  datePicker.css('z-index', "9999");

  //
  //                    Initializing
  //

  $("#mdl-datepicker-year-" + field[0].id).text(selected_year);
  $("#mdl-datepicker-selected-date-" + field[0].id).text(selected_date);
  $("#mdl-datepicker-current-viewed-month-year-" + field[0].id).text(current_viewed_month_year);
  buildCalendar(month_start.format("ddd"), month_end.format("D"));
  //
  //                    Functions
  //

  self.previousMonth = function(incoming){
    var fieldId = incoming.id.substring(30);
    if (current_viewed_month == '1'){
      current_viewed_month = 12;
      var tempYear = Number(current_viewed_year);
      current_viewed_year = tempYear - 1;
    } else {
      var tempMonth = Number(current_viewed_month);
      current_viewed_month = tempMonth - 1;
    }

    var stringDate = current_viewed_year + "-" + current_viewed_month + "-01";
    current_viewed_month_year = moment(stringDate, ["YYYY-M-D"]).format("MMMM YYYY");
    $("#mdl-datepicker-current-viewed-month-year-" + fieldId).text(current_viewed_month_year);
    var newStart = moment(stringDate, ["YYYY-M-D"]).startOf('month');
    var newEnd = moment(stringDate, ["YYYY-M-D"]).endOf('month');
    $("#mdl-datepicker-calendar-" + fieldId).empty();
    buildCalendar(newStart.format("ddd"), newEnd.format("D"), fieldId);
  }

  self.nextMonth = function(incoming){
    var fieldId = incoming.id.substring(26);
    if (current_viewed_month == '12'){
      current_viewed_month = 1;
      var tempYear = Number(current_viewed_year);
      current_viewed_year = tempYear + 1;
    } else {
      var tempMonth = Number(current_viewed_month);
      current_viewed_month = tempMonth + 1;
    }

    var stringDate = current_viewed_year + "-" + current_viewed_month + "-01";
    current_viewed_month_year = moment(stringDate, ["YYYY-M-D"]).format("MMMM YYYY");
    $("#mdl-datepicker-current-viewed-month-year-" + fieldId).text(current_viewed_month_year);
    var newStart = moment(stringDate, ["YYYY-M-D"]).startOf('month');
    var newEnd = moment(stringDate, ["YYYY-M-D"]).endOf('month');
    $("#mdl-datepicker-calendar-" + fieldId).empty();
    buildCalendar(newStart.format("ddd"), newEnd.format("D"), fieldId);
  }

  self.hideCalendar = function(){
    datePicker.addClass("mdl-datepicker-hide");
  }

  self.insertDate = function(incoming){
    var messyDate = $("#mdl-datepicker-selected-date-" + field[0].id).text() + " " +  $("#mdl-datepicker-year" + field[0].id).text();
    var theDate = moment(messyDate, ["ddd, MMM D YYYY"]).format("MMMM DD, YYYY");
    $(incoming).val(theDate).parent("div").addClass("is-dirty");
    hideCalendar();
  }

  function buildCalendar(firstDayOfWeek, lastDayOfMonth, fieldId){
    fieldId = typeof fieldId !== 'undefined' ? fieldId : field[0].id;
    var first_row = "";
    var remaining_rows = "";
    var first_day_second_week = 8;
    switch (firstDayOfWeek){
      case "Sun":
        first_row = "<tr>" +
                      "<td id='1-"  + fieldId + "' class='mdl-datepicker-clickable mdl-datepicker' style='cursor:pointer;'>1</td>" +
                      "<td id='2-"  + fieldId + "' class='mdl-datepicker-clickable mdl-datepicker' style='cursor:pointer;'>2</td>" +
                      "<td id='3-"  + fieldId + "' class='mdl-datepicker-clickable mdl-datepicker' style='cursor:pointer;'>3</td>" +
                      "<td id='4-"  + fieldId + "' class='mdl-datepicker-clickable mdl-datepicker' style='cursor:pointer;'>4</td>" +
                      "<td id='5-"  + fieldId + "' class='mdl-datepicker-clickable mdl-datepicker' style='cursor:pointer;'>5</td>" +
                      "<td id='6-"  + fieldId + "' class='mdl-datepicker-clickable mdl-datepicker' style='cursor:pointer;'>6</td>" +
                      "<td id='7-"  + fieldId + "' class='mdl-datepicker-clickable mdl-datepicker' style='cursor:pointer;'>7</td>" +
                     "</tr>";
        break;
        case "Mon":
        first_row = "<tr>" +
                      "<td></td>" +
                      "<td id='1-"  + fieldId + "' class='mdl-datepicker-clickable mdl-datepicker' style='cursor:pointer;'>1</td>" +
                      "<td id='2-"  + fieldId + "' class='mdl-datepicker-clickable mdl-datepicker' style='cursor:pointer;'>2</td>" +
                      "<td id='3-"  + fieldId + "' class='mdl-datepicker-clickable mdl-datepicker' style='cursor:pointer;'>3</td>" +
                      "<td id='4-"  + fieldId + "' class='mdl-datepicker-clickable mdl-datepicker' style='cursor:pointer;'>4</td>" +
                      "<td id='5-"  + fieldId + "' class='mdl-datepicker-clickable mdl-datepicker' style='cursor:pointer;'>5</td>" +
                      "<td id='6-"  + fieldId + "' class='mdl-datepicker-clickable mdl-datepicker' style='cursor:pointer;'>6</td>" +
                     "</tr>";
        first_day_second_week = 7;
        break;
        case "Tue":
        first_row = "<tr>" +
                      "<td></td>" +
                      "<td></td>" +
                      "<td id='1-"  + fieldId + "' class='mdl-datepicker-clickable mdl-datepicker' style='cursor:pointer;'>1</td>" +
                      "<td id='2-"  + fieldId + "' class='mdl-datepicker-clickable mdl-datepicker' style='cursor:pointer;'>2</td>" +
                      "<td id='3-"  + fieldId + "' class='mdl-datepicker-clickable mdl-datepicker' style='cursor:pointer;'>3</td>" +
                      "<td id='4-"  + fieldId + "' class='mdl-datepicker-clickable mdl-datepicker' style='cursor:pointer;'>4</td>" +
                      "<td id='5-"  + fieldId + "' class='mdl-datepicker-clickable mdl-datepicker' style='cursor:pointer;'>5</td>" +
                     "</tr>";
        first_day_second_week = 6;
        break;
        case "Wed":
        first_row = "<tr>" +
                      "<td></td>" +
                      "<td></td>" +
                      "<td></td>" +
                      "<td id='1-"  + fieldId + "' class='mdl-datepicker-clickable mdl-datepicker' style='cursor:pointer;'>1</td>" +
                      "<td id='2-"  + fieldId + "' class='mdl-datepicker-clickable mdl-datepicker' style='cursor:pointer;'>2</td>" +
                      "<td id='3-"  + fieldId + "' class='mdl-datepicker-clickable mdl-datepicker' style='cursor:pointer;'>3</td>" +
                      "<td id='4-"  + fieldId + "' class='mdl-datepicker-clickable mdl-datepicker' style='cursor:pointer;'>4</td>" +
                     "</tr>";
        first_day_second_week = 5;
        break;
        case "Thu":
        first_row = "<tr>" +
                      "<td></td>" +
                      "<td></td>" +
                      "<td></td>" +
                      "<td></td>" +
                      "<td id='1-"  + fieldId + "' class='mdl-datepicker-clickable mdl-datepicker' style='cursor:pointer;'>1</td>" +
                      "<td id='2-"  + fieldId + "' class='mdl-datepicker-clickable mdl-datepicker' style='cursor:pointer;'>2</td>" +
                      "<td id='3-"  + fieldId + "' class='mdl-datepicker-clickable mdl-datepicker' style='cursor:pointer;'>3</td>" +
                     "</tr>";
        first_day_second_week = 4;
        break;
        case "Fri":
        first_row = "<tr>" +
                      "<td></td>" +
                      "<td></td>" +
                      "<td></td>" +
                      "<td></td>" +
                      "<td></td>" +
                      "<td id='1-"  + fieldId + "' class='mdl-datepicker-clickable mdl-datepicker' style='cursor:pointer;'>1</td>" +
                      "<td id='2-"  + fieldId + "' class='mdl-datepicker-clickable mdl-datepicker' style='cursor:pointer;'>2</td>" +
                     "</tr>";
        first_day_second_week = 3;
        break;
        case "Sat":
        first_row = "<tr>" +
                      "<td></td>" +
                      "<td></td>" +
                      "<td></td>" +
                      "<td></td>" +
                      "<td></td>" +
                      "<td></td>" +
                      "<td id='1-"  + fieldId + "' class='mdl-datepicker-clickable mdl-datepicker' style='cursor:pointer;'>1</td>" +
                     "</tr>";
        first_day_second_week = 2;
        break;
    } //get first row
    var dayCount = 0;
    var tempRow = ""
    for (calendarLoop = first_day_second_week; calendarLoop <= lastDayOfMonth; calendarLoop++){
      if (dayCount < 7){
        tempRow += "<td id='" + calendarLoop + "-"  + fieldId + "' class='mdl-datepicker-clickable mdl-datepicker' style='cursor:pointer;'>" + calendarLoop + "</td>";
        dayCount++
      } else {
        remaining_rows += "<tr>" + tempRow + "</tr>";
        tempRow = "<td id='" + calendarLoop + "-"  + fieldId + "' class='mdl-datepicker-clickable mdl-datepicker' style='cursor:pointer;'>" + calendarLoop + "</td>";
        dayCount = 1;
      }
    }

    remaining_rows += "<tr>" + tempRow + "</tr>";
    $("#mdl-datepicker-calendar-" + fieldId).append(first_row + " " + remaining_rows);
    if (current_viewed_month == moment().format("M")){
      $("#" + moment().format("D") + "-" + fieldId).addClass("mdl-datepicker-today");
    }
    $(".mdl-datepicker-clickable").click(function(incoming){
      var stringDate = current_viewed_year + "-" + current_viewed_month + "-" + incoming.currentTarget.id;
      selected_date = moment(stringDate, ["YYYY-M-D"]).format("ddd, MMM D")
      $("#mdl-datepicker-year-" + fieldId).text(current_viewed_year);
      $("#mdl-datepicker-selected-date-" + fieldId).text(selected_date);
    });
  }//end of buildCalendar
}
