// src/components/DynamicForm.js
import React, { useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const DynamicForm = ({ fields }) => {
  const fileInputRef = useRef(null); // Define a ref for the file input

  const formik = useFormik({
    initialValues: Object.fromEntries(
      fields.map((field) => [field.name, field.type === 'checkbox' ? [] : field.type === 'fileupload' ? null : ''])
    ),
    validationSchema: Yup.object().shape(
      Object.fromEntries(
        fields.map((field) => {
          let schema = Yup.string();
          if (field.required) {
            schema = schema.required(`${field.name} is required`);
          }
          if (field.regex) {
            schema = schema.matches(new RegExp(field.regex), `${field.name} is invalid`);
          }
          return [field.name, schema];
        })
      )
    ),
    onSubmit: (values) => {
      // Log the user data
      console.log('User Data:', values);
    },
  });

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <form onSubmit={formik.handleSubmit} style={{ marginBottom: '20px' }}>
        {fields.map((field) => (
          <div key={field.id} style={{ marginBottom: '10px' }}>
            {field.type === 'text' && (
              <input
                type="text"
                id={field.id}
                name={field.name}
                onChange={formik.handleChange}
                value={formik.values[field.name]}
                style={{ padding: '5px', width: '100%', borderRadius: '5px' }}
              />
            )}
            {field.type === 'password' && (
              <input
                type="password"
                id={field.id}
                name={field.name}
                onChange={formik.handleChange}
                value={formik.values[field.name]}
                style={{ padding: '5px', width: '100%', borderRadius: '5px' }}
              />
            )}
            {field.type === 'select' && (
              <select
                id={field.id}
                name={field.name}
                onChange={formik.handleChange}
                value={formik.values[field.name]}
                multiple={field.multipleSelect}
                style={{ padding: '5px', width: '100%', borderRadius: '5px' }}
              >
                {field.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
            {field.type === 'radio' && (
              <div>
                {field.options.map((option) => (
                  <label key={option.value} style={{ marginRight: '10px' }}>
                    <input
                      type="radio"
                      name={field.name}
                      value={option.value}
                      checked={formik.values[field.name] === option.value}
                      onChange={formik.handleChange}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            )}
            {field.type === 'checkbox' && (
              <div>
                <p style={{ margin: '5px 0' }}>{field.name}</p>
                {field.options.map((option) => (
                  <label key={option.value} style={{ marginRight: '10px' }}>
                    <input
                      type="checkbox"
                      name={field.name}
                      value={option.value}
                      checked={formik.values[field.name].includes(option.value)}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        const updatedSkills = isChecked
                          ? [...formik.values[field.name], option.value]
                          : formik.values[field.name].filter((value) => value !== option.value);
                        formik.setFieldValue(field.name, updatedSkills.join(', ')); // Convert array to string
                      }}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            )}
            {field.type === 'fileupload' && (
              <div style={{ marginBottom: '10px' }}>
                <input
                  type="file"
                  id={field.id}
                  name={field.name}
                  accept={field.fileFormatSupported.join(',')}
                  onChange={(event) => {
                    formik.setFieldValue(field.name, event.currentTarget.files[0]);
                  }}
                  style={{ display: 'none' }}
                  ref={fileInputRef} 
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()} 
                  style={{ padding: '5px 10px', borderRadius: '5px', background: 'blue', color: 'white', border: 'none', cursor: 'pointer' }}
                >
                  Choose File
                </button>
                {formik.values[field.name] && (
                  <p style={{ marginTop: '5px' }}>{formik.values[field.name].name}</p>
                )}
              </div>
            )}
            {formik.touched[field.name] && formik.errors[field.name] && (
              <div style={{ color: 'red' }}>{formik.errors[field.name]}</div>
            )}
          </div>
        ))}
        <button type="submit" style={{ padding: '10px 20px', borderRadius: '5px', background: 'blue', color: 'white', border: 'none', cursor: 'pointer' }}>Submit</button>
      </form>
      {/* Displaying input data */}
      <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px' }}>
        <h2>Input Data:</h2>
        <ul style={{ listStyleType: 'none', padding: '0' }}>
          {Object.entries(formik.values).map(([key, value]) => (
            key !== 'avatar' && (
              <li key={key}>
                <strong>{key}:</strong> {Array.isArray(value) ? value.join(', ') : value}
              </li>
            )
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DynamicForm;
