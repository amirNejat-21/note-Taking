

import { useTranslation } from 'react-i18next';

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  Button,
  Typography,
  Box,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: "relative",
    top: "250px"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: `2px solid ${theme.palette.primary.main}`,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxWidth: 400,
    width: '100%',
    '&:focus': {
      outline: 'none',
    },
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(2),
  },
  input: {
    width: '100%',
  },
  show_name: {
    marginTop: "50px",
    marginBottom: "150px",
    marginLeft: "45%"
  }
}));

function NameInput() {
  const classes = useStyles();
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [userName, setUserName] = useState('');

  const { t } = useTranslation();


  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setModalIsOpen(false);
      setUserName(storedName);
    }
  }, []);

  function handleSubmit(event:any) {
    event.preventDefault();
    localStorage.setItem('userName', userName);
    setModalIsOpen(false);
  }

  function handleInputChange(event:any) {
    setUserName(event.target.value);
  }

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className={classes.modal}
        // overlayClassName={classes.overlay}
      >
        <div className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            Welcome to My App
          </Typography>
          <Box component="form" onSubmit={handleSubmit} className={classes.form}>
            <TextField
              label="Please enter your name"
              variant="outlined"
              className={classes.input}
              InputLabelProps={{
                shrink: true,
              }}
              value={userName}
              onChange={handleInputChange}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              Save
            </Button>
          </Box>
        </div>
      </Modal>
      <Typography variant="h4" className={classes.show_name}>
        {t("hello")}, {userName || 'Guest'}!
      </Typography>
    </>
  );
}

export default NameInput;