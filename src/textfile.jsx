import { useState, useEffect } from "react";


function App(){

  const initialValues = { Firstname: "",lastname:"", email: "", contacts:""};
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  }

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  },[formErrors])

  const validate = (values)=> {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if(!values.Firstname){
      errors.Firstname = "First name is required!";
    }

    if(!values.lastname){
      errors.lastname = "Last name is required!";
    }

    if(!values.email){
      errors.email = "Email is required!";
    } else if(!regex.test(values.email)){
      errors.email = "Email is not valid!";
    }

    if(!values.contacts){
      errors.contacts = "Contact is required!";
    } else if(values.contacts.length < 10){
      errors.contacts = "Contact is not 10 digit!";
    } else if(values.contacts.length > 10){
      errors.contacts = "Contact is not 10 digit!";
    }

    

    return errors;
  }

  return (
    <div className="container">
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="ui message success">Registration successful!</div>
      ):(
        // <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
        <div></div>
      )}

      
      <form onSubmit={handleSubmit}>
        <h1>Login Form</h1>
        <div className="ui form"></div>
        <div className="field">
          <label>First Name</label>
          <input 
            type="text" 
            name="Firstname" 
            placeholder="First Name" 
            value={formValues.Firstname} 
            onChange={handleChange}/>
        </div>
        <p>{formErrors.Firstname}</p>

        <div className="field">
          <label>Last Name</label>
          <input 
            type="text" 
            name="lastname" 
            placeholder="Last Name" 
            value={formValues.lastname} 
            onChange={handleChange}/>
        </div>
        <p>{formErrors.lastname}</p>



        <div className="field">
          <label>Email</label>
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={formValues.email} 
            onChange={handleChange}/>
        </div>
        <p>{formErrors.email}</p>

        <div className="field">
          <label>Contacts</label>
          <input 
            type="number" 
            name="contacts" 
            placeholder="Phone Number" 
            value={formValues.contacts} 
            onChange={handleChange}/>
        </div>
        <p>{formErrors.contacts}</p>

        

        <button className="fluid ui button blue">Register</button>


      </form>
    </div>
  );
}

export default App;