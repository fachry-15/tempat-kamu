import React from 'react';
import { Navbar, DarkThemeToggle } from 'flowbite-react';

function NavigationBar() {
    return (
        <Navbar fluid className='bg-orange-400 dark:bg-stone-800'>
            <Navbar.Brand href="#">
                <img src="../images/logo-tempat-kamu.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
            </Navbar.Brand>
            <div className="flex md:order-2">
                <DarkThemeToggle />
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse className=''>
                <Navbar.Link href="#">Beranda</Navbar.Link>
                <Navbar.Link href="#">Tentang</Navbar.Link>
                <Navbar.Link href="#">Ruang Membaca</Navbar.Link>
                <Navbar.Link href="#" active className='bg-gray-500'>Sudut Mencatat</Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavigationBar;
