// Script to create an admin user for testing
// Run with: node scripts/create-admin.js

const { createClient } = require('@supabase/supabase-js')

// You'll need to add your Supabase credentials here
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'your-supabase-url'
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'your-service-role-key'

if (!supabaseUrl || !supabaseKey || supabaseUrl === 'your-supabase-url') {
  console.log('❌ Please set your Supabase credentials in .env.local')
  console.log('Required: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function createAdminUser() {
  try {
    console.log('🔧 Creating admin user...')
    
    // First, create the user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: 'admin@smiley.com',
      password: 'admin123',
      email_confirm: true
    })

    if (authError) {
      console.error('❌ Auth error:', authError.message)
      return
    }

    console.log('✅ Auth user created:', authData.user.email)

    // Then create the profile with admin role
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: authData.user.id,
        email: authData.user.email,
        full_name: 'Admin User',
        role: 'super_admin',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })

    if (profileError) {
      console.error('❌ Profile error:', profileError.message)
      return
    }

    console.log('✅ Admin profile created successfully!')
    console.log('📧 Email: admin@smiley.com')
    console.log('🔑 Password: admin123')
    console.log('👑 Role: super_admin')
    
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

createAdminUser()
