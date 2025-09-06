# Supabase Setup Guide for SMILEY E-commerce

## 1. สร้าง Supabase Project

1. ไปที่ [Supabase Dashboard](https://supabase.com/dashboard)
2. คลิก "New Project"
3. เลือก Organization และตั้งชื่อ project: `smiley-ecommerce`
4. ตั้งรหัสผ่านสำหรับ database
5. เลือก region ที่ใกล้ที่สุด (แนะนำ Singapore สำหรับประเทศไทย)
6. คลิก "Create new project"

## 2. ตั้งค่า Environment Variables

1. ไปที่ Project Settings > API
2. คัดลอก URL และ anon key
3. สร้างไฟล์ `.env.local` จาก `env.example`:

```bash
cp env.example .env.local
```

4. แก้ไขไฟล์ `.env.local`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

## 3. สร้าง Database Schema

1. ไปที่ SQL Editor ใน Supabase Dashboard
2. คัดลอกโค้ดจากไฟล์ `supabase-schema.sql`
3. วางและรัน SQL script
4. ตรวจสอบว่า tables ถูกสร้างแล้วใน Table Editor

## 4. ตั้งค่า Authentication

1. ไปที่ Authentication > Settings
2. ตั้งค่า Site URL: `http://localhost:3000` (สำหรับ development)
3. ตั้งค่า Redirect URLs:
   - `http://localhost:3000/auth/callback`
   - `https://your-domain.com/auth/callback` (สำหรับ production)
4. เปิดใช้งาน Email confirmations (optional)

## 5. ตั้งค่า Row Level Security (RLS)

RLS policies ถูกสร้างแล้วใน schema script แต่คุณสามารถตรวจสอบได้ใน:
- Authentication > Policies
- Table Editor > [table_name] > RLS

## 6. ตั้งค่า Storage (Optional)

หากต้องการเก็บรูปภาพ:

1. ไปที่ Storage
2. สร้าง bucket ชื่อ `product-images`
3. ตั้งค่า public access
4. ตั้งค่า RLS policies สำหรับ bucket

## 7. ตั้งค่า Email Templates (Optional)

1. ไปที่ Authentication > Email Templates
2. ปรับแต่ง email templates ตามต้องการ
3. ตั้งค่า SMTP settings หากต้องการใช้ email service อื่น

## 8. ตรวจสอบการทำงาน

1. รัน development server:
```bash
npm run dev
```

2. ทดสอบการสมัครสมาชิกและเข้าสู่ระบบ
3. ตรวจสอบข้อมูลใน Supabase Dashboard

## 9. Production Setup

1. ตั้งค่า environment variables ใน Vercel/Netlify
2. เปลี่ยน Site URL และ Redirect URLs เป็น production domain
3. ตั้งค่า CORS policies หากจำเป็น
4. ตั้งค่า database backups

## Troubleshooting

### ปัญหาที่พบบ่อย:

1. **RLS Policy Error**: ตรวจสอบว่า policies ถูกสร้างถูกต้อง
2. **CORS Error**: ตรวจสอบ Site URL และ Redirect URLs
3. **Connection Error**: ตรวจสอบ environment variables
4. **Permission Error**: ตรวจสอบ service role key

### ข้อมูลเพิ่มเติม:

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js + Supabase Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
