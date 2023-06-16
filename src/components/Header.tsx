


import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  appHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    width: '100vw',
    
  },
  text: {
    marginLeft: 'auto',
    marginRight: 'auto',
    


    [theme.breakpoints.up('md')]: {
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '50%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '15%',
    },
  },
}));

function Header(): JSX.Element {
  const classes = useStyles();

  const { t } = useTranslation();
  return (
    <AppBar position="static" className={classes.appHeader}>
      <Toolbar>
        <Typography variant="h4" className={classes.text}>
          {t('appTitle')}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;