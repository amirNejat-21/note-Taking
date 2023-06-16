import { render, screen, fireEvent } from '@testing-library/react';
import AddNote from '../AddNote';

describe('AddNote', () => {
  test('renders correctly', () => {
    render(<AddNote onAddNote={() => {}} />);
    const titleInput = screen.getByLabelText('Note Title:');
    const contentInput = screen.getByLabelText('Note Content:');
    const saveButton = screen.getByRole('button', { name: 'Save' });
    expect(titleInput).toBeInTheDocument();
    expect(contentInput).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
  });

  test('calls onAddNote with correct arguments on form submission', () => {
    const onAddNoteMock = jest.fn();
    render(<AddNote onAddNote={onAddNoteMock} />);
    const titleInput = screen.getByLabelText('Note Title:');
    const contentInput = screen.getByLabelText('Note Content:');
    const saveButton = screen.getByRole('button', { name: 'Save' });
    fireEvent.change(titleInput, { target: { value: 'New Note' } });
    fireEvent.change(contentInput, { target: { value: 'New Content' } });
    fireEvent.click(saveButton);
    expect(onAddNoteMock).toHaveBeenCalledTimes(1);
    expect(onAddNoteMock).toHaveBeenCalledWith({ title: 'New Note', text: 'New Content' });
  });
});