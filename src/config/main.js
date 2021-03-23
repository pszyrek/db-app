import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { Callendar } from 'components'

import { workers } from './workers'

const Table = styled.div`
    display: flex;
    flex-direction: column;
`

const TableHeader = styled.div`
    font-weight: 400;
    text-transform: capitalize;
    font-size: 1.5rem;
`

const TableWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const TableContent = styled.div`
    display: grid;
    padding: 10px;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 10px;

    & > div {
        padding: 10px;
        border: 1px solid black;
    }
`

const App = () => {
    const [locStaff, setLocStaff] = useState([])
    const [manStaff, setManStaff] = useState([])

    const generateLocStaff = (index) => {
        return workers.reduce((acc, worker) => {
            if (acc.length === 5 || worker.busy) {
                return acc
            }

            if (
                worker.permission === 1 ||
                worker.permission === 4 ||
                worker.permission === 6 ||
                worker.permission === 9
            ) {
                worker.busy = true
                worker.shift = index
                acc.push(worker)
            }

            return acc
        }, [])
    }

    const generateManStaff = (index) => {
        return workers.reduce((acc, worker) => {
            if (acc.length === 5 || worker.busy) {
                return acc
            }

            if (worker.permission >= 3) {
                worker.busy = true
                worker.shift = index
                acc.push(worker)
            }

            return acc
        }, [])
    }

    useEffect(() => {
        setLocStaff([
            generateLocStaff(0),
            generateLocStaff(1),
            generateLocStaff(2),
        ])
        setManStaff([
            generateManStaff(0),
            generateManStaff(1),
            generateManStaff(2),
        ])
    }, [])

    return (
        <div>
            <Callendar />

            <TableWrapper>
                <h1>Grupa maszynistów</h1>
                <Table>
                    {locStaff.map((shift, index) => (
                        <>
                            <TableHeader>{`zmiana nr. ${
                                index + 1
                            }`}</TableHeader>
                            <TableContent>
                                {shift.map((worker) => (
                                    <div>
                                        {worker.name} {worker.surname}
                                    </div>
                                ))}
                            </TableContent>
                        </>
                    ))}
                </Table>
            </TableWrapper>

            <TableWrapper>
                <h1>Grupa manewrowa</h1>
                <Table>
                    {manStaff.map((shift, index) => (
                        <>
                            <TableHeader>{`zmiana nr. ${
                                index + 1
                            }`}</TableHeader>
                            <TableContent>
                                {shift.map((worker) => (
                                    <div>
                                        {worker.name} {worker.surname}
                                    </div>
                                ))}
                            </TableContent>
                        </>
                    ))}
                </Table>
            </TableWrapper>
        </div>
    )
}

export default App
