import { Box } from '@mui/material'
import React from 'react'
import ITrillliConfig from 'src/tr/types/ITrillliConfig'
import Alarm from './Alarm'
import { IAlarmMetadata } from './types/IAlarmMetadata'

interface AlarmsListProps {
    alarms: IAlarmMetadata[]
    appConfig: ITrillliConfig
    handlers: { [key: string]: Function }
    setters: { [key: string]: Function }
    timeFormat24Hr: boolean
}

const AlarmsList: React.FC<AlarmsListProps> = ({ alarms, appConfig, handlers, setters, timeFormat24Hr }) => {

    // State Variables & Related ------------------------------------------------------------------ //

    // Effects & Related -------------------------------------------------------------------------- //

    // Event Handlers & Related ------------------------------------------------------------------- //

    // Other vars, util functions, etc ------------------------------------------------------------ //

    return (
        <Box
            id='alarms-list-outer'
            sx={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: '.5rem'
            }}
        >
            <Box
                id='alarms-list'
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '1.5rem',
                    '&>.MuiPaper-root': {
                        borderRadius: '4px',
                    },
                    '&>.MuiPaper-root::before': {
                        display: 'none'
                    }
                }}
            >
                {Object.keys(alarms).length > 0 ? alarms.map((alarm, index) => (
                    <Alarm
                        key={index}
                        alarm={alarm}
                        appConfig={appConfig}
                        handlers={handlers}
                        setters={setters}
                        timeFormat24Hr={timeFormat24Hr}
                    />
                )) : (<></>)}
            </Box>
        </Box>
    )
}

export default AlarmsList