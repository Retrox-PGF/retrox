import { motion } from "framer-motion";
import Link from 'next/link';

const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const variantItem = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

export default function Aside() {
   return (
    <motion.aside
    transition={{ duration: 0.2 }}
    initial={{ x: -88}}
          animate={{ x: 0 }}

    className="hidden sm:flex sm:flex-col">
    <Link href="/">
      <a
        className="inline-flex items-center justify-center h-20 w-20 bg-[#050346] text-white"
      >
        Retrox
      </a>
      </Link>
      <div className="flex-grow flex flex-col justify-between text-gray-500 bg-gray-800">
        <motion.nav
        initial="hidden"
        animate="visible"
          variants={container}
        className="flex flex-col mx-4 my-6 space-y-4">

        <Link href="/rounds">
          <a
            className="inline-flex items-center justify-center py-3 text-purple-600 bg-white rounded-xl"
          >
            <span className="sr-only">Dashboard</span>
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </a>
          </Link>

          <a
            className="inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-xl"
          >
            <span className="sr-only">Dashboard</span>
            <svg
            aria-hidden="true"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
            >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
            />
            </svg>
          </a>

        </motion.nav>
      </div>
    </motion.aside>
  );
}
