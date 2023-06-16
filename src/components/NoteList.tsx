import Note from './Note';
import { makeStyles } from '@material-ui/core/styles';




const useStyles = makeStyles((theme) => ({
  all_notes:{
    // width:"100%" ,
    marginTop: "130px",
    marginLeft: "50px",
    position:"relative",
    display: "flex",
    flexWrap: "wrap"
  },
 
}));

interface NoteListProps {
  notes: { id: string, title: string, text: string }[];
  onEditNote: (note: { id: string, title: string, text: string }) => void;
  onDeleteNote: (id: string) => void;
}

function NoteList({ notes, onEditNote, onDeleteNote }: NoteListProps): JSX.Element {
  const renderNotes = notes.map(({ id, title, text }) => (
    <Note
      key={id}
      id={id}
      title={title}
      text={text}
      onEditNote={onEditNote}
      onDeleteNote={onDeleteNote}
    />
  ));
  const classes = useStyles();

  return <section className={classes.all_notes}>{renderNotes}</section>;
}

export default NoteList;