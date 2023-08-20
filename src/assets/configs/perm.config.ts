export const PERMISSION_SCOPES = [
  { id: 1, name: 'App' },
  { id: 2, name: 'CMS' }
];

export const APPLY_TYPES = [
  { id: 1, name: 'Cấp bậc' },
  { id: 2, name: 'user' }
]

export const PERMISSIONS = {
  // report 
  'report_booking_customer:read': { code: 'report_booking_customer:read', name: 'Report báo cáo danh sách khách đặt phòng' },
  'report_booking_payment:read': { code: 'report_booking_payment:read', name: 'Report thông tin thanh toán' },

  // Promotion
  'promotion:read': { code: 'promotion:read', name: 'Xem order' },
  'promotion:create': { code: 'promotion:create', name: 'Thêm order' },
  'promotion:update': { code: 'promotion:update', name: 'Sửa order' },
  'promotion:delete': { code: 'promotion:delete', name: 'Xoá order' },


  // Orders
  'order:read': { code: 'order:read', name: 'Xem order' },
  'order:create': { code: 'order:create', name: 'Thêm order' },
  'order:update': { code: 'order:update', name: 'Sửa order' },
  'order:delete': { code: 'order:delete', name: 'Xoá order' },

  // News
  'news:read': { code: 'news:read', name: 'Xem tin tức' },
  'news:create': { code: 'news:create', name: 'Thêm tin tức' },
  'news:update': { code: 'news:update', name: 'Sửa tin tức' },
  'news:delete': { code: 'news:delete', name: 'Xoá tin tức' },

  // Rooms
  'room:read': { code: 'room:read', name: 'Xem loại phòng' },
  'room:create': { code: 'room:create', name: 'Thêm loại phòng' },
  'room:update': { code: 'room:update', name: 'Sửa loại phòng' },
  'room:delete': { code: 'room:delete', name: 'Xoá loại phòng' },

  // System parameter
  'system_settings:read': { code: 'system_settings:read', name: 'Xem cấu hình tham số hệ thống' },
  'system_settings:update': { code: 'system_settings:update', name: 'Sửa cấu hình tham số hệ thống' },

  // Permissions
  'perm_group:update': { code: 'perm_group:update', name: 'Sửa nhóm quyền' },
  'perm_group:delete': { code: 'perm_group:delete', name: 'Xóa nhóm quyền' },
  'perm_group:create': { code: 'perm_group:create', name: 'Tạo nhóm quyền' },
  'perm_group:read': { code: 'perm_group:read', name: 'Xem nhóm quyền' },
}