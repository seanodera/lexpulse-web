import { Button } from "antd";
import { Field, Fieldset, Input, Label } from "@headlessui/react";

export function SignInComponent() {
    return (
        <div>
            <h1>Sign In</h1>
            <div>
                <form className={'w-full max-w-md'}>
                    <Fieldset className={'space-y-4 w-full text-start'}>
                        <Field className={'w-full'}>
                            <Label className={'block text-lg font-semibold'}>Email</Label>
                            <Input
                                className={
                                    'mt-1 block border-solid border-gray-500 bg-transparent text-white rounded-lg hover:border-primary active:border-primary ring-primary w-full'
                                }
                                placeholder={'email'}
                            />
                        </Field>
                        <Field>
                            <Label className={'block text-lg font-semibold'}>Password</Label>
                            <Input
                                className={
                                    'mt-1 block border-solid border-gray-500 bg-transparent text-white rounded-lg hover:border-primary active:border-primary ring-primary w-full'
                                }
                                type={'password'}
                                placeholder={'password'}
                            />
                        </Field>
                        <Field>
                            <Button type={'primary'} size={'large'} block>
                                Login
                            </Button>
                        </Field>
                    </Fieldset>
                </form>
            </div>
        </div>
    );
}