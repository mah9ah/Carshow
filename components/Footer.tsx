import Image from "next/image";
import Link from "next/link";

import { footerLinks } from "@constants";

const socialLinks = [
  { href: "https://facebook.com", icon: "/facebook.svg", alt: "Facebook" },
  { href: "https://twitter.com", icon: "/twitter.svg", alt: "Twitter" },
  { href: "https://instagram.com", icon: "/instagram.svg", alt: "Instagram" },
];

const Footer = () => (
  <footer className="bg-gray-50 text-black-100 mt-10 border-t border-gray-200">
    <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between sm:px-16 px-6 py-10 gap-10">
      {/* Left side: Logo and copyright */}
      <div className="flex flex-col justify-start items-start gap-6 md:w-1/4">
        <Image
          src="/logo.svg"
          alt="logo"
          width={118}
          height={18}
          className="object-contain"
        />
        <p className="text-gray-600 text-sm">
          © 2025 CarShow. All rights reserved.
        </p>
      </div>

      {/* Middle: Footer links */}
      <div className="flex flex-wrap gap-10 justify-center md:justify-start md:w-2/4">
        {footerLinks.map((section) => (
          <div key={section.title} className="min-w-[120px]">
            <h3 className="font-semibold text-gray-900 mb-4">{section.title}</h3>
            <ul className="flex flex-col gap-3">
              {section.links.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.url}
                    className="text-gray-600 hover:text-primary-blue transition"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Right side: Socials and Contact */}
      <div className="flex flex-col justify-between md:w-1/4">
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Contact Us</h3>
          <p className="text-gray-600 text-sm">
            Email: support@carshow.com
            <br />
            Phone: +1 (555) 123-4567
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            {socialLinks.map(({ href, icon, alt }) => (
              <Link key={alt} href={href} target="_blank" rel="noopener noreferrer">
                <Image src={icon} alt={alt} width={24} height={24} className="hover:opacity-80 transition" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>

    <div className="border-t border-gray-200 text-gray-500 text-center py-4 text-xs sm:text-sm">
      <p>
        Privacy & Policy | Terms & Condition
      </p>
    </div>
  </footer>
);

export default Footer;
