  function Validation(values) {
  let error = {};

  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;


  if (values.firstname === "") {
    error.firstname = "firstname should not be empty";
  }  else {
    error.firstname = "";
  }



  if (values.lastname === "") {
    error.lastname = "lastname should not be empty";
  }  else {
    error.lastname = "";
  }



    if (values.email === "") {
    error.email = "Email should not be empty";
  } else if (!email_pattern.test(values.email)) {
    error.email = "Email didn't match";
  } else {
    error.email = "";
  }




   if (values.role === "") {
    error.role = "role should not be empty";
  }  else {
    error.role = "";
  }




   if (values.phoneno === "") {
    error.phoneno = "phoneno should not be empty";
  }  else {
    error.phoneno = "";
  }



   if (values.address === "") {
    error.address = "address should not be empty";
  }  else {
    error.address = "";
  }


    if (values.password === "") {
    error.password = "Password should not be empty";
  } else if (!password_pattern.test(values.password)) {
    error.password = "use password  atleast one uppercase latter , one lowercase latter , digits and minimum 8 number password ";
  } else {
    error.password = "";
  }



if(values.cpassword == ''){
    error.cpassword ="cpassword should not be empty"
}else if(values.cpassword !== values.password){
     error.cpassword ="password is miss match"
}else{
     error.cpassword = "";
}
  


  return error;
}



export default Validation;
