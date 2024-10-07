import { Button } from "antd";
import { Field, Fieldset, Input, Label } from "@headlessui/react";

export function SignUpComponent() {
    return (
        <div className="p-4 sm:p-8">
            <h1 className="text-center sm:text-left">Sign Up</h1>
            <div>
                <form className="w-full max-w-full sm:max-w-md mx-auto">
                    <Fieldset className="space-y-4 w-full text-start">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Field className="w-full">
                                <Label className="block font-semibold">First Name</Label>
                                <Input
                                    className="mt-1 block border-solid border-gray-500 bg-transparent rounded-lg hover:border-primary active:border-primary ring-primary w-full px-3 py-2"
                                    placeholder="First Name"
                                />
                            </Field>
                            <Field className="w-full">
                                <Label className="block font-semibold">Last Name</Label>
                                <Input
                                    className="mt-1 block border-solid border-gray-500 bg-transparent rounded-lg hover:border-primary active:border-primary ring-primary w-full px-3 py-2"
                                    placeholder="Last Name"
                                />
                            </Field>
                        </div>
                        <Field className="w-full">
                            <Label className="block font-semibold">Date Of Birth</Label>
                            <Input
                                type="date"
                                className="mt-1 block border-solid border-gray-500 bg-transparent rounded-lg hover:border-primary active:border-primary ring-primary w-full px-3 py-2"
                                placeholder="date of birth"
                            />
                        </Field>
                        <Field className="w-full">
                            <Label className="block font-semibold">Email</Label>
                            <Input
                                className="mt-1 block border-solid border-gray-500 bg-transparent rounded-lg hover:border-primary active:border-primary ring-primary w-full px-3 py-2"
                                placeholder="email"
                            />
                        </Field>
                        <Field className="w-full">
                            <Label className="block font-semibold">Password</Label>
                            <Input
                                className="mt-1 block border-solid border-gray-500 bg-transparent rounded-lg hover:border-primary active:border-primary ring-primary w-full px-3 py-2"
                                type="password"
                                placeholder="password"
                            />
                        </Field>
                        <Field className="w-full">
                            <Label className="block font-semibold">Confirm Password</Label>
                            <Input
                                className="mt-1 block border-solid border-gray-500 bg-transparent rounded-lg hover:border-primary active:border-primary ring-primary w-full px-3 py-2"
                                type="password"
                                placeholder="confirm password"
                            />
                        </Field>
                        <Field className="w-full">
                            <Button type="primary" size="large" block>
                                Sign Up
                            </Button>
                        </Field>
                    </Fieldset>
                </form>
            </div>
        </div>
    );
}