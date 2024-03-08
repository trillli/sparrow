import { Accordion, AccordionDetails, Box } from '@mui/material'
import React from 'react'
import ITrillliConfig from 'src/tr/types/ITrillliConfig'
import AlarmConfigCategoryDetailBodyLightBrightness from './AlarmConfigCategoryDetailBodyLightBrightness'
import AlarmConfigCategoryDetailBodyLightColor from './AlarmConfigCategoryDetailBodyLightColor'
import AlarmConfigCategoryDetailBodyLightStart from './AlarmConfigCategoryDetailBodyLightStart'
import AlarmConfigCategoryHeader from './AlarmConfigCategoryHeader'
import { IAlarmMetadata } from './types/IAlarmMetadata'

interface AlarmConfigGroupLightProps {
    alarm: IAlarmMetadata
    appConfig: ITrillliConfig
    handlers: { [key: string]: Function }
    setters: { [key: string]: Function }
    lightColor: number
    onColorSliderChange: Function
    onColorSliderChangeCommitted: Function
}

const AlarmConfigGroupLight: React.FC<AlarmConfigGroupLightProps> = ({ alarm, appConfig, handlers, setters, lightColor, onColorSliderChange, onColorSliderChangeCommitted }) => {

    //sv
    const [groupEnabled, setGroupEnabled] = React.useState<boolean>(alarm.light.enabled)

    //ef
    React.useEffect(() => {
        alarm.light.enabled = groupEnabled
        handlers.updateAlarmsMetadata(alarm.id, alarm)
    }, [groupEnabled])

    //ha
    const handleGroupEnableToggle = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        const checked: boolean = event.target.checked
        setGroupEnabled(checked)
    }

    //other

    return (
        <Accordion
            key={alarm.id}
            id={`alarm_config_group_light_${alarm.id}`}
            className='alarm-config-category-container'
            disableGutters={true}
            elevation={0}
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
                groupLabel='Sunlight'
                icon='wb_twilight'
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
                    <AlarmConfigCategoryDetailBodyLightStart alarm={alarm} appConfig={appConfig} handlers={handlers} lightColor={lightColor} />
                    <AlarmConfigCategoryDetailBodyLightColor alarm={alarm} appConfig={appConfig} lightColor={lightColor} onColorSliderChange={onColorSliderChange} onColorSliderChangeCommitted={onColorSliderChangeCommitted} />
                    <AlarmConfigCategoryDetailBodyLightBrightness alarm={alarm} appConfig={appConfig} handlers={handlers} />
                </Box>
            </AccordionDetails>

        </Accordion>
    )

}

export default AlarmConfigGroupLight