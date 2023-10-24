/** Icons are imported separatly to reduce build time */
import DocumentTextIcon from '@heroicons/react/24/outline/DocumentTextIcon'
import TableCellsIcon from '@heroicons/react/24/outline/TableCellsIcon'
import WalletIcon from '@heroicons/react/24/outline/WalletIcon'
import CodeBracketSquareIcon from '@heroicons/react/24/outline/CodeBracketSquareIcon'
import CalendarDaysIcon from '@heroicons/react/24/outline/CalendarDaysIcon'
import UserIcon from '@heroicons/react/24/outline/UserIcon'
import Cog6ToothIcon from '@heroicons/react/24/outline/Cog6ToothIcon'
import BoltIcon from '@heroicons/react/24/outline/BoltIcon'
import ChartBarIcon from '@heroicons/react/24/outline/ChartBarIcon'
import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon'
import InboxArrowDownIcon from '@heroicons/react/24/outline/InboxArrowDownIcon'
import DocumentDuplicateIcon from '@heroicons/react/24/outline/DocumentDuplicateIcon'
import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon'
import ExclamationTriangleIcon from '@heroicons/react/24/outline/ExclamationTriangleIcon'
import UsersIcon from '@heroicons/react/24/outline/UsersIcon'
import KeyIcon from '@heroicons/react/24/outline/KeyIcon'
import UserPlusIcon from '@heroicons/react/24/outline/UserPlusIcon'
import IdentificationIcon from '@heroicons/react/24/outline/IdentificationIcon'
import UserGroupIcon from '@heroicons/react/24/outline/UserGroupIcon'
import WrenchScrewdriverIcon from '@heroicons/react/24/outline/WrenchScrewdriverIcon'
import WrenchIcon from '@heroicons/react/24/outline/WrenchIcon'
import ShoppingCartIcon from '@heroicons/react/24/outline/ShoppingCartIcon'
import TagIcon from '@heroicons/react/24/outline/TagIcon'
import { LiaUsersCogSolid } from 'react-icons/lia';
import { VscSymbolColor } from 'react-icons/vsc';
import { IoListCircleOutline } from 'react-icons/io5';
import { RiFontColor } from 'react-icons/ri';

const iconClasses = `h-6 w-6`
const submenuIconClasses = `h-5 w-5`

const routes = [

  {
    path: '/app/dashboard',
    icon: <Squares2X2Icon className={iconClasses} />,
    name: 'داشبورد',
  },
  // {
  //   path: '/app/leads', // url
  //   icon: <InboxArrowDownIcon className={iconClasses} />, // icon component
  //   name: 'Leads', // name that appear in Sidebar
  // },
  // {
  //   path: '/app/transactions', // url
  //   icon: <CurrencyDollarIcon className={iconClasses} />, // icon component
  //   name: 'Transactions', // name that appear in Sidebar
  // },
  // {
  //   path: '/app/charts', // url
  //   icon: <ChartBarIcon className={iconClasses} />, // icon component
  //   name: 'Analytics', // name that appear in Sidebar
  // },
  // {
  //   path: '/app/integration', // url
  //   icon: <BoltIcon className={iconClasses} />, // icon component
  //   name: 'Integration', // name that appear in Sidebar
  // },
  // {
  //   path: '/app/calendar', // url
  //   icon: <CalendarDaysIcon className={iconClasses} />, // icon component
  //   name: 'Calendar', // name that appear in Sidebar
  // },

  {
    path: '/app/roles',
    icon: <IdentificationIcon className={`${iconClasses} inline`} />,
    name: 'مدیریت نقش ها',
  },
  {
    path: '/app/brands',
    icon: <TagIcon className={`${iconClasses} inline`} />,
    name: ' برند ها',
  },

  // {
  //   path: '', //no url needed as this has submenu
  //   icon: <IdentificationIcon className={`${iconClasses} inline`} />, // icon component
  //   name: 'مدیریت نقش ها', // name that appear in Sidebar
  //   submenu: [

  //     {
  //       path: '/app/roles', //url
  //       icon: <UsersIcon className={submenuIconClasses} />, // icon component
  //       name: 'لیست نقش ها', // name that appear in Sidebar
  //     },

  //     {
  //       path: '/app/roles/new', //url
  //       icon: <UserPlusIcon className={submenuIconClasses} />, // icon component
  //       name: 'ثبت نقش جدید', // name that appear in Sidebar
  //     },
  //   ]
  // },

  {
    path: '', //no url needed as this has submenu
    icon: <UserGroupIcon className={`${iconClasses} inline`} />, // icon component
    name: 'مدیریت کاربران', // name that appear in Sidebar
    submenu: [

      {
        path: '/app/users', //url
        icon: <UsersIcon className={submenuIconClasses} />, // icon component
        name: 'لیست کاربران', // name that appear in Sidebar
      },

      {
        path: '/register', //url
        icon: <UserPlusIcon className={submenuIconClasses} />, // icon component
        name: 'ثبت کاربر جدید', // name that appear in Sidebar
      },
      {
        path: '/app/password-change',
        icon: <KeyIcon className={submenuIconClasses} />,
        name: 'بازیابی رمز عبور',
      },
      {
        path: '/app/404',
        icon: <ExclamationTriangleIcon className={submenuIconClasses} />,
        name: '404',
      },
    ]
  },
  {
    path: '', //no url needed as this has submenu
    icon: <WrenchScrewdriverIcon className={`${iconClasses} inline`} />, // icon component
    name: 'مدیریت اپراتور ها', // name that appear in Sidebar
    submenu: [

      {
        path: '/app/OporationTypes', //url
        icon: <WrenchIcon className={submenuIconClasses} />, // icon component
        name: 'تخصص ها', // name that appear in Sidebar
      },
      {
        path: '/app/oporators', //url
        icon: <LiaUsersCogSolid className={submenuIconClasses} />, // icon component
        name: 'لیست اپراتور ها', // name that appear in Sidebar
      },

      {
        path: '/register', //url
        icon: <UserPlusIcon className={submenuIconClasses} />, // icon component
        name: 'ثبت کاربر جدید', // name that appear in Sidebar
      },
    ]
  },
  {
    path: '', //no url needed as this has submenu
    icon: <ShoppingCartIcon className={`${iconClasses} inline`} />, // icon component
    name: ' محصولات ', // name that appear in Sidebar
    submenu: [

      {
        path: '/app/products/types', //url
        icon: <IoListCircleOutline className={submenuIconClasses} />, // icon component
        name: 'نوع محصول', // name that appear in Sidebar
      },
      {
        path: '/app/products/names', //url
        icon: <RiFontColor className={submenuIconClasses} />, // icon component
        name: 'نام محصول', // name that appear in Sidebar
      },

      {
        path: '/app/products/colors', //url
        icon: <VscSymbolColor className={submenuIconClasses} />, // icon component
        name: 'مدیریت رنگ ها', // name that appear in Sidebar
      },
    ]
  },

  // {
  //   path: '', //no url needed as this has submenu
  //   icon: <Cog6ToothIcon className={`${iconClasses} inline`} />, // icon component
  //   name: 'Settings', // name that appear in Sidebar
  //   submenu: [
  //     {
  //       path: '/app/settings-profile', //url
  //       icon: <UserIcon className={submenuIconClasses} />, // icon component
  //       name: 'Profile', // name that appear in Sidebar
  //     },
  //     {
  //       path: '/app/settings-billing',
  //       icon: <WalletIcon className={submenuIconClasses} />,
  //       name: 'Billing',
  //     },
  //     {
  //       path: '/app/settings-team', // url
  //       icon: <UsersIcon className={submenuIconClasses} />, // icon component
  //       name: 'Team Members', // name that appear in Sidebar
  //     },
  //   ]
  // },
  // {
  //   path: '', //no url needed as this has submenu
  //   icon: <DocumentTextIcon className={`${iconClasses} inline`} />, // icon component
  //   name: 'Documentation', // name that appear in Sidebar
  //   submenu: [
  //     {
  //       path: '/app/getting-started', // url
  //       icon: <DocumentTextIcon className={submenuIconClasses} />, // icon component
  //       name: 'Getting Started', // name that appear in Sidebar
  //     },
  //     {
  //       path: '/app/features',
  //       icon: <TableCellsIcon className={submenuIconClasses} />,
  //       name: 'Features',
  //     },
  //     {
  //       path: '/app/components',
  //       icon: <CodeBracketSquareIcon className={submenuIconClasses} />,
  //       name: 'Components',
  //     }
  //   ]
  // },

]

export default routes


