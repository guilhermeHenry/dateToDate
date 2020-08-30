const validate = require('./validate');

module.exports = function (date, format) {
    const check = validate(date, format);

    if (!check.isValid()){
        throw new SyntaxError(`Data inválida. deve esta no formato ${format}`);
    }

    let time  = check.date();
    let now   = Date.now();
    let today = new Date();

    // #####
    let years   = null   // 31.104.000.000‬ = 1000 * 60 * 60 * 24 * 360 (years)
    let months  = null;  //  2.592.000.000 = 1000 * 60 * 60 * 24 * 30  (months)
    let days    = null;  //     86.400.000 = 1000 * 60 * 60 * 24       (days)
    let hours   = null;  //      3.600.000 = 1000 * 60 * 60            (hours)
    let minutes = null;  //         60.000 = 1000 * 60                 (minutes)

    let ascendant  = time.getTime() > now;
    let decrescent = time.getTime() < now;
    let interval   = ascendant ? time.getTime() - now : now - time.getTime();

    let minutesMin = 1000 * 60;
    let hoursMin   = minutesMin * 60;
    let daysMin    = hoursMin * 24;
    let monthsMin  = daysMin * 30;
    let yearsMin   = daysMin * 360;

    /** ######## MONTHS */
    if (interval > monthsMin){
        const monthsOfYears = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        const start = today.getMonth() > time.getMonth() ? time.getMonth() : today.getMonth();
        const final = today.getMonth() < time.getMonth() ? time.getMonth() : today.getMonth();

        monthsOfYears.slice(start, final + 1).forEach(item => {
            let calc = 1000 * 60 * 60 * 24 * item;
            if (interval >= calc){
                months++;
                interval -= calc;
            }
        });
    }

    /** ######## YEARS */
    if (interval >= yearsMin){
        years = Math.floor(interval / yearsMin);
        interval = interval - years * yearsMin;
    }

    /** ######## DAYS */
    if (interval >= daysMin){
        days = Math.floor(interval / daysMin);
        interval = interval - days * daysMin;
    }

    /** ######## HOURS */
    if (interval >= hoursMin){
        hours = Math.floor(interval  / hoursMin);
        interval = interval - hours * hoursMin;
    }

    /** ######## MINUTES */
    if (interval > 0){
        minutes = Math.ceil(interval  / minutesMin);
    }

    const count = function() {

        if (months){
            return `${months} mese${plural(months)}`;
        }

        if (days){
            return `${days} dia${plural(days)}`;
        }

        if (hours){
            return `${hours} hora${plural(hours)}`
        }

        if (minutes){
            return `${minutes} minuto${plural(minutes)}`
        }
    }

    const plural = (param) => param > 1 ? 's' : '';
    const countup = function () {
        if (!ascendant){
            throw new SyntaxError(`Data inválida. A data deve ser maior do que agora!`);
        }

        return count();
    }

    const countdown = function () {
        if (!decrescent){
            throw new SyntaxError(`Data inválida. A data deve ser menor do que agora!`);
        }

        return count();
    }

    const order = function () {
        if (ascendant){
            return 'ascendant';
        }

        if (decrescent){
            return 'decrescent';
        }

        return null;
    }

    return {countup, countdown, count, order, ascendant, decrescent}
}