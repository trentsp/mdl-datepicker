#mdl-datepicker
Simple javascript/jQuery based function that turns a form field into a popup datepicker similar to jQueryUI, but based on Google's Material Design Lite.

#Dependencies
- jQuery
- Material Design Lite (http://www.getmdl.io/)
- Moment.js (https://github.com/moment/momentjs.com)

#Usage
```javascript
  $("#date").mdldatepicker();
```
```html
  <div id="date_container" class="mdl-textfield mdl-js-textfield">
    <input class="mdl-textfield__input" type="text" id="date" readonly />
    <label class="mdl-textfield__label" id="date_label" for="date">Date</label>
  </div>
```

#What happens
When the user clicks on a date, the selected date is displayed at the top of the datepicker window. When "OK" is clicked, the date is inserted into the field to which the datepicker is attached.

#Screen shot
![mdl-datepicker] (https://cloud.githubusercontent.com/assets/6751732/9125927/1527c188-3c74-11e5-9b68-4004f388773a.png)
