"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    BuildingOffice2Icon,
    MapIcon,
    HomeModernIcon,
    TagIcon,
    StarIcon,
    Squares2X2Icon
} from "@heroicons/react/24/outline";

const navigation = [
    { name: "Dashboard", href: "/admin", icon: Squares2X2Icon },
    { name: "Hotels", href: "/admin/hotels", icon: BuildingOffice2Icon },
    { name: "Cities", href: "/admin/cities", icon: MapIcon },
    { name: "Localities", href: "/admin/localities", icon: HomeModernIcon },
    { name: "Categories", href: "/admin/categories", icon: TagIcon },
    { name: "Home Cities", href: "/admin/home-cities", icon: StarIcon },
    { name: "Bookings", href: "/admin/bookings", icon: Squares2X2Icon },
    { name: "Payments", href: "/admin/payments", icon: StarIcon },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-primary px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
                <span className="font-brand text-3xl text-accent">Kwik Stayz</span>
                <span className="ml-2 text-xs text-white/60 uppercase tracking-widest border border-white/20 px-2 py-0.5 rounded">Admin</span>
            </div>
            <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                        <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => {
                                const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
                                return (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            className={`
                        group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold
                        ${isActive
                                                    ? "bg-white text-primary shadow-sm"
                                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                                                }
                      `}
                                        >
                                            <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                            {item.name}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
