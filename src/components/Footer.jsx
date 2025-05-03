import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-center text-white-800 py-4 mt-auto shadow-inner">
      <p className="text-[15px] font-medium text-white ">
        &copy; {new Date().getFullYear()} My To-Do App. Made with ❤️ using React & Tailwind.
      </p>
    </footer>
  );
};

export default Footer;
