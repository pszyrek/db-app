import React, { useEffect } from 'react'

import { generateCalendar } from './controller'

const Callendar = () => {
    useEffect(() => {
        console.log(generateCalendar())
    }, [])
    return <div></div>
}

export default Callendar
