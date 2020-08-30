const dateFormatValidate = require('./js/dateFormatValidate');
const debounce = require('lodash/debounce');
const find = require('lodash/find');

// ## EXEMPLE
let output = document.getElementById('output');
let input = document.getElementById('input');

if (input && output){
    input.addEventListener("keyup", debounce(function(event) {
        try{
            let format = dateFormatValidate(this.value, 'dd/mm/yyyy H:i');

            // let message = 'Será publicado em ' + format.countdown();
            let message = 'Foi publicado há ' + format.countup();
                message += ' - ' + format.ascendant;

            output.innerHTML = message;
        }catch(err){
            output.innerHTML = err.message;
        }
    }, 300));
}