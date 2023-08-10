import Link from 'next/link'
import { BigCircle } from '../Shapes/BigCircle';


const navLinks = [
  { title: 'About', href: '/about' },
  { title: 'Contact', href: '/contact' },
  { title: 'Sign Up', href: '/auth/signup' },
  { title: 'Sign In', href: '/auth/signin' },
];

const Navigation = ({themeBtn}) => {
  return (
    <nav className="border-b border-gray-200 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href={'/'} className="flex-shrink-0">
              {/* Your logo or icon */}
              {/* Replace this with your actual logo or icon */}
              <img
                className="h-8 w-8"
                src="/logo.svg"
                alt="Logo"
              />
            </Link>
            <div className="hidden sm:hidden">
              {/* Mobile menu icon */}
              <button
                type="button"
                className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
              >
                <span className="sr-only">Open menu</span>
                <span className="block h-2 w-2 bg-white"></span>
                <span className="block h-2 w-2 bg-white"></span>
                <span className="block h-2 w-2 bg-white"></span>
              </button>
            </div>
            <div className="hidden md:block">
              <ul className="ml-10 flex space-x-4">
                {navLinks.map((link) => (
                   <Link href={link.href} key={link.title}>
                    <li  className=" hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
                          {link.title}
                    </li>
                  </Link>
                ))}
                {themeBtn}
              </ul>
            </div>
          </div>
          
        </div>
      </div>


    </nav>
  );
};

export default Navigation;
