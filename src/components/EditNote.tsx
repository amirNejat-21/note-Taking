import { useState, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';


import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  editNote: {
    padding: '10px 20px',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.15)',
    '& form div': {
      display: 'flex',
      flexDirection: 'column',
      '& input': {
        height: '30px',
        fontSize: '20px',
        fontFamily: 'Roboto, Arial',
        fontWeight: 300,
      },
      '& textarea': {
        height: '100px',
        fontSize: '20px',
        fontFamily: 'Roboto, Arial',
        fontWeight: 300,
      },
    },
    '& div.text': {
      marginTop: '20px',
    },
    '& button': {
      marginTop: '20px',
      padding: '5px 10px',
      width: '100px',
      fontSize: '15px',
      cursor: 'pointer',
    },
  },
}));


interface EditNoteProps {
  id: string;
  title: string;
  text: string;
  onEditNote: (note: { id: string, title: string, text: string }) => void;
}

function EditNote({ id, title, text, onEditNote }: EditNoteProps) {
  const classes = useStyles();
  const { t } = useTranslation();

  const [editTitle, setTitle] = useState(title);
  const [editText, setText] = useState(text);

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    onEditNote({ id: id, title: editTitle, text: editText });
  };

  return (
    <Paper className={classes.editNote}>
      <form onSubmit={handleSubmit}>
      <div>
          <TextField
            id="title"
            label={t('noteTitle')}
            variant="outlined"
            fullWidth
            margin="normal"
            type="text"
            placeholder="Title"
            value={editTitle}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="text"
            label={t('noteContent')}
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            margin="normal"
            placeholder="Text"
            value={editText}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="text">
        <Button variant="contained" color="primary" type='submit'>
        {t('save')}
          </Button>
        </div>
      </form>
    </Paper>
  );
}

export default EditNote;