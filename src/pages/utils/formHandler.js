export const useFormHandler = (formValues, setFormErrors, setTouched, navigate, setFormValues, setTouchedInitial) => {
    // Validate fields and handle form submission
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const newErrors = {
        email: formValues.email.trim() === '',
        password: formValues.password.trim() === '',
        username: formValues.username.trim() === ''
      };
  
      setFormErrors(newErrors);
      setTouched({
        email: true,
        password: true,
        username: true
      });
  
      if (!newErrors.email && !newErrors.password && !newErrors.username) {
        alert('Form submitted successfully!');
        navigate('/AdminLogin');
        setFormValues({ email: '', password: '', username: '' });
        setTouchedInitial({ email: false, password: false, username: false });
      }
    };
  
    // Handle input change and hide errors while typing
    const handleChange = (e) => {
      const { name, value } = e.target;
  
      setFormValues(prevValues => ({
        ...prevValues,
        [name]: value
      }));
  
      if (value.trim() !== '') {
        setFormErrors(prevErrors => ({
          ...prevErrors,
          [name]: false
        }));
      }
    };
  
    // Show errors when user leaves input without filling
    const handleBlur = (e) => {
      const { name, value } = e.target;
  
      setTouched(prevTouched => ({
        ...prevTouched,
        [name]: true
      }));
  
      if (value.trim() === '') {
        setFormErrors(prevErrors => ({
          ...prevErrors,
          [name]: true
        }));
      }
    };
  
    return { handleSubmit, handleChange, handleBlur };
  };
  