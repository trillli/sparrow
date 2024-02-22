import React from 'react'
import { IAlarmMetadata } from './types/IAlarmMetadata'
import ITrillliConfig from 'trillli/src/types/ITrillliConfig'
import { Accordion, AccordionDetails, Box } from '@mui/material'
import AlarmConfigCategoryDetailBodyLightBrightness from './AlarmConfigCategoryDetailBodyLightBrightness'
import AlarmConfigCategoryDetailBodyLightColor from './AlarmConfigCategoryDetailBodyLightColor'
import AlarmConfigCategoryDetailBodyLightStart from './AlarmConfigCategoryDetailBodyLightStart'
import AlarmConfigCategoryHeader from './AlarmConfigCategoryHeader'

interface AlarmConfigGroupLightProps {
    alarm: IAlarmMetadata
    appConfig: ITrillliConfig
    handlers: { [key: string]: Function }
    setters: { [key: string]: Function }
    lightColor: number
    onColorSliderChange: Function
}

const AlarmConfigGroupLight: React.FC<AlarmConfigGroupLightProps> = ({alarm, appConfig, handlers, setters, lightColor, onColorSliderChange}) => {

    const [groupEnabled, setGroupEnabled] = React.useState<boolean>(true)

    const handleGroupEnableToggle = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        const checked: boolean = event.target.checked
        setGroupEnabled(checked)
    }

    return (
        <Accordion
            key={alarm.id}
            id={`alarm_config_group_light_${alarm.id}`}
            className='alarm-config-category-container'
            elevation={0}
            square={true}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '0px',
                background: 'none',
                '& .MuiAccordionSummary-content': {
                    margin: '0px'
                },
                '&::before': {
                    display: 'none'
                }
            }}
        >
            <AlarmConfigCategoryHeader
                groupLabel='Sunlight'
                icon='wb_twilight'
                groupEnabled={groupEnabled}
                toggleHandler={handleGroupEnableToggle}
            />

            <AccordionDetails className='alarm-config-container'
                sx={{
                    background: '#FFFFFF57',
                    padding: '1.25rem 1rem',
                }}
            >
                <Box className='configuration-details-container'
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        rowGap: '2rem'
                    }}
                >
                    <AlarmConfigCategoryDetailBodyLightStart alarm={alarm} appConfig={appConfig} lightColor={lightColor} />
                    <AlarmConfigCategoryDetailBodyLightColor alarm={alarm} appConfig={appConfig} lightColor={lightColor} onColorSliderChange={onColorSliderChange} />
                    <AlarmConfigCategoryDetailBodyLightBrightness alarm={alarm} appConfig={appConfig} />
                </Box>
            </AccordionDetails>

        </Accordion>
    )

}

export default AlarmConfigGroupLight