import {
  HomeIcon,
  DocumentDuplicateIcon,
  BanknotesIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import routes from "../../../../shared/routes";
//import { usePathname } from 'next/navigation';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.

const links = [
  {
    name: "Home",
    href: routes.dashboard.home,
    icon: HomeIcon,
  },
  {
    name: "Shifts",
    href: routes.dashboard.shifts,
    icon: DocumentDuplicateIcon,
  },
  {
    name: "Reports",
    href: routes.dashboard.reports,
    icon: BanknotesIcon,
  },
  {
    name: "Settings",
    href: routes.dashboard.settings,
    icon: Cog6ToothIcon,
  },
];

export default function NavLinks() {
  const pathname = "usePathname";
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            to={link.href}
            className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3
                        ${pathname === link.href ? "bg-sky-100" : ""}
              `}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
