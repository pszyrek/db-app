import moment from 'moment'

import { holidays } from 'assets/holidays'
import { quarters } from 'assets/quarters'

export const generateCalendar = () => {
    let months = []
    for (let month = 1; month <= 12; month++) {
        const yearAgo = moment().subtract(1, 'years').format('YYYY')
        let monthObject = { strength: 0, days: [] }
        for (
            let day = 1;
            day <=
            moment(
                `${month === 12 && yearAgo}-${month}`,
                'YYYY-MM'
            ).daysInMonth();
            day++
        ) {
            const dayWithMonth = moment(`${month}-${day}`).format('MM-DD')
            const date = moment(`${month === 12 && yearAgo}-${month}-${day}`)

            const isHoliday =
                !!holidays[dayWithMonth] || date.format('dddd') === 'Sunday'

            if (!isHoliday) {
                monthObject.strength += 8
            }

            monthObject.days.push({
                name: date.format('dddd'),
                date: date.format('YYYY-MM-DD'),
                isHoliday,
            })
        }
        months.push(monthObject)
    }

    const quartersStrengths = quarters.reduce((acc, quarter, index) => {
        quarter.forEach((monthIndex) => {
            if (!acc[`quarter-${index + 1}`]) {
                acc[`quarter-${index + 1}`] = months[monthIndex].strength
            }
            acc[`quarter-${index + 1}`] += months[monthIndex].strength
        })
        return acc
    }, {})

    return { months, quartersStrengths }
}
