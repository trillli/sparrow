import { Accordion, AccordionDetails, Box } from '@mui/material'
import React from 'react'
import ITrillliConfig from 'src/tr/types/ITrillliConfig'
import AlarmConfigCategoryDetailBodyVibration from './AlarmConfigCategoryDetailBodyVibration'
import AlarmConfigCategoryDetailBodyVibrationStart from './AlarmConfigCategoryDetailBodyVibrationStart'
import AlarmConfigCategoryHeader from './AlarmConfigCategoryHeader'
import { IAlarmMetadata } from './types/IAlarmMetadata'

interface AlarmConfigGroupVibrationProps {
    alarm: IAlarmMetadata
    appConfig: ITrillliConfig
    handlers: { [key: string]: Function }
    setters: { [key: string]: Function }
    lightColor: number
}

const AlarmConfigGroupVibration: React.FC<AlarmConfigGroupVibrationProps> = ({ alarm, appConfig, handlers, setters, lightColor }) => {

    // State Variables & Related ------------------------------------------------------------------ //
    const [groupEnabled, setGroupEnabled] = React.useState<boolean>(alarm.vibration.enabled)

    // Effects & Related -------------------------------------------------------------------------- //
    React.useEffect(() => {
        alarm.vibration.enabled = groupEnabled
        handlers.updateAlarmsMetadata(alarm.id, alarm)
    }, [groupEnabled])

    // Event Handlers & Related ------------------------------------------------------------------- //
    const handleGroupEnableToggle = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        const checked: boolean = event.target.checked
        setGroupEnabled(checked)
    }

    // Other vars, util functions, etc ------------------------------------------------------------ //

    return (
        <Accordion
            key={alarm.id}
            id={`alarm_config_group_vibration_${alarm.id}`}
            className='alarm-config-category-container'
            elevation={0}
            disableGutters={true}
            square={true}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '0px',
                background: 'none',
                '& .MuiAccordionSummary-content': {
                    margin: '0px',
                    marginRight: '.25rem'
                },
                '&::before': {
                    display: 'none'
                }
            }}
        >
            <AlarmConfigCategoryHeader
                appConfig={appConfig}
                groupLabel='Vibration'
                icon='vibration'
                groupEnabled={groupEnabled}
                toggleHandler={handleGroupEnableToggle}
            />

            <AccordionDetails className='alarm-config-container'
                sx={{
                    padding: '0px'
                }}
            >
                <Box className='configuration-details-container'
                    sx={{
                        padding: '1.5rem 1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        rowGap: '2rem'
                    }}
                >
                    <AlarmConfigCategoryDetailBodyVibrationStart alarm={alarm} appConfig={appConfig} handlers={handlers} lightColor={lightColor} />
                    <AlarmConfigCategoryDetailBodyVibration alarm={alarm} appConfig={appConfig} handlers={handlers} />
                </Box>
            </AccordionDetails>

        </Accordion>
    )


}

export default AlarmConfigGroupVibration