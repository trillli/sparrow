import React from 'react'
import { Box } from '@mui/material'
import { IAlarmMetadata } from './types/IAlarmMetadata'
import Alarm from './Alarm'
import ITrillliConfig from 'trillli/src/types/ITrillliConfig'
import AppConfig from 'src/AppConfig'

interface AlarmsListProps {
    alarms: IAlarmMetadata[]
    appConfig: ITrillliConfig
    handlers: {[key: string]: Function}
    setters: {[key: string]: Function}
    timeFormat24Hr: boolean
}

const AlarmsList: React.FC<AlarmsListProps> = ({alarms, appConfig, handlers, setters, timeFormat24Hr}) => {

    

    return (
        <Box
            id='alarms-list-outer'
            sx={{
                display: 'flex',
                flexDirection: 'column',
                // rowGap: '2em',
                marginTop: '2rem'
            }}
        >
            <Box
                id='alarms-list'
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '2rem',
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
                )):(<></>)}
            </Box>
        </Box>
    )
}

export default AlarmsList