import React from 'react'
import { IAlarmMetadata } from './types/IAlarmMetadata'
import ITrillliConfig from 'trillli/src/types/ITrillliConfig'
import { Accordion, AccordionDetails, Box } from '@mui/material'
import AlarmConfigCategoryBody from './AlarmConfigCategoryBody'
import AlarmConfigCategoryHeader from './AlarmConfigCategoryHeader'
import AlarmConfigCategoryDetailOuter from './AlarmConfigCategoryDetailOuter'
import AlarmConfigCategoryDetailHeader from './AlarmConfigCategoryDetailHeader'
import AlarmConfigCategoryDetailBodySoundSearch from './AlarmConfigCategoryDetailBodySoundSearch'
import AlarmConfigCategoryDetailBodySoundVolume from './AlarmConfigCategoryDetailBodySoundVolume'

interface AlarmConfigGroupSoundProps {
    alarm: IAlarmMetadata
    appConfig: ITrillliConfig
    handlers: { [key: string]: Function }
    setters: { [key: string]: Function }
}

const AlarmConfigGroupSound: React.FC<AlarmConfigGroupSoundProps> = ({ alarm, appConfig, handlers, setters }) => {

    const [groupEnabled, setGroupEnabled] = React.useState<boolean>(alarm.sound.enabled)

    // console.log('in alarm')

    React.useEffect(() => {
        alarm.sound.enabled = groupEnabled
        handlers.updateAlarmsMetadata(alarm.id, alarm)
    }, [groupEnabled])

    const handleGroupEnableToggle = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        const checked: boolean = event.target.checked
        setGroupEnabled(checked)
    }

    return (
        <Accordion
            key={alarm.id}
            id={`alarm_config_group_sound_${alarm.id}`}
            className='alarm-config-category-container'
            elevation={0}
            square={true}
            sx={{
                transition: '200ms',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '0px',
                background: 'none',
                '& .MuiAccordionSummary-content': {
                    margin: '0px',
                    marginRight: '.25rem'
                },
                '&.Mui-expanded': {
                    background: '#ffffff2e',
                    // border: '5px solid red'
                },
                '&::before': {
                    display: 'none'
                }
            }}
        >
            <AlarmConfigCategoryHeader
                groupLabel='Music'
                icon='music_note'
                groupEnabled={groupEnabled}
                toggleHandler={handleGroupEnableToggle}
            />

            <AccordionDetails className='alarm-config-container'
                sx={{
                    // background: '#FFFFFF57',
                    padding: '1.25rem 1rem',
                }}
            >
                <Box className='configuration-details-container'
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        rowGap: '1rem'
                    }}
                >
                    <AlarmConfigCategoryDetailBodySoundSearch alarm={alarm} appConfig={appConfig} handlers={handlers} />
                    <AlarmConfigCategoryDetailBodySoundVolume alarm={alarm} appConfig={appConfig} handlers={handlers}/>
                </Box>
            </AccordionDetails>

        </Accordion>
    )

}

export default AlarmConfigGroupSound