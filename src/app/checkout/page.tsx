'use client'
import { generateEvents } from "@/data/generator";
import {SignInComponent} from "@/components/checkout/SignInComponent";
import {SignUpComponent} from "@/components/checkout/SignUpComponent";
import {CartComponent} from "@/components/checkout/CartComponent";

export default function CheckoutPage() {
    const event = generateEvents(2)[0];
    return (
        <div>
            <div className={'grid grid-cols-3 gap-8 px-16 py-16'}>
                <div className={'col-span-2'}>
                    <div className={' rounded-lg p-4 grid grid-cols-2 gap-8'}>
                        <SignInComponent />
                        <SignUpComponent />
                    </div>
                    <div>
                    </div>
                </div>
                <div className={''}>
                    <CartComponent event={event} />
                </div>
            </div>
        </div>
    );
}