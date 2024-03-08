import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import React from 'react';
import ITrillliConfig from 'src/tr/types/ITrillliConfig';

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
                '&.MuiAccordion-root': {
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