import moment from 'moment'

import { holidays } from 'assets/holidays'
import { quartersRange } from 'assets/quarters'

export const generateCalendar = () => {
    let months = []
    for (let month = 1; month <= 12; month++) {
        const yearAgo = moment().subtract(1, 'years').format('YYYY')
        const thisYear = moment().format('YYYY')
        const monthName = moment(`${month}`, 'MM').format('MMMM')
        const monthObject = { strength: 0, days: [], name: monthName }
        for (
            let day = 1;
            day <=
            moment(
                `${month === 12 ? yearAgo : thisYear}-${month}`,
                'YYYY-MM'
            ).daysInMonth();
            day++
        ) {
            const dayWithMonth = moment(`${month}-${day}`).format('MM-DD')
            const date = moment(
                `${month === 12 ? yearAgo : thisYear}-${month}-${day}`
            )

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

    const quarters = quartersRange.reduce((acc, quarter, index) => {
        const quarterObject = {
            number: index + 1,
            range: quarter,
            strength: 0,
        }

        quarter.forEach((monthIndex) => {
            quarterObject.strength += months[monthIndex].strength
            months[monthIndex].quarter = quarterObject.number
        })

        acc.push(quarterObject)

        return acc
    }, [])

    return { months, quarters }
}
