import MenuAppBar from '../../components/AppBar'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MyCard from '../../components/Card';
import BasicTextFields from '../../components/Input';
import BasicButtons from '../../components/Button'
import './css/style.css'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import { createUserWithEmailAndPassword, auth, db, doc, setDoc } from '../../config/Firebase';
import { Formik } from 'formik';

function Signup() {
   
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    return (
        <div>
            <MenuAppBar title="Signup" />
            ِ<Container>
                <Grid container justifyContent="center">
                    <Grid item xs={12} lg={6} md={12}>
                        <MyCard>
                            <h1>Signup</h1>
                            <Formik
                                initialValues={{ fullName: "", email: '', password: '' }}
                                validate={values => {
                                    const errors = {};
                                    if (!values.fullName) {
                                        errors.fullName = 'Required';
                                    }
                                    else if (!values.email) {
                                        errors.email = 'Required';
                                    } else if (
                                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                    ) {
                                        errors.email = 'Invalid email address';
                                    }
                                    else if (!values.password) {
                                        errors.password = 'Required';
                                    }
                                    else if (values.password.length < 6) {
                                        errors.password = 'Password must be atleast 6';
                                    }
                                    return errors;
                                }}
                                onSubmit={(values, { setSubmitting }) => {
                                    setLoading(true)
                                    setTimeout(() => {
                                        createUserWithEmailAndPassword(auth, values.email, values.password)
                                            .then(async (res) => {
                                                let dbRef = doc(db, "users", res.user.uid);
                                                await setDoc(dbRef, { ...values, uid: res.user.uid })
                                                    .then(() => {
                                                        history.push(`/profile/${res.user.uid}`)
                                                    })
                                            })
                                            .catch((err) => {
                                                setLoading(false)
                                                console.log("masla agaya==>", err)
                                            })

                                    }, 400)
                                }}
                            >
                                {({
                                    values,
                                    errors,
                                    touched,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    isSubmitting,
                                }) => (
                                    <form onSubmit={handleSubmit}>
                                        <div className="mt-20">
                                            <BasicTextFields
                                                error={errors.fullName}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.fullName}
                                                label="Full Name"
                                                type="text"
                                                name="fullName" />
                                        </div>
                                        <div className="mt-20">
                                            <BasicTextFields
                                                error={errors.email}
                                                label="Email" 
                                                type="email"
                                                name="email"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.email}
                                            />
                                        </div>
                                        <div className="mt-20">
                                            <BasicTextFields
                                                error={errors.password}
                                                label="Password"
                                                type="password"
                                                name="password"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.password}
                                            />
                                        </div>
                                        <div className="mt-20">
                                            <BasicButtons type="submit"
                                                title={ loading ? 'loading...' : "REGISTER"} />
                                        </div>

                                    </form>
                                )}
                            </Formik>
                        </MyCard>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Signup;