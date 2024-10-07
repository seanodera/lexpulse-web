import { Button } from "antd";
import { Field, Fieldset, Input, Label } from "@headlessui/react";

export function SignInComponent() {
    return (
        <div className="p-4 sm:p-8">
            <h1 className="text-center sm:text-left">Sign In</h1>
            <div>
                <form className="w-full max-w-full sm:max-w-md mx-auto">
                    <Fieldset className="space-y-4 w-full text-start">
                        <Field className="w-full">
                            <Label className="block text-lg font-semibold">Email</Label>
                            <Input
                                className="mt-1 block border-solid border-gray-500 bg-transparent text-black rounded-lg hover:border-primary active:border-primary ring-primary w-full px-3 py-2"
                                placeholder="email"
                            />
                        </Field>
                        <Field className="w-full">
                            <Label className="block text-lg font-semibold">Password</Label>
                            <Input
                                className="mt-1 block border-solid border-gray-500 bg-transparent text-black rounded-lg hover:border-primary active:border-primary ring-primary w-full px-3 py-2"
                                type="password"
                                placeholder="password"
                            />
                        </Field>
                        <Field className="w-full">
                            <Button type="primary" size="large" block>
                                Login
                            </Button>
                        </Field>
                    </Fieldset>
                </form>
            </div>
        </div>
    );
}