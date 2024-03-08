import DirectionsRun from "@mui/icons-material/DirectionsRun";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import React from "react";
import { Link } from 'react-router-dom';
import ITrillliConfig from "../types/ITrillliConfig";
import TrillliPageBuilder from "./TrillliPageBuilder";


interface ErrorPage404Props {
  appConfig: ITrillliConfig
}

const ErrorPage404: React.FC<ErrorPage404Props> = ({ appConfig }) => {

  //sv

  //ef

  //ha

  //other

  return (
    <TrillliPageBuilder navTop appConfig={appConfig}>
      {appConfig.pages.notFound.trBasic ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '85vw',
            maxWidth: '650px',
            background: appConfig.theme.palette.primary.dark[1],
            marginLeft: 'auto',
            marginRight: 'auto',
            borderRadius: '4px',
            padding: '2rem 2rem'
          }}
        >
          <Box>
            <img
              src='/media/img/icon404.svg'
              style={{
                width: '100%',
                maxWidth: '150px'
              }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              rowGap: '1.75rem'
            }}
          >
            <Typography variant='h4'>Uh oh! Page not found.</Typography>
            <Button component={Link} to='/'
              sx={{
                background: appConfig.theme.palette.primary.dark[3],
                borderBottom: `3px solid ${appConfig.theme.palette.neutral.dark[3]}`,
                boxShadow: appConfig.theme.shadows[1],
                padding: '.5rem 1rem',
                '& .MuiSvgIcon-root': {
                  marginRight: '.75rem'
                },
                '&:hover': {
                  // background: 'red'
                  background: appConfig.theme.palette.primary.dark[4],
                  // color: appConfig.theme.palette.neutral.contrastText
                }
              }}
            >
              <DirectionsRun />
              <Typography>Take me home</Typography>
            </Button>
          </Box>
          <Box>
            {/* {appConfig.pages.notFound.contents} */}
          </Box>
        </Box>
      ) : (
        <>
          {appConfig.pages.notFound.contents}
        </>
      )}
    </TrillliPageBuilder>
  );
};

export default ErrorPage404;
