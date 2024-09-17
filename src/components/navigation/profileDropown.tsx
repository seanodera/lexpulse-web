import {Dropdown, Avatar, Button} from 'antd';
import {UserOutlined, SettingOutlined, LogoutOutlined} from '@ant-design/icons';
import {useRouter} from "next/navigation";
import {useAppDispatch, useAppSelector} from "@/hooks/hooks";
import {logout, selectCurrentUser} from "@/data/slices/authSlice";
import {IconButton} from "@/components/buttons";
import {CiSearch} from "react-icons/ci";
import Link from "next/link";


const ProfileDropdown = () => {

    const router = useRouter();
    const user = useAppSelector(selectCurrentUser);
    const dispatch = useAppDispatch();
    if (!user) {
        return <div className="flex gap-2 items-center">
            <IconButton icon={<CiSearch/>} type="primary" className="text-lg"/>
            <Link href={'/login'}><Button type="primary">Login</Button></Link>
        </div>
    }

    return (
        <Dropdown menu={{
            items: [
                {
                    key: 1,
                    icon: <UserOutlined/>,
                    label: 'Profile'
                },
                {
                    key: 2,
                    icon: <SettingOutlined/>,
                    label: 'Settings'
                },
                {
                    key: 3,
                    icon: <LogoutOutlined/>,
                    label: ' Logout',
                    onClick: () => {
                        dispatch(logout());
                    },
                    danger: true
                }
            ]
        }} trigger={['click']}>
            <div className="flex gap-2 items-center cursor-pointer">
                {/* Profile Avatar */}
                <Avatar size="large" icon={<UserOutlined/>}/>

                {/* Name and Email */}
                <div className="flex flex-col">
                    <span className="text-white font-semibold">{user.firstName} {user.lastName}</span>
                    <span className="text-sm text-gray-400">{user.email}</span>
                </div>
            </div>
        </Dropdown>
    );
};

export default ProfileDropdown;