import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { PlusIcon, BellIcon, PersonIcon } from "@radix-ui/react-icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
];

export function Header() {
  return (
    <header className="flex items-center justify-between bg-gray-100 py-4 px-8  w-screen">
      <div className="flex items-center justify-between w-screen mx-12">
        <div className="bg-slate-200 p-3 rounded-md">
          <Link href="/">LOGO</Link>
        </div>
        <div className="flex items-center space-x-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>My Projects</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/projects"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            All Projects
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Explore various projects from differnt part of the
                            World and contribute!
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/docs" title="Library">
                      Visit Your assigned Projects
                    </ListItem>
                    <ListItem href="/docs/installation" title="History">
                      View your completed project history!
                    </ListItem>
                    <ListItem
                      href="/docs/primitives/typography"
                      title="Proposals"
                    >
                      List of your submited Proposals
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {components.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/dashboard" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Dashboard
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center space-x-4 ">
          <input
            type="text"
            placeholder="Search..."
            className="w-[100vh] py-2 px-4 rounded-md border-gray-300 focus:outline-none focus:ring focus:border-blue-400"
          />

          <div className="flex gap-5">
            <div className="bg-slate-200 p-2 rounded-3xl cursor-pointer hover:bg-slate-300 shadow-md">
              <PlusIcon className="h-6 w-6" />
            </div>
            <div className="bg-slate-200 p-2 rounded-3xl cursor-pointer hover:bg-slate-300 shadow-md">
              <BellIcon className="h-6 w-6" />
            </div>
            <div className="bg-slate-200 p-2 rounded-3xl cursor-pointer hover:bg-slate-300 shadow-md">
              <PersonIcon className="h-6 w-6" />
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
