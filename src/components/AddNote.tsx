
import { useState, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  Button,
  Typography,
  Box,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  input: {
    border: "2px solid black",
    borderRadius: "5px",
    margin: theme.spacing(1, 0),
  },
  btn: {
    padding: "10px",
    backgroundColor: "#1976d2",
    borderRadius: "5px",
    color: "white",
    margin: theme.spacing(2, 0, 0, 2),
    width: '200px',
    '&:hover': {
      backgroundColor: '#115293',
    },
  },
  addNote: {
    padding: '10px',
    marginTop: theme.spacing(4),
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.15)",
    backgroundColor: "white",
    maxWidth: '600px',
    margin: '0 auto',
    '& h2': {
      textAlign: 'center',
      marginBottom: theme.spacing(2),
      fontSize: "50px",
    },
    '& form': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    '& .MuiTextField-root': {
      width: '100%',
      margin: theme.spacing(1, 0),
    },
    '& .error': {
      color: 'red',
      marginTop: theme.spacing(1),
      textAlign: 'center',
    },
  },
}));

interface AddNoteProps {
  onAddNote: (note: { title: string, text: string }) => void;
}

function AddNote({ onAddNote }: any) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [titleError, setTitleError] = useState('');
  const [textError, setTextError] = useState('');

  const { t } = useTranslation();
  const classes = useStyles();

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    if (!title) {
      setTitleError('titleRequired');
    } else {
      setTitleError('');
    }
    if (!text) {
      setTextError('textRequired');
    } else {
      setTextError('');
    }
    if (title && text) {
      onAddNote({
        title: title,
        text: text,
      });
      setTitle('');
      setText('');
    }
  };

  return (
    <Box className={classes.addNote}>
      <Typography variant="h2">{t('addNote')}</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          id="title"
          label={t('noteTitle')}
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={!!titleError}
          helperText={titleError && t(titleError)}
        />
        <TextField
          id="text"
          label={t('noteContent')}
          variant="outlined"
          value={text}
          onChange={(e) => setText(e.target.value)}
          multiline
          rows={4}
          error={!!textError}
          helperText={textError && t(textError)}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.btn}
        >
          {t('save')}
        </Button>
      </form>
    </Box>
  );
}

export default AddNote;