import React, { useState } from "react";
import { Button } from "antd";
import { Field, Fieldset, Input, Label } from "@headlessui/react";
import { signInHost } from "@/data/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";

export function SignInComponent() {
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector((state) => state.auth);

    // State for form inputs
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission

        try {
            const resultAction = await dispatch(
                signInHost({ email, password })
            ).unwrap();
            console.log("Login successful:", resultAction);
        } catch (err) {
            console.error("Login failed:", err);
        }
    };

    return (
        <div className="p-4 sm:p-8">
            <h1 className="text-center sm:text-left">Sign In</h1>
            <div>
                <form
                    className="w-full max-w-full sm:max-w-md mx-auto"
                    onSubmit={handleSubmit}
                >
                    <Fieldset className="space-y-4 w-full text-start">
                        {/* Email Field */}
                        <Field className="w-full">
                            <Label className="block text-lg font-semibold">Email</Label>
                            <Input
                                className="mt-1 block border-solid border-gray-500 bg-transparent text-black rounded-lg hover:border-primary active:border-primary ring-primary w-full px-3 py-2"
                                placeholder="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} // Controlled input
                            />
                        </Field>

                        {/* Password Field */}
                        <Field className="w-full">
                            <Label className="block text-lg font-semibold">Password</Label>
                            <Input
                                className="mt-1 block border-solid border-gray-500 bg-transparent text-black rounded-lg hover:border-primary active:border-primary ring-primary w-full px-3 py-2"
                                type="password"
                                placeholder="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} // Controlled input
                            />
                        </Field>

                        {/* Submit Button */}
                        <Field className="w-full">
                            <Button
                                type="primary"
                                htmlType="submit"
                                size="large"
                                block
                                loading={loading} // Show spinner if loading
                            >
                                {loading ? "Logging in..." : "Login"}
                            </Button>
                        </Field>
                    </Fieldset>
                </form>
            </div>
        </div>
    );
}
