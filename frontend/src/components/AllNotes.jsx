import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';

const AllNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("https://test-ex2u.onrender.com/api/allnotes");
        const data = await response.json();

        console.log('Fetched data:', data);

        if (response.ok) {
          setNotes(data.notes || data);
        } else {
          setError(data.message || 'Failed to fetch notes');
        }
      } catch (error) {
        setError('An error occurred while fetching notes.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const handleDelete = async (noteId) => {
    try {
      const response = await fetch(`https://test-ex2u.onrender.com/api/allnotes/${noteId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setNotes(notes.filter(note => note._id !== noteId));
        toast.success('Note deleted successfully!');
      } else {
        const result = await response.json();
        setError(result.message || 'Failed to delete note');
      }
    } catch (error) {
      setError('An error occurred while deleting the note.');
    }
  };

  const handleCopy = (content) => {
    navigator.clipboard.writeText(content)
      .then(() => {
        toast.success('Note copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy note: ', err);
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <Toaster />
      <div className="nav-space"><button className="all-notes" onClick={() => navigate('/')}>ADD NOTE</button></div>
      <div className="notes-container">
        {notes.length > 0 ? (
          notes.map((note) => (
            <div key={note._id} className="note-block">
              <h2 className="note-title">{note.title}</h2>
              <pre className="note-content">{note.content}</pre>
              <button className="delete" onClick={() => handleDelete(note._id)}>Delete</button>
              <button className="copy" onClick={() => handleCopy(note.content)}>Copy</button>
            </div>
          ))
        ) : (
          <p>No notes available</p>
        )}
      </div>
    </>
  );
};

export default AllNotes;
