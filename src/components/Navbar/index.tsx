import { Link } from "@tanstack/react-router";
import { FloatingNav } from "../ui/floating-navbar";
import DarkMode from "../DarkMode";

// In a real app, this would be in its own file and use React Context.
// Set isLoggedIn to true to see "Akun", false to see "Login".
const useAuth = () => {
  const isLoggedIn = false; // <-- CHANGE THIS TO TEST
  return { isLoggedIn };
};

const NavbarMobile = ({ navItems, isLoggedIn }) => (
  <div className="relative w-full px-28 lg:hidden">
    {/* The mobile navbar now receives dynamic items */}
    <FloatingNav navItems={navItems} isLoggedIn={isLoggedIn} />
  </div>
);

const NavbarPc = ({ isLoggedIn }) => (
  <nav className="py-3 border-b-2 hidden lg:flex">
    <div className="container mx-auto flex items-center justify-between">
      {/* Logo Section */}
      <div className="flex items-center space-x-2 ms-5">
        <Link to="/" className="flex items-center gap-3 font-semibold">
          <h3>Rossi Cake</h3>
        </Link>
      </div>

      {/* Static Navbar Items */}
      <div className="hidden lg:flex items-center space-x-6">
        <Link to="/" className="px-5 py-2 rounded-full">
          Home
        </Link>
        <Link to="/shop" className="px-5 py-2 rounded-full">
          Shop
        </Link>

        <DarkMode />

        {/* --- Conditional Login/Account Button --- */}
        {isLoggedIn ? (
          <Link
            to="/user/account/" // Correct path for the account page
            className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full"
          >
            <span>Akun</span>
            <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
          </Link>
        ) : (
          <Link
            to="/auth" // Correct path for the login page
            className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full"
          >
            <span>Login</span>
            <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
          </Link>
        )}
      </div>
    </div>
  </nav>
);

export const Navbar = () => {
  const { isLoggedIn } = useAuth();

  // Define nav items dynamically based on auth state for the mobile menu
  const navItems = [
    { name: "Home", link: "/" },
    { name: "Shop", link: "/shop" },
  ];

  return (
    <>
      <NavbarPc isLoggedIn={isLoggedIn} />
      <NavbarMobile navItems={navItems} isLoggedIn={isLoggedIn} />
    </>
  );
};
