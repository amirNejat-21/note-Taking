import React from 'react';
import { Typography,AppBar, CssBaseline, } from "@mui/material"
import { useTranslation } from 'react-i18next';

 
function Header(): JSX.Element {
  const { t } = useTranslation();

  return(
    <>
      <CssBaseline/>
      <AppBar position='relative'>
        <Typography variant='h6' align='center'>  {t('footer')}</Typography>
        </AppBar>
  
    </>
    )
  }

export default Header;