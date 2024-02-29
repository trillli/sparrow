


<Box 
        className='alarm-config-category-detail-field-container'
        sx={{
            borderLeft: `5px solid ${appConfig.theme.palette.primary.dark[4]}`,
            paddingTop: '.375rem',
            paddingBottom: '.25rem'
        }}
        >
        <AlarmConfigCategoryDetailHeader label={fieldLabel} />
        <Box className='alarm-config-category-detail-field-contents-container'>
            <TrSlider
                value={lightAdvanceMinutes}
                min={-30}
                max={30}
                marks={[{value: 0, label: 'Alarm Time'}]}
                onChange={handleLightAdvanceMinutesSliderChange}
                onChangeCommitted={handleLightAdvanceMinutesSliderChangeCommitted}
                sx={{
                    '& .MuiSlider-mark': {
                        transform: 'translate(-50%, -50%)',
                        height: '20px',
                        width: '20px',
                        borderRadius: '999px',
                        opacity: 1,
                        background: `hsl(${alarm.light.color.h}, 100%, 50%)`,
                        boxShadow: `0px 0px 0px 6px hsl(${alarm.light.color.h}, 100%, 50%, 58%)`,
                        color: 'blue'
                    },
                    '& .MuiSlider-markLabel': {
                        color: theme.palette.primary.main,
                        fontSize: '1.125rem'
                    }
                }}
            />
        </Box>
        </Box>