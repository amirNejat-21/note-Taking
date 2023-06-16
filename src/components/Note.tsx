import React, { useState } from 'react';
import EditNote from './EditNote';
import { useTranslation } from 'react-i18next';


import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  note: {
    // display: 'flex',
    // flexDirection: 'column',
    flexShrink: 0,
    width: '290px',
    height: '300px',
    padding: '20px 10px',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.15)',
    marginRight: '60px',
    marginBottom: '20px',
  },
  noteHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
    borderBottom: '1px solid rgba(87, 87, 87, 0.5)',
    paddingBottom: '5px',
    '& h2': {
      fontSize: '18px',
      flex: 1,
    },
  },
  noteBody: {
    fontSize: '15px',
    fontWeight: 300,
  },
  button: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: 'opacity 0.15s',
    '&:hover': {
      opacity: 0.5,
    },
    '& img': {
      width: '30px',
      height: '30px',
    },
  },
}));






interface NoteViewProps {
  id: string;
  title: string;
  text: string;
  onEditNote: () => void;
  onDeleteNote: (id: string) => void;
}

function NoteView({ id, title, text, onEditNote, onDeleteNote }: NoteViewProps): JSX.Element {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Paper className={classes.note}>
        <div className={classes.noteHeader}>
        <Typography variant="h6">{t('noteTitle')}: {title}</Typography>
        <IconButton className={classes.button}>
          <EditIcon  onClick={onEditNote}/>
        </IconButton>
        <IconButton className={classes.button}>
          <DeleteIcon onClick={() => onDeleteNote(id)}/>
        </IconButton>
        {/* <p>Content: {text}</p> */}
      </div >
      <Typography className={classes.noteBody}>
      {t('noteContent')}: {text}
      </Typography>

        
     
      
    </Paper>
  );
}

interface EditNoteViewProps {
  id: string;
  title: string;
  text: string;
  onEditNote: (note: { id: string, title: string, text: string }) => void;
}

function EditNoteView({ id, title, text, onEditNote }: EditNoteViewProps): JSX.Element {
  return <EditNote id={id} title={title} text={text} onEditNote={onEditNote} />;
}

interface NoteProps {
  id: string;
  title: string;
  text: string;
  onEditNote: (note: { id: string, title: string, text: string }) => void;
  onDeleteNote: (id: string) => void;
}

function Note({ id, title, text, onEditNote, onDeleteNote }: NoteProps): JSX.Element {
  const [showEditNoteView, setEditNoteView] = useState(false);

  const handleEditNote = () => {
    setEditNoteView(!showEditNoteView);
  };

  const handleNoteEdit = (note: { id: string, title: string, text: string }) => {
    setEditNoteView(false);
    onEditNote(note);
  };

  const renderNoteView = !showEditNoteView ? (
    <NoteView
      id={id}
      title={title}
      text={text}
      onEditNote={handleEditNote}
      onDeleteNote={onDeleteNote}
    />
  ) : (
    <EditNoteView id={id} title={title} text={text} onEditNote={handleNoteEdit} />
  );

  return <>{renderNoteView}</>;
}

export default Note;