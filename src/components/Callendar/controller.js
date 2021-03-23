import moment from 'moment'

export const generateCalendar = () => {
    let months = []
    for (let month = 1; month <= 12; month++) {
        let days = []
        for (
            let day = 1;
            day <= moment(`2021-${month}`, 'YYYY-MM').daysInMonth();
            day++
        ) {
            const date = moment(`2021-${month}-${day}`)
            days.push({
                name: date.format('dddd'),
                date: date.format('YYYY-MM-DD'),
            })
        }
        months.push(days)
    }
    return months
}
