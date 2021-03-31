export const day = {
    isHoliday: true,
    man: ['id_pracownika', '...'],
    loc: ['id_pracownika', '...'],
}

export const worker = {
    id: 'id_pracownika',
    name: 'imię',
    surname: 'nazwisko',
    strength: 8,
    holidays: [{ startDate: 'początek_urlopu', endDate: 'koniec_urlopu' }, {}],
    premission: 1,
    preferences: ['id_pracownika'],
    shift: 3,
    active: true,
}

export const workers = {
    id_pracownika: worker,
}

export const week = {
    dzien_tygodnia: day,
}
