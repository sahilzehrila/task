// src/App.js
import React from 'react';
import DynamicForm from './DynamicForm';

const fields = [
  {
    id: '1',
    name: 'username',
    type: 'text',
    required: true,
    regex: '\\w+',
  },
  {
    id: '2',
    name: 'password',
    type: 'password',
    required: true,
    regex: '.{8,}',
  },
  {
    id: '3',
    name: 'gender',
    type: 'radio',
    options: [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' },
      { label: 'Other', value: 'other' },
    ],
    required: true,
  },
  {
    id: '4',
    name: 'skills',
    type: 'checkbox',
    options: [
      { label: 'React', value: 'react' },
      { label: 'Angular', value: 'angular' },
      { label: 'Vue', value: 'vue' },
    ],
  },
  {
    id: '5',
    name: 'avatar',
    type: 'fileupload',
    required: true,
    fileFormatSupported: ['.jpg', '.jpeg', '.png'],
  },
];

function App() {
  return (
    <div className="App">
      <h1>Dynamic Form Example</h1>
      <DynamicForm fields={fields} />
    </div>
  );
}

export default App;
