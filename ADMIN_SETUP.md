# Admin System Setup Guide for SMILEY E-commerce

## Overview

ระบบ Admin สำหรับ SMILEY e-commerce ที่มีฟีเจอร์ครบถ้วนสำหรับการจัดการ:

- 🔐 **Admin Authentication** - ระบบเข้าสู่ระบบสำหรับ admin
- 👥 **User Management** - จัดการผู้ใช้และสิทธิ์
- 📦 **Product Management** - จัดการสินค้า
- 🛒 **Order Management** - จัดการคำสั่งซื้อ
- 📊 **Analytics Dashboard** - ดูสถิติและรายงาน
- ⚙️ **Settings Management** - ตั้งค่าระบบ

## Features

### 1. Role-Based Access Control (RBAC)

#### Admin Roles:
- **`admin`** - สิทธิ์พื้นฐานในการจัดการสินค้า, คำสั่งซื้อ, และเนื้อหา
- **`super_admin`** - สิทธิ์เต็มรูปแบบ รวมถึงการจัดการผู้ใช้และตั้งค่าระบบ

#### Permissions:
- `users:read` - ดูข้อมูลผู้ใช้
- `users:write` - สร้าง/แก้ไขผู้ใช้
- `users:delete` - ลบผู้ใช้
- `products:read` - ดูข้อมูลสินค้า
- `products:write` - สร้าง/แก้ไขสินค้า
- `products:delete` - ลบสินค้า
- `orders:read` - ดูคำสั่งซื้อ
- `orders:write` - แก้ไขคำสั่งซื้อ
- `orders:delete` - ลบคำสั่งซื้อ
- `content:read` - ดูเนื้อหา
- `content:write` - สร้าง/แก้ไขเนื้อหา
- `content:delete` - ลบเนื้อหา
- `analytics:read` - ดูสถิติ
- `settings:read` - ดูการตั้งค่า
- `settings:write` - แก้ไขการตั้งค่า

### 2. Admin Session Management

- Session-based authentication
- 24-hour session expiry
- Automatic session refresh
- Secure session storage

### 3. Middleware Protection

- Route-level protection
- Permission-based access control
- Automatic redirects for unauthorized access

## Setup Instructions

### 1. Database Setup

1. รัน SQL schema ใน Supabase Dashboard:
```sql
-- ดูไฟล์ supabase-schema.sql สำหรับ schema ครบถ้วน
```

2. สร้าง admin user แรก:
```sql
-- หลังจากสร้าง user ใน Supabase Auth แล้ว
INSERT INTO profiles (id, email, full_name, role, is_active) 
VALUES ('your-admin-user-id', 'admin@smiley.com', 'Admin User', 'super_admin', true);
```

### 2. Environment Variables

เพิ่มใน `.env.local`:
```env
# Admin System (already included in env.example)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 3. Usage

#### Admin Login
- ไปที่ `/admin/login`
- ใช้ email และ password ของ admin user
- ระบบจะตรวจสอบ role และ permissions

#### Admin Dashboard
- ไปที่ `/admin/dashboard` หลังจาก login
- ดูสถิติและข้อมูลสำคัญ
- เข้าถึงฟีเจอร์ต่างๆ ตาม permissions

#### Protected Routes
- `/admin/dashboard` - หน้าหลัก admin
- `/admin/users` - จัดการผู้ใช้ (super_admin เท่านั้น)
- `/admin/products` - จัดการสินค้า
- `/admin/orders` - จัดการคำสั่งซื้อ
- `/admin/content` - จัดการเนื้อหา
- `/admin/analytics` - ดูสถิติ
- `/admin/settings` - ตั้งค่าระบบ (super_admin เท่านั้น)

## API Usage

### Admin Authentication

```typescript
import { useAdmin } from '@/components/admin-provider'

function MyComponent() {
  const { user, signIn, signOut, hasPermission } = useAdmin()
  
  // Check if user is admin
  if (!user) {
    return <div>Please login</div>
  }
  
  // Check specific permission
  if (!hasPermission('products:write')) {
    return <div>No permission</div>
  }
  
  return <div>Admin content</div>
}
```

### Permission Hooks

```typescript
import { useAdminPermission, useAdminPermissions, useIsAdmin } from '@/components/admin-provider'

function MyComponent() {
  const canWriteProducts = useAdminPermission('products:write')
  const canManageUsers = useAdminPermissions(['users:read', 'users:write'])
  const isAdmin = useIsAdmin()
  
  return (
    <div>
      {canWriteProducts && <button>Edit Product</button>}
      {canManageUsers && <button>Manage Users</button>}
      {isAdmin && <div>Admin only content</div>}
    </div>
  )
}
```

### API Route Protection

```typescript
import { withAdminAPI } from '@/lib/admin-middleware'

export const GET = withAdminAPI(
  async (request) => {
    // Your API logic here
    return NextResponse.json({ data: 'success' })
  },
  {
    requiredPermissions: ['products:read'],
    allowedRoles: ['admin', 'super_admin']
  }
)
```

## Security Features

### 1. Row Level Security (RLS)
- Database-level security policies
- User can only access their own data
- Admins can access all data based on permissions

### 2. Session Security
- Secure session tokens
- Automatic session cleanup
- Session expiry handling

### 3. Permission Validation
- Frontend permission checks
- Backend API permission validation
- Middleware-level protection

## Troubleshooting

### Common Issues:

1. **"Access denied" error**
   - ตรวจสอบว่า user มี role ที่ถูกต้อง
   - ตรวจสอบว่า user account ยัง active อยู่

2. **"Insufficient permissions" error**
   - ตรวจสอบ permissions ของ user
   - ตรวจสอบว่า route ต้องการ permissions อะไร

3. **Session expired**
   - Login ใหม่
   - ตรวจสอบ session expiry settings

4. **Database connection error**
   - ตรวจสอบ Supabase credentials
   - ตรวจสอบ RLS policies

### Debug Mode:

เปิด debug mode ใน development:
```env
NEXT_PUBLIC_DEBUG=true
```

## Best Practices

1. **Always check permissions** before showing admin features
2. **Use middleware** for API route protection
3. **Implement proper error handling** for auth failures
4. **Regular session cleanup** to prevent database bloat
5. **Monitor admin activities** for security

## Support

หากมีปัญหาหรือคำถาม:
- ตรวจสอบ console logs
- ดู Supabase logs
- ตรวจสอบ network requests
- อ่าน documentation ของ Supabase
