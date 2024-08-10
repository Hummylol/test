import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CodeEditor from './components/CodeEditor'
import AllNotes from './components/AllNotes';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CodeEditor />} />
        <Route path="/all-notes" element={<AllNotes />} />
      </Routes>
    </Router>
  );
};

export default App;
