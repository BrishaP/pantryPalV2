// import React from 'react';

// import { Formik, Form, Field } from 'formik';

// import { signupSchema } from './../../Schema/index';

// const initialValues = {
//     name: "",
//     category: "",
//     expiry_date: "",
//     quantity: "",

// }

// const App = () => {


//     const onSubmit=(values, actions) => {
//         console.log(values);
//         actions.resetForm();
    
//     }



//     return (
//         <div className="app">
//             <Formik initialValues={initialValues} validationSchema={signupSchema} onSubmit={onSubmit}>


//                 {({ errors, touched }) => (
            
//                     <Form className="signUpForm">
            
//                         <label htmlFor="name">Name:</label>
//                         <Field type="text" id="name" name="name" placeholder="Enter your name" />
            
//                         <div className="error_container">
//                         {touched.name && errors.name && (
//                             <p className="form_error">{errors.name}</p>)}
//                         </div>
                    


//                         <label htmlFor="name">Quantity:</label>
//                         <Field type="number" id="quantity" name="quantity" placeholder="Enter quantity" />
            
//                         <div className="error_container">
//                             {touched.quantity && errors.quantity && (
//                             <p className="form_error">{errors.quantity}</p>
//                             )}
//                         </div>


//                         <button type="submit">
//                             Submit
//                         </button>
            
                
        
//                     </Form>

//                 )}
//             </Formik>
//         </div>
//     );
// };

// export default App;
