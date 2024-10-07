import Link from "next/link";

export default function Footer() {
    return (
        <footer className={'px-4 md:px-16 bg-primary-950 text-white py-8'}>
            <div className={'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8'}>

                <div className={'flex gap-2 items-center'}>
                    <img src={'/logo/logo.svg'} className={'aspect-square h-8'} alt="Lexpulse Logo" />
                    <h2 className={'font-bold'}>LEXPULSE</h2>
                </div>

                <div>
                    <h3 className={'mt-4 font-medium'}>LEXPULSE</h3>
                    <Link className={'block text-gray-500 hover:text-white active:text-white text-sm'} href={'/'}>
                        <h4>All Events</h4>
                    </Link>
                    <Link className={'block text-gray-500 hover:text-white active:text-white text-sm'} href={'/about'}>
                        <h4>About</h4>
                    </Link>
                    <Link className={'block text-gray-500 hover:text-white active:text-white text-sm'} href={'/sell'}>
                        <h4>Sell Tickets</h4>
                    </Link>
                </div>

                <div>
                    <h3 className={'mt-4 font-medium'}>Contact</h3>
                    <Link className={'block text-gray-500 hover:text-white active:text-white text-sm'} href={'/contact-us'}>
                        <h4>Contact Us</h4>
                    </Link>
                    <Link className={'block text-gray-500 hover:text-white active:text-white text-sm'} href={'/instagram'}>
                        <h4>Instagram</h4>
                    </Link>
                    <Link className={'block text-gray-500 hover:text-white active:text-white text-sm'} href={'/facebook'}>
                        <h4>Facebook</h4>
                    </Link>
                    <Link className={'block text-gray-500 hover:text-white active:text-white text-sm'} href={'/twitter'}>
                        <h4>Twitter</h4>
                    </Link>
                    <Link className={'block text-gray-500 hover:text-white active:text-white text-sm'} href={'/youtube'}>
                        <h4>YouTube</h4>
                    </Link>
                </div>

                <div>
                    <h3 className={'mt-4 font-medium'}>Policies</h3>
                    <Link className={'block text-gray-500 hover:text-white active:text-white text-sm'} href={'/privacy-policy'}>
                        <h4>Privacy Policy</h4>
                    </Link>
                    <Link className={'block text-gray-500 hover:text-white active:text-white text-sm'} href={'/terms-of-service'}>
                        <h4>Terms Of Service</h4>
                    </Link>
                    <Link className={'block text-gray-500 hover:text-white active:text-white text-sm'} href={'/cookies'}>
                        <h4>Cookies</h4>
                    </Link>
                </div>
            </div>
        </footer>
    );
}