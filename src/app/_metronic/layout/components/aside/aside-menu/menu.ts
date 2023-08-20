import { PERMISSIONS } from '../../../../../../assets/configs/perm.config';
class MenuItem {
    type: string; // 'label' ,'line-separator', 'menu-item' , 'menu-accordion'
    label?: string;
    link?: string;
    icon?: string; inlineSVG?: string | undefined;
    subMenus?: MenuItem[];
    visibled?: boolean;
    permissions?: string[] | string | any;
}



/**
 *  Ex:
 *  { type: 'menu-item', label: 'Home' , link: "/dashboard", inlineSVG: './assets/media/icons/duotune/general/gen022.svg' },
    { type: 'menu-accordion', label: 'QUẢN LÝ KHÁCH HÀNG', inlineSVG: './assets/media/icons/duotune/general/gen022.svg',
      subMenus: [
        { type: 'menu-item', label: 'Overview', link: "/crafted/account/overview" },
        { type: 'menu-item', label: 'Settings', link: "/crafted/account/settings"  }
      ]
    },
    { type: 'menu-item', label: 'Danh sách chi nhánh' , link:"branch-management", inlineSVG: './assets/media/icons/duotune/general/Branch.svg' },
    { type: 'line-separator'},
    { type: 'label', label: 'Home' },
    { type: 'menu-item', label: 'Layout Builder' , link:"/builder", inlineSVG: './assets/media/icons/duotune/general/gen019.svg' },
 * 
*/

export const ASIDE_MENU: MenuItem[] = [
    {
        type: 'menu-accordion', label: 'Quản lý tham số hệ thống',
        inlineSVG: './assets/media/icons/duotune/general/UserAuth.svg', link: "system-settings",
        permissions: [
            PERMISSIONS['system_settings:read'].code
        ],
        subMenus: [
            {   type: 'menu-item', label: 'Tham số chung' ,
                link:"system-settings/common-configs", inlineSVG: './assets/media/icons/duotune/general/Switch.svg',
                permissions: [
                    PERMISSIONS['system_settings:read'].code,
                ]
            }
        ]
    },

    {
        type: 'menu-accordion', label: 'Quản lý phân quyền',
        inlineSVG: './assets/media/icons/duotune/general/UserAuth.svg', link: "perm",
        permissions: [
            PERMISSIONS['perm_group:read'].code
        ],
        subMenus: [
            {
                type: 'menu-item', label: 'Quản lý nhóm quyền', link: "perm/permissions-group",
                permissions: [
                    PERMISSIONS['perm_group:read'].code
                ]
            }
        ]
    },
    {
        type: 'menu-item', label: 'Danh sách order',
        link: "orders", inlineSVG: './assets/media/icons/duotune/general/Customer.svg',
        permissions: [
            PERMISSIONS['order:read'].code,
        ],
    },
    {
        type: 'menu-item', label: 'Quản lý tin tức',
        link: "news", inlineSVG: './assets/media/icons/duotune/general/Customer.svg',
        permissions: [
            PERMISSIONS['news:read'].code,
        ],
    },
    {
        type: 'menu-item', label: 'Quản lý loại phòng',
        link: "rooms", inlineSVG: './assets/media/icons/duotune/general/Customer.svg',
        permissions: [
            PERMISSIONS['room:read'].code,
        ],
    },
    {
        type: 'menu-item', label: 'Quản lý khuyến mãi',
        link: "promotions", inlineSVG: './assets/media/icons/duotune/general/Customer.svg',
        permissions: [
            PERMISSIONS['promotion:read'].code,
        ],
    },
    {
        type: 'menu-accordion', label: 'Báo cáo',
        inlineSVG: './assets/media/icons/duotune/general/UserAuth.svg', link: "report",
        permissions: [
            PERMISSIONS['report_booking_customer:read'].code,
            PERMISSIONS['report_booking_payment:read'].code
        ],
        subMenus: [
            {
                type: 'menu-item', label: 'Danh sách khách hàng đặt phòng', link: "report/booking-customer",
                permissions: [
                    PERMISSIONS['report_booking_customer:read'].code
                ]
            },
            {
                type: 'menu-item', label: 'Thông tin thanh toán', link: "report/booking-payment",
                permissions: [
                    PERMISSIONS['report_booking_payment:read'].code
                ]
            }
        ]
    },
    // { type: 'menu-item', link: 'design-system/components/', label: 'Design-system', inlineSVG: './assets/media/icons/duotune/general/gen022.svg' }

]
