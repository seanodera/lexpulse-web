import React from 'react';
import { Button } from 'antd';
import { Field, Fieldset, Input, Label } from '@headlessui/react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import {useRouter} from "next/navigation";
import {signUpHost} from "@/data/slices/authSlice"; // Import selectors and hooks


// Define validation schema using Yup
const SignUpSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    dateOfBirth: Yup.date().required("Date of birth is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], "Passwords must match")
        .required("Confirm Password is required")
});

export function SignUpComponent() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { loading, error } = useAppSelector((state) => state.auth); // Selector to get auth state

    // Handle form submission
    const handleSubmit = async (values: { firstName: string; lastName: string; dateOfBirth: string; email: string; password: string }) => {
        try {
            const resultAction = await dispatch(signUpHost(values)).unwrap();
            if (resultAction.success) {
                console.log("User signed up successfully");
                router.back();
            }
        } catch (err) {
            console.error("Sign up failed:", err);
        }
    };

    return (
        <div>
            <div className={'mt-4'}>
                {/* Formik Form */}
                <Formik
                    initialValues={{ firstName: '', lastName: '', dateOfBirth: '', email: '', password: '', confirmPassword: '' }}
                    validationSchema={SignUpSchema}
                    onSubmit={(values) => handleSubmit(values)}
                >
                    {({ errors, touched, handleChange, handleBlur, values }) => (
                        <Form className={'w-full max-w-md'}>
                            <Fieldset className={'space-y-4 w-full text-start'}>
                                <div className={'grid grid-cols-2 gap-4'}>
                                    <Field>
                                        <Label className={'block font-semibold'}>First Name</Label>
                                        <Input
                                            name="firstName"
                                            className={`mt-1 block border-solid border-gray-500 bg-transparent rounded-lg hover:border-primary active:border-primary ring-primary w-full ${errors.firstName && touched.firstName ? "border-red-500" : ""}`}
                                            placeholder={'First Name'}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.firstName}
                                        />
                                        {errors.firstName && touched.firstName && <div className="text-red-500 text-sm">{errors.firstName}</div>}
                                    </Field>
                                    <Field>
                                        <Label className={'block font-semibold'}>Last Name</Label>
                                        <Input
                                            name="lastName"
                                            className={`mt-1 block border-solid border-gray-500 bg-transparent rounded-lg hover:border-primary active:border-primary ring-primary w-full ${errors.lastName && touched.lastName ? "border-red-500" : ""}`}
                                            placeholder={'Last Name'}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.lastName}
                                        />
                                        {errors.lastName && touched.lastName && <div className="text-red-500 text-sm">{errors.lastName}</div>}
                                    </Field>
                                </div>
                                <Field>
                                    <Label className={'block font-semibold'}>Date Of Birth</Label>
                                    <Input
                                        type={'date'}
                                        name="dateOfBirth"
                                        className={`mt-1 block border-solid border-gray-500 bg-transparent rounded-lg hover:border-primary active:border-primary ring-primary w-full ${errors.dateOfBirth && touched.dateOfBirth ? "border-red-500" : ""}`}
                                        placeholder={'Date of Birth'}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.dateOfBirth}
                                    />
                                    {errors.dateOfBirth && touched.dateOfBirth && <div className="text-red-500 text-sm">{errors.dateOfBirth}</div>}
                                </Field>
                                <Field>
                                    <Label className={'block font-semibold'}>Email</Label>
                                    <Input
                                        name="email"
                                        className={`mt-1 block border-solid border-gray-500 bg-transparent rounded-lg hover:border-primary active:border-primary ring-primary w-full ${errors.email && touched.email ? "border-red-500" : ""}`}
                                        placeholder={'Email'}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                    />
                                    {errors.email && touched.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                                </Field>
                                <Field>
                                    <Label className={'block font-semibold'}>Password</Label>
                                    <Input
                                        name="password"
                                        type={'password'}
                                        className={`mt-1 block border-solid border-gray-500 bg-transparent rounded-lg hover:border-primary active:border-primary ring-primary w-full ${errors.password && touched.password ? "border-red-500" : ""}`}
                                        placeholder={'Password'}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                    />
                                    {errors.password && touched.password && <div className="text-red-500 text-sm">{errors.password}</div>}
                                </Field>
                                <Field>
                                    <Label className={'block font-semibold'}>Confirm Password</Label>
                                    <Input
                                        name="confirmPassword"
                                        type={'password'}
                                        className={`mt-1 block border-solid border-gray-500 bg-transparent rounded-lg hover:border-primary active:border-primary ring-primary w-full ${errors.confirmPassword && touched.confirmPassword ? "border-red-500" : ""}`}
                                        placeholder={'Confirm Password'}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.confirmPassword}
                                    />
                                    {errors.confirmPassword && touched.confirmPassword && <div className="text-red-500 text-sm">{errors.confirmPassword}</div>}
                                </Field>
                                {error && <div className="text-red-500 mt-2">{error}</div>}
                                <Field>
                                    <Button
                                        type={'primary'}
                                        size={'large'}
                                        block
                                        htmlType="submit"
                                        loading={loading} // Disable button and show loading spinner if in loading state
                                    >
                                        Sign Up
                                    </Button>
                                </Field>
                            </Fieldset>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}