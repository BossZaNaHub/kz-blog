import { IconBaseProps } from "react-icons"
import { LuMenu } from "react-icons/lu"

export type SideMenu = {
    group: string
    name: string
    path: string
    icon?: React.ReactElement<IconBaseProps>
    subMenu?: SubMenu[]
}

export type SubMenu = {
    name: string
    path: string
}

//Example

// const SideMenuList: SideMenu[] = [
//     {
//         group: "",
//         name: "",
//         path: "",
//         icon: <LuMenu />
//     }
// ]