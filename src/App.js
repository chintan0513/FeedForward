import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import VolunteerForm from './components/VolunteerForm';
import '/styles.css';

const App = () => {
  return (
    <div>
      <VolunteerForm />
    </div>
  );
};

export default App;
