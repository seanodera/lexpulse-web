import { Button } from "antd";
import { Field, Fieldset, Input, Label } from "@headlessui/react";

export function SignUpComponent() {
    return (
        <div>
            <h1>Sign Up</h1>
            <div>
                <form className={'w-full max-w-md'}>
                    <Fieldset className={'space-y-4 w-full text-start'}>
                        <div className={'grid grid-cols-2 gap-4'}>
                            <Field>
                                <Label className={'block font-semibold'}>First Name</Label>
                                <Input
                                    className={
                                        'mt-1 block border-solid border-gray-500 bg-transparent rounded-lg hover:border-primary active:border-primary ring-primary w-full'
                                    }
                                    placeholder={'First Name'}
                                />
                            </Field>
                            <Field>
                                <Label className={'block font-semibold'}>Last Name</Label>
                                <Input
                                    className={
                                        'mt-1 block border-solid border-gray-500 bg-transparent rounded-lg hover:border-primary active:border-primary ring-primary w-full'
                                    }
                                    placeholder={'Last Name'}
                                />
                            </Field>
                        </div>
                        <Field className={'w-full'}>
                            <Label className={'block font-semibold'}>Date Of Birth</Label>
                            <Input
                                type={'date'}
                                className={
                                    'mt-1 block border-solid border-gray-500 bg-transparent rounded-lg hover:border-primary active:border-primary ring-primary w-full'
                                }
                                placeholder={'date of birth'}
                            />
                        </Field>
                        <Field className={'w-full'}>
                            <Label className={'block font-semibold'}>Email</Label>
                            <Input
                                className={
                                    'mt-1 block border-solid border-gray-500 bg-transparent rounded-lg hover:border-primary active:border-primary ring-primary w-full'
                                }
                                placeholder={'email'}
                            />
                        </Field>
                        <Field>
                            <Label className={'block font-semibold'}>Password</Label>
                            <Input
                                className={
                                    'mt-1 block border-solid border-gray-500 bg-transparent rounded-lg hover:border-primary active:border-primary ring-primary w-full'
                                }
                                type={'password'}
                                placeholder={'password'}
                            />
                        </Field>
                        <Field>
                            <Label className={'block font-semibold'}>Confirm Password</Label>
                            <Input
                                className={
                                    'mt-1 block border-solid border-gray-500 bg-transparent rounded-lg hover:border-primary active:border-primary ring-primary w-full'
                                }
                                type={'password'}
                                placeholder={'confirm password'}
                            />
                        </Field>
                        <Field>
                            <Button type={'primary'} size={'large'} block>
                                Sign Up
                            </Button>
                        </Field>
                    </Fieldset>
                </form>
            </div>
        </div>
    );
}