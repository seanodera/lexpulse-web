import { Button } from "antd";
import { Field, Fieldset, Input, Label } from "@headlessui/react";
import {CloseOutlined} from "@ant-design/icons";
import Link from "next/link";


export default function LoginPage() {
    return (
        <div className={'w-screen h-screen flex justify-center items-center bg-dark text-white relative'}>
            <Link href={'/'} className={'absolute top-0 right-0 m-4'}>
                <Button type={'text'} className={'text-white'} size={'large'} icon={<CloseOutlined/>}/>
            </Link>

            <div
                className={
                    'grid grid-cols-2 gap-10 max-w-screen-md w-full relative'
                }
            >

                <div className={'absolute inset-0 flex justify-center py-7'}>
                    <div className={'w-px bg-primary-800 h-full '}></div>
                </div>


                <div className={'max-w-screen-sm w-full text-center z-10'}>
                    <img src={'/logo/logo.svg'} alt="logo" className={'mx-auto'} />
                    <form className={'w-full'}>
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


                <div className={'max-w-screen-sm w-full z-10 flex flex-col items-start justify-center'}>
                    <p className={'text-sm text-gray-300'}>
                        Don&apos;t have an account?
                    </p>
                    <Button block type={'primary'} size={'large'} ghost>
                        Create An Account
                    </Button>

                </div>
            </div>
        </div>
    );
}