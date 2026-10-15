import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";

const socials = [
  { label: "Twitter", icon: FaTwitter, href: "https://x.com/Ammar_Amin007" },
  {
    label: "Instagram",
    icon: FaInstagram,
    href: "https://instagram.com/ammar_amin_123",
  },
  {
    label: "LinkedIn",
    icon: FaLinkedinIn,
    href: "https://linkedin.com/in/ammar-amin5253",
  },
  { label: "Facebook", icon: FaFacebookF, href: "https://facebook.com" },
];

const linkClass = "text-slate-600 hover:text-slate-800 hover:underline";

function Footer() {
  return (
    <footer className="bg-slate-200 shadow-inner">
      <div className="max-w-6xl mx-auto px-3 py-8 grid gap-8 sm:grid-cols-2 md:grid-cols-4">
        <div className="flex flex-col gap-3">
          <Link to="/">
            <h2 className="text-xl font-bold flex flex-wrap">
              <span className="text-slate-500">Amin</span>
              <span className="text-slate-700">Estate</span>
            </h2>
          </Link>
          <p className="text-sm text-slate-600">
            Find your next perfect place to live. Browse homes to rent or buy,
            with great offers in the best neighbourhoods.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-slate-700 mb-3">Quick Links</h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <Link to="/" className={linkClass}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className={linkClass}>
                About
              </Link>
            </li>
            <li>
              <Link to="/search" className={linkClass}>
                Search
              </Link>
            </li>
            <li>
              <Link to="/profile" className={linkClass}>
                Profile
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-slate-700 mb-3">Explore</h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <Link to="/search?type=rent" className={linkClass}>
                Places for rent
              </Link>
            </li>
            <li>
              <Link to="/search?type=sell" className={linkClass}>
                Places for sale
              </Link>
            </li>
            <li>
              <Link to="/search?offer=true" className={linkClass}>
                Special offers
              </Link>
            </li>
            <li>
              <Link to="/create-listing" className={linkClass}>
                Create a listing
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-slate-700 mb-3">Contact</h3>
          <ul className="flex flex-col gap-2 text-sm text-slate-600">
            <li className="flex items-center gap-2">
              <MdLocationOn className="shrink-0" /> 123 Estate Street, Your City
            </li>
            <li className="flex items-center gap-2">
              <MdPhone className="shrink-0" />
              +91 93254 16499
            </li>
            <li className="flex items-center gap-2">
              <MdEmail className="shrink-0" /> ammaramin5253@gmail.com
            </li>
          </ul>
          <div className="flex gap-3 mt-4">
            {socials.map(({ label, icon: Icon, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="w-8 h-8 rounded-full bg-slate-700 text-slate-100 flex items-center justify-center hover:bg-slate-500 transition-colors"
              >
                <Icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-300">
        <p className="max-w-6xl mx-auto px-3 py-4 text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} AminEstate. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
