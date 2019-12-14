import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from 'yup';
import axios from "axios";



const UserForm = ({ values, errors, touched, status }) => {
    console.log("values", values);
    console.log("errors", errors);
    console.log("touched", touched);

    const [users, setUsers] = useState([]);

    useEffect(() => {
        console.log("status has changed!", status);

        status && setUsers(users => [...users, status]);
    }, [status])

    return (
        <div className="user-form">
            <Form>
                <label htmlFor="name">
                    Name
                    <Field type="text" name="name" />
                    {/* <ErrorMessage
                        name="name"
                        render={msg => <div className="error">{msg}</div>}
                    /> */}
                    {touched.name && errors.name && (
                        <p className="errors">{errors.name}</p>
                    )}
                </label>

                <label>
                    Choose a Role <br />
                    <Field as="select" name="role">
                        <option disabled>Choose an Option</option>
                        <option value="section-lead">Section Lead</option>
                        <option value="project-manager">Project Manager</option>
                        <option value="technical-analysis">Technical Analysis</option>
                    </Field>
                </label>
                <label htmlFor="email">
                    Email
                    <Field type="email" name="email" />
                    {touched.email && errors.email && (
                        <p className="errors">{errors.email}</p>
                    )}
                </label>

                <label htmlFor="password">
                    Password
                    <Field type="password" name="password" />
                    {touched.password && errors.password && (
                        <p className="errors">{errors.password}</p>
                    )}
                </label>

                <label className="checkbox-container">
                    Terms of Service
                    <Field type="checkbox" name="termsofservice" checked={values.termsofservice} />
                    <span className="checkmark" />
                </label>

                <button type="submit">Submit</button>
            </Form>

            {users.map(user => {
                return (
                    <ul key={user.id}>
                        <li>User: {user.name}</li>
                        <li>Email: {user.email}</li>
                        <li>Role: {user.role}</li>
                    </ul>
                );
            })}
        </div>
    );
};


const FormUserForm = withFormik({
    mapPropsToValues(props) {
        return {
            name: props.name || "",
            role: props.role || "",
            email: props.email || "",
            password: props.password || "",
            termsofservice: props.termsofservice || false,
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required("Please enter a name"),
        email: Yup.string().required("Please enter your email"),
        password: Yup.string().required("Please enter your password"),
        // termsofservice: Yup.boolean()
    }),

    handleSubmit(values, { setStatus, resetForm }) {
        console.log("submitting", values);
        axios
            .post("https://reqres.in/api/users/", values)
            .then(res => {
                console.log("success", res);

                setStatus(res.data);

                resetForm();
            })
            .catch(err => console.log(err.response))
    }
})(UserForm)

export default FormUserForm;
