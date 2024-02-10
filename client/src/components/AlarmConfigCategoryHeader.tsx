import { AccordionSummary, Box, Typography, Switch } from '@mui/material'
import React from 'react'


<AccordionSummary className='alarm-config-category-header' expandIcon={<ExpandMoreIcon />} >
                            <Box className='category-header-primary'>
                                <WbTwilightIcon />
                                <Typography>Sunlight</Typography>
                            </Box>
                            <Box className='category-header-secondary'>
                                <Switch onClick={handleCategorySwitchClick}/>
                            </Box>
                        </AccordionSummary>