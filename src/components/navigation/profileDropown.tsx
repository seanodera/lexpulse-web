import {Dropdown, Avatar, Button} from 'antd';
import {UserOutlined, SettingOutlined, LogoutOutlined} from '@ant-design/icons';
import {useRouter} from "next/navigation";
import {useAppDispatch, useAppSelector} from "@/hooks/hooks";
import {logout, selectCurrentUser} from "@/data/slices/authSlice";
import {IconButton} from "@/components/buttons";
import {CiSearch} from "react-icons/ci";
import Link from "next/link";
import {HiOutlineTicket} from "react-icons/hi2";
import {router} from "next/client";


const ProfileDropdown = ({ setDropdownVisible }: {setDropdownVisible: (value: boolean) => void}) => {
    
    const router = useRouter();
    const user = useAppSelector(selectCurrentUser);
    const dispatch = useAppDispatch();
    if (!user) {
        return <div className="flex gap-2 items-center max-md:w-full max-md:block">
            {/* <IconButton icon={<CiSearch/>} type="primary" className="text-lg"/> */}
            <Link href={'/login'}> <Button type="primary" className='max-md:w-full max-md:block'>Login</Button>
            </Link>
        </div>
    }
    const handleMenuClick = (open:boolean) => {
        setDropdownVisible(open);
    };
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
                    icon: <HiOutlineTicket/>,
                    label: 'Your Tickets',
                    onClick: () => {
                        router.push('/tickets');
                    }
                },
                {
                    key: 3,
                    icon: <SettingOutlined/>,
                    label: 'Settings'
                },
                {
                    key: 4,
                    icon: <LogoutOutlined/>,
                    label: ' Logout',
                    onClick: () => {
                        dispatch(logout());
                    },
                    danger: true
                }
            ]
        }} trigger={['click']}
        onOpenChange={handleMenuClick}
       
        >
            <div className="flex gap-2 items-center cursor-pointer">
                {/* Profile Avatar */}
                <Avatar size="large" icon={<UserOutlined/>}/>

                {/* Name and Email */}
                <div className="flex flex-col">
                    <span className="text-current font-medium">{user.firstName} {user.lastName}</span>
                    <span className="text-sm text-gray-400 w-min text-ellipsis">{user.email}</span>
                </div>
            </div>
        </Dropdown>
    );
};

export default ProfileDropdown;