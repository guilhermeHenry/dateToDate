const regex = require('./formats');

// loadash
const foreach = require('lodash/forEach');
const orderBy = require('lodash/orderBy');

/**
 * @string date: 10/10/2020
 * @string format: dd/mm/yyyy
 */
module.exports = function (date, format) {
    let formatRegex = format.replace(/\//g, "\\/");
    let indexMapDate = [];

    foreach(regex, function (timeValue, timeName) {
        foreach(timeValue, (regexValue, regexName) => {
            let position = format.indexOf(regexName);
            if (position > -1){
                indexMapDate.push({position: position, name: timeName});
                formatRegex = formatRegex.replace(regexName, regex[timeName][regexName]);
            }
        });
    });

    formatRegex = new RegExp('^' + formatRegex + '$');

    const resultMatch = date.match(formatRegex);
    const valid = resultMatch ? true : false;
    const isValid = () => valid;

    let objResult = {};

    if (valid){
        orderBy(indexMapDate, 'position', 'asc').forEach(function (value, index) {
            objResult[value.name] = resultMatch[index + 1];
        });
    }

    const result = setDateFormat(objResult);
    return {
        isValid,
        date(){
            return result
        }
    }
}

function setDateFormat(date) {
   const event = new Date;

   if (date.hasOwnProperty('years')){
       event.setFullYear(date.years);
   }

   if (date.hasOwnProperty('months')){
       event.setMonth(date.months - 1);
   }

   if (date.hasOwnProperty('days')){
       event.setDate(date.days);
   }

   if (date.hasOwnProperty('hours')){
       event.setHours(date.hours);
   }

   if (date.hasOwnProperty('minutes')){
       event.setMinutes(date.minutes);
   }

   if (date.hasOwnProperty('seconds')){
       event.setSeconds(date.seconds);
   }

   return event;
}