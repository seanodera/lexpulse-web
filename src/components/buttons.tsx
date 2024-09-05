'use client'
import React from "react";

// Define an enum for Button Types
enum ButtonType {
    primary = "primary",
    secondary = "secondary",
    black = "black",
    white = "white"
}

// ElevatedButton Component
const ElevatedButton = ({ children, type, onClick, className = '' }: { children?: React.ReactNode, type: keyof typeof ButtonType, onClick?: () => void, className?: string }) => {
    return (
        <div onClick={onClick} className={`px-3 py-2 text-white bg-${type} hover:bg-${type} rounded-lg shadow-md ` + className}>
            {children}
        </div>
    );
}

// OutlinedButton Component
const OutlinedButton = ({ children, type, onClick, className = '' }: { children?: React.ReactNode, type: keyof typeof ButtonType, onClick?: () => void, className?: string }) => {
    return (
        <div onClick={onClick} className={`px-3 py-2 border border-${type} text-${type} hover:bg-${type == 'white' ? 'black' : 'white'} rounded-lg ` + className}>
            {children}
        </div>
    );
}

// TextButton Component
const TextButton = ({ children, type, onClick, className = '' }: { children?: React.ReactNode, type: keyof typeof ButtonType, onClick?: () => void, className?: string }) => {
    return (
        <div onClick={onClick} className={`px-3 py-2 text-${type} hover:bg-${type == 'white' ? 'black' : 'white'} rounded-lg ` + className}>
            {children}
        </div>
    );
}

// IconButton Component
const IconButton = ({ icon, onClick, type, className = '' }: { icon: React.ReactNode, onClick?: () => void, type: keyof typeof ButtonType, className?: string }) => {
    return (
        <div onClick={onClick} className={`p-2 text-${type} hover:bg-${type == 'white' ? 'black' : 'white'} border rounded-full h-full aspect-square ` + className}>
            {icon}
        </div>
    );
}

// FilledButton Component
const FilledButton = ({ children, type, onClick, className = '' }: { children?: React.ReactNode, type: keyof typeof ButtonType, onClick?: () => void, className?: string }) => {
    return (
        <div onClick={onClick} className={`px-3 py-2 text-${type == 'white' ? 'black' : 'white'} bg-${type} hover:bg-opacity-90 rounded-lg ` + className}>
            {children}
        </div>
    );
}

export { ElevatedButton, OutlinedButton, TextButton, IconButton, FilledButton };