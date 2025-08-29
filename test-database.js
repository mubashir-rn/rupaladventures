// Test script to verify Supabase connection and table existence
// Run this with: node test-database.js

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://qwshniujljdmrbucpuaq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3c2huaXVqbGpkbXJidWNwdWFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzNzQwNjEsImV4cCI6MjA3MTk1MDA2MX0.SeGBfqendYMlOiilwdmAFw3yc_9-ATbm-j91cUPywwY';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testDatabase() {
  console.log('🔍 Testing Supabase connection...');
  
  try {
    // Test 1: Check if we can connect
    console.log('\n1. Testing connection...');
    const { data, error } = await supabase.from('inquiries').select('count').limit(1);
    
    if (error) {
      if (error.code === 'PGRST116') {
        console.log('❌ Table "inquiries" does not exist');
        console.log('💡 You need to run the database setup script first');
        console.log('📁 Check database_setup.sql file');
        return;
      } else {
        console.log('❌ Database error:', error.message);
        return;
      }
    }
    
    console.log('✅ Connection successful!');
    console.log('✅ Table "inquiries" exists');
    
    // Test 2: Try to insert a test record
    console.log('\n2. Testing insert...');
    const testData = {
      first_name: 'Test',
      last_name: 'User',
      phone: '+1234567890',
      email: 'test@example.com',
      city: 'Test City',
      province: 'Test Province',
      organization: 'Test Org',
      country: 'Test Country',
      subject: 'Test Inquiry',
      message: 'This is a test inquiry',
      status: 'new'
    };
    
    const { data: insertData, error: insertError } = await supabase
      .from('inquiries')
      .insert(testData)
      .select();
    
    if (insertError) {
      console.log('❌ Insert failed:', insertError.message);
      console.log('🔍 Error details:', insertError);
    } else {
      console.log('✅ Insert successful!');
      console.log('📝 Inserted record:', insertData);
      
      // Clean up: Delete the test record
      if (insertData && insertData[0]) {
        const { error: deleteError } = await supabase
          .from('inquiries')
          .delete()
          .eq('id', insertData[0].id);
        
        if (deleteError) {
          console.log('⚠️  Warning: Could not delete test record:', deleteError.message);
        } else {
          console.log('🧹 Test record cleaned up');
        }
      }
    }
    
  } catch (error) {
    console.log('❌ Unexpected error:', error);
  }
}

testDatabase();
