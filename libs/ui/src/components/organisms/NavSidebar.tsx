import { useDialogState } from "@autospace/util/hooks/dialog"
import { MenuItem } from "@autospace/util/types"
import { IconMenu2 } from "@tabler/icons-react"
import { Sidebar } from "./Sidebar"
import { UserInfo } from "../molecules/UserInfo"
import Link from "next/link"
import { LogoutButton } from "../molecules/LogoutButton"

export interface INavSidebarProps {
    menuItems: MenuItem[]
}

export const NavSidebar = ({ menuItems }: INavSidebarProps) => {

    const [open, setOpen] = useDialogState()  // custom hook -> change when navigate to another page.

    return (
        <>
            <button type="button"
                onClick={() => setOpen((state) => !state)}
                className="p-2"
                aria-label="Open main menu"
            >
                <IconMenu2 className="w-5 h-5" />
            </button>
            <Sidebar open={open} setOpen={setOpen}>
                <div className="flex flex-col justify-between h-full">
                    <div>
                        <UserInfo className="mb-4" />
                        <div className="flex flex-col items-start justify-between space-y-1">

                            {menuItems.map(({ label, href }) => (
                                <Link
                                    className="hover:underline underline-offset-8 transition-all hover:pl-1"
                                    key={label}
                                    href={href}
                                >
                                    {label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div >
                        <LogoutButton />
                    </div>
                </div>
            </Sidebar>
        </>
    )
}