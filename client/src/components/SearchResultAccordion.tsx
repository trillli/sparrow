import { Accordion, AccordionDetails, AccordionSummary, Box } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react'
import ITrillliConfig from 'src/tr/types/ITrillliConfig'

interface SearchResultAccordionProps {
    appConfig: ITrillliConfig
    label: string
    children: React.ReactNode
}

const SearchResultAccordion: React.FC<SearchResultAccordionProps> = ({ appConfig, label, children }) => {

    return (
        <Accordion
            disableGutters={true}
            elevation={0}
            sx={{
                background: 'none',
                // borderBottom: '1px solid #00000015',
                '&.MuiAccordion-root': {
                    // color: 'blue',
                    borderBottom: '1px solid #00000020'
                },
                '&:before': {
                    display: 'none'
                }
            }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                    padding: '.5rem 0rem',
                    paddingRight: '0rem',
                    minHeight: '0px'
                    // borderBottom: '1px solid #00000015'
                }}
            >
                {label}
            </AccordionSummary>
            <AccordionDetails
            sx={{padding: '0px'}}>
            {children}
            </AccordionDetails>
        </Accordion>
        
    )

}


export default SearchResultAccordion