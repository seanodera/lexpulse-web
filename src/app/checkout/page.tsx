'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import { generateEvents } from "@/data/generator";
import { SignInComponent } from "@/components/checkout/SignInComponent";
import { SignUpComponent } from "@/components/checkout/SignUpComponent";
import { CartComponent } from "@/components/checkout/CartComponent";

import { RootState } from "@/data/store";
import ContactForm from "@/components/checkout/contactForm";
import { selectCurrentUser } from "@/data/slices/authSlice";
import PaymentMethods from "@/components/checkout/paymentMethods";

export default function CheckoutPage() {
    const userDetails = useSelector(selectCurrentUser);

    return (
        <div className="px-4 py-8 sm:px-8 sm:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    <PaymentMethods/>
                    <div>
                        {userDetails ? (
                            <ContactForm />
                        ) : (
                            <div className="rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-8">
                                <SignInComponent />
                                <SignUpComponent />
                            </div>
                        )}
                    </div>
                </div>
                <div>
                    <CartComponent />
                </div>
            </div>
        </div>
    );
}
