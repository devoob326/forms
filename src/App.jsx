import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const initialValues = { Firstname: "", lastname: "", email: "", contacts: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  useEffect(() => {
    const labels = document.querySelectorAll('.input_box label');
    labels.forEach(label => {
      label.innerHTML = label.innerText
        .split('')
        .map((letter, idx) => `<span style="transition-delay:${idx * 50}ms">${letter}</span>`)
        .join('');
    });

    return () => {
      labels.forEach(label => {
        label.innerHTML = label.innerText;
      });
    };
  }, []);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.Firstname) {
      errors.Firstname = "First name is required!";
    }

    if (!values.lastname) {
      errors.lastname = "Last name is required!";
    }

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "Email is not valid!";
    }

    if (!values.contacts) {
      errors.contacts = "Contact is required!";
    } else if (values.contacts.length < 10) {
      errors.contacts = "Contact is not 10 digit!";
    } else if (values.contacts.length > 10) {
      errors.contacts = "Contact is not 10 digit!";
    }

    return errors;
  };

  return (
    <section>
      <div className="colour"></div>
      <div className="colour"></div>
      <div className="colour"></div>
      <div className="box">
        <div className="square" style={{ "--i": 0 }}></div>
        <div className="square" style={{ "--i": 1 }}></div>
        <div className="square" style={{ "--i": 2 }}></div>
        <div className="square" style={{ "--i": 3 }}></div>
        <div className="square" style={{ "--i": 4 }}></div>
      </div>

      <div className="container">
        {Object.keys(formErrors).length === 0 && isSubmit ? (
          <div className="ui message success">Registration successful!</div>
        ) : (
          <div></div>
        )}

        <form onSubmit={handleSubmit}>
          <h1>Login Form</h1>
          <div className="ui form"> </div>
          <div className="input_box boxxx">
            <label>First Name</label><br/>  
            <input
              type="text"
              name="Firstname"
              placeholder="First Name"
              value={formValues.Firstname}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.Firstname}</p>

          <div className="input_box boxxx">
            <label>Last Name</label>
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              value={formValues.lastname}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.lastname}</p>

          <div className="input_box boxxx">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.email}</p>

          <div className="input_box boxxx">
            <label>Contacts</label>
            <input
              type="number"
              name="contacts"
              placeholder="Phone Number"
              value={formValues.contacts}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.contacts}</p>

          <button className="fluid ui button blue">Register</button>
        </form>
      </div>
    </section>
  );
}

export default App;
