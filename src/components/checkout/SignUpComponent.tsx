import React, { useState } from "react";
import { Button } from "antd";
import { Field, Fieldset, Input, Label } from "@headlessui/react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { useRouter } from "next/navigation";
import { signInHost, signUpHost } from "@/data/slices/authSlice";

export function SignUpComponent() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { loading, error } = useAppSelector((state) => state.auth);

    // Form state
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [formError, setFormError] = useState("");

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setFormError("Passwords do not match.");
            return;
        }

        try {
            const resultAction = await dispatch(
                signUpHost({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    dateOfBirth: formData.dateOfBirth,
                    email: formData.email,
                    password: formData.password,
                })
            ).unwrap();

            if (resultAction.success) {
                console.log("User signed up successfully");
                await dispatch(signInHost({ email: formData.email, password: formData.password }));
            }
        } catch (err) {
            console.error("Sign up failed:", err);
        }
    };

    return (
        <div className="p-4 sm:p-8">
            <h1 className="text-center sm:text-left">Sign Up</h1>
            <div>
                <form className="w-full max-w-full sm:max-w-md mx-auto" onSubmit={handleSubmit}>
                    <Fieldset className="space-y-4 w-full text-start">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Field className="w-full">
                                <Label className="block font-semibold">First Name</Label>
                                <Input
                                    className="mt-1 block border-solid border-gray-500 bg-transparent rounded-lg hover:border-primary active:border-primary ring-primary w-full px-3 py-2"
                                    placeholder="First Name"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </Field>
                            <Field className="w-full">
                                <Label className="block font-semibold">Last Name</Label>
                                <Input
                                    className="mt-1 block border-solid border-gray-500 bg-transparent rounded-lg hover:border-primary active:border-primary ring-primary w-full px-3 py-2"
                                    placeholder="Last Name"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </Field>
                        </div>
                        <Field className="w-full">
                            <Label className="block font-semibold">Date Of Birth</Label>
                            <Input
                                type="date"
                                className="mt-1 block border-solid border-gray-500 bg-transparent rounded-lg hover:border-primary active:border-primary ring-primary w-full px-3 py-2"
                                placeholder="date of birth"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                required
                            />
                        </Field>
                        <Field className="w-full">
                            <Label className="block font-semibold">Email</Label>
                            <Input
                                className="mt-1 block border-solid border-gray-500 bg-transparent rounded-lg hover:border-primary active:border-primary ring-primary w-full px-3 py-2"
                                placeholder="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                type="email"
                                required
                            />
                        </Field>
                        <Field className="w-full">
                            <Label className="block font-semibold">Password</Label>
                            <Input
                                className="mt-1 block border-solid border-gray-500 bg-transparent rounded-lg hover:border-primary active:border-primary ring-primary w-full px-3 py-2"
                                type="password"
                                placeholder="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </Field>
                        <Field className="w-full">
                            <Label className="block font-semibold">Confirm Password</Label>
                            <Input
                                className="mt-1 block border-solid border-gray-500 bg-transparent rounded-lg hover:border-primary active:border-primary ring-primary w-full px-3 py-2"
                                type="password"
                                placeholder="confirm password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </Field>
                        {/* Display form error */}
                        {formError && <div className="text-red-500 text-sm">{formError}</div>}
                        {/* Display auth error */}
                        {error && <div className="text-red-500 text-sm">{error}</div>}
                        <Field className="w-full">
                            <Button
                                type={"primary"}
                                size={"large"}
                                block
                                htmlType="submit"
                                loading={loading}
                            >
                                {loading ? "Signing Up..." : "Sign Up"}
                            </Button>
                        </Field>
                    </Fieldset>
                </form>
            </div>
        </div>
    );
}
