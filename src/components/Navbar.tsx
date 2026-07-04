import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Skills', path: '/skills' },
    { name: 'Achievements', path: '/achievements' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="fixed top-4 left-0 w-full z-50 flex justify-center px-2 sm:px-4">
      <nav className="glass-nav px-1 sm:px-2 py-1 rounded-full flex items-center justify-between gap-0.5 max-w-lg w-full shadow-lg shadow-black/30">
        <div className="flex items-center w-full justify-around">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? 'text-black bg-amber-500 shadow-md shadow-amber-500/20'
                    : 'text-gray-400 hover:text-amber-400 hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
