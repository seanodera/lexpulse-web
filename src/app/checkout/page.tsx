'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import { generateEvents } from "@/data/generator";
import { SignInComponent } from "@/components/checkout/SignInComponent";
import { SignUpComponent } from "@/components/checkout/SignUpComponent";
import { CartComponent } from "@/components/checkout/CartComponent";

import { RootState } from "@/data/store";
import ContactForm from "@/components/checkout/contactForm";
import {selectCurrentUser} from "@/data/slices/authSlice";

export default function CheckoutPage() {

    const userDetails = useSelector(selectCurrentUser);

    return (
        <div>
            <div className="grid grid-cols-3 gap-8 px-16 py-16">
                <div className="col-span-2">
                    <div>
                        {userDetails ? (
                            <ContactForm />
                        ) : (
                            <div className="rounded-lg p-4 grid grid-cols-2 gap-8">
                                <SignInComponent />
                                <SignUpComponent />
                            </div>
                        )}
                    </div>
                    <div>
                    </div>
                </div>
                <div>
                    <CartComponent/>
                </div>
            </div>
        </div>
    );
}