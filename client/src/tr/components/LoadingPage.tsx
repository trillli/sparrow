import React from "react";
import ITrillliConfig from "../types/ITrillliConfig";
import TrillliConfig from "./TrillliConfig";
import Box from "@mui/material/Box";
import LinearProgress from '@mui/material/LinearProgress';

interface LoadingPageProps {
  appConfig: ITrillliConfig
}

const LoadingPage: React.FC<LoadingPageProps> = ({ appConfig }) => {

  React.useEffect(() => {
    // //console.log('breakpoint here to pause for debugging on mount')
    return () => {
      // //console.log('breakpoint here to pause for debugging on unmount')
    };
  }, []);

  return (
    <>
      {appConfig.pages.loading.trBasic ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            height: '100vh',
            background: appConfig.theme.palette.background,
          }}
        >
          <Box
            sx={{
              width: '85vw',
              maxWidth: '350px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              rowGap: '3rem'
            }}
          >
            <Box
              className='loading-img-container'
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems:'center'
              }}
            >
              <img
                src={appConfig.logos.loading}
                style={{
                  maxWidth: '200px'
                }}
              />
            </Box>
            <Box
              className='loading-indicator-container'
              sx={{ 
                width: '100%' 
              }}>
              <LinearProgress 
                sx={{
                  height: '.75rem',
                  borderRadius: '4px',
                  background: appConfig.theme.palette.primary.dark[2],
                  '& .MuiLinearProgress-bar': {
                    background: appConfig.theme.palette.secondary.dark[4],
                    '&:nth-child(1)': {
                      background: appConfig.theme.palette.secondary.dark[2]
                    }
                  },
                }}
              />
            </Box>
          </Box>

        </Box>
      ) : (
        <>
          {appConfig.pages.loading.contents}
        </>
      )}
    </>

  );
};

export default LoadingPage
