import { Button } from "antd";
import { Field, Fieldset, Input, Label } from "@headlessui/react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import {signInHost} from "@/data/slices/authSlice"; // Import selector for checking loading/error states


// Define validation schema using Yup
const SignInSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export function SignInComponent() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { loading, error } = useAppSelector((state) => state.auth); // Selector to get auth state

    // Handle form submission
    const handleSubmit = async (values: { email: string; password: string }) => {
        try {
            const resultAction = await dispatch(signInHost({ email: values.email, password: values.password })).unwrap();
            if (resultAction.success) {
                router.back(); // Navigate after successful login
            }
        } catch (error) {
            console.error("Login failed:", error); // You can handle error display more elegantly here
        }
    };

    return (
        <div>
            <img src={"/logo.svg"} alt="logo" className={"mx-auto"} />

            {/* Formik Form */}
            <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={SignInSchema}
                onSubmit={(values) => handleSubmit(values)}
            >
                {({ errors, touched, handleChange }) => (
                    <Form className={"w-full"}>
                        <Fieldset className={"space-y-4 w-full text-start"}>
                            <Field className={"w-full"}>
                                <Label className={"block text-lg font-semibold"}>Email</Label>
                                <Input
                                    name="email"
                                    className={`mt-1 block border-solid border-gray-500 bg-transparent text-white rounded-lg hover:border-primary active:border-primary ring-primary w-full ${
                                        errors.email && touched.email ? "border-red-500" : ""
                                    }`}
                                    placeholder={"email"}
                                    onChange={handleChange}
                                />
                                {errors.email && touched.email && (
                                    <div className="text-red-500 text-sm">{errors.email}</div>
                                )}
                            </Field>

                            <Field>
                                <Label className={"block text-lg font-semibold"}>Password</Label>
                                <Input
                                    name="password"
                                    type={"password"}
                                    className={`mt-1 block border-solid border-gray-500 bg-transparent text-white rounded-lg hover:border-primary active:border-primary ring-primary w-full ${
                                        errors.password && touched.password ? "border-red-500" : ""
                                    }`}
                                    placeholder={"password"}
                                    onChange={handleChange}
                                />
                                {errors.password && touched.password && (
                                    <div className="text-red-500 text-sm">{errors.password}</div>
                                )}
                            </Field>

                            <Field>
                                <Button
                                    type={"primary"}
                                    htmlType="submit"
                                    size={"large"}
                                    block
                                    loading={loading} // Disable button and show loading spinner if in loading state
                                >
                                    {loading ? "Logging in..." : "Login"}
                                </Button>
                                {error && <div className="text-red-500 mt-2">{error}</div>} {/* Display error */}
                            </Field>
                        </Fieldset>
                    </Form>
                )}
            </Formik>
        </div>
    );
}