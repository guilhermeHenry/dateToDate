const regex = {};

// ################ Seconds
regex.seconds = {
    s: '([0-5]?\\d)'
};

// ################ Minutes
regex.minutes = {
    i: '([0-5]?\\d)'
};

// ################ Hours
regex.hours = {
    H: '(20|21|22|23|[0-1]?\\d)'
};

// ################ Days
regex.days = {
	D: '([012][0-9]|3[01])',       // Dia do mês, 2 dígitos com zero à esquerda      01 até 31
	dd: '([1-9]|[012][0-9]|3[01])' // Dia do mês sem zero à esquerda                  1 até 31
}

// ################ Months
regex.months = {
	mm: '([0]{0,1}[1-9]|1[012])'
};

// ################ Years
regex.years = {
    yyyy: '(\\d\\d\\d\\d)', // Uma representação de ano completa, 4 dígitos Exemplos: 1999 ou 2003
       Y: '(\\d\\d\\d\\d)' // Uma representação de ano completa, 4 dígitos Exemplos: 1999 ou 2003
};

module.exports = regex;


























