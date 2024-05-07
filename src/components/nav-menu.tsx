"use client"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"

import Link from "next/link"

import { usePathname } from "next/navigation";

const menuItems : {text: string, path: string}[] = [
    {
        text: "Files",
        path: "/files",
    },
]

export default function NavMenu() {
    const pathName = usePathname();
    return (
        <NavigationMenu >
            <NavigationMenuList>
                {menuItems.map((menuItem, index) => (
                    <NavigationMenuItem key={index}>
                        <Link href={menuItem.path} legacyBehavior passHref>
                            <NavigationMenuLink 
                                className={`text-white font-bold text-xl p-1 ${pathName == menuItem.path ? "border-b-4" : ""}`}>
                                {menuItem.text}
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
}
