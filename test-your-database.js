// Test script for your specific table structure
// Run with: node test-your-database.js

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://qwshniujljdmrbucpuaq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3c2huaXVqbGpkbXJidWNwdWFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzNzQwNjEsImV4cCI6MjA3MTk1MDA2MX0.SeGBfqendYMlOiilwdmAFw3yc_9-ATbm-j91cUPywwY';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testYourDatabase() {
  console.log('🔍 Testing your Supabase connection...');
  
  try {
    // Test 1: Check if we can connect and see table structure
    console.log('\n1. Testing connection and table structure...');
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .limit(1);
    
    if (error) {
      if (error.code === 'PGRST116') {
        console.log('❌ Table "inquiries" does not exist');
        console.log('💡 You need to create the table first');
        return;
      } else {
        console.log('❌ Database error:', error.message);
        console.log('🔍 Error details:', error);
        return;
      }
    }
    
    console.log('✅ Connection successful!');
    console.log('✅ Table "inquiries" exists');
    
    // Show table structure from sample data
    if (data && data.length > 0) {
      console.log('📋 Table structure from sample data:');
      Object.keys(data[0]).forEach(key => {
        const value = data[0][key];
        const type = typeof value;
        const isRequired = value !== null && value !== undefined;
        console.log(`  - ${key}: ${type} ${isRequired ? '(required)' : '(optional)'}`);
      });
    }
    
    // Test 2: Try to insert a test record
    console.log('\n2. Testing insert...');
    const testData = {
      first_name: 'Test',
      last_name: 'User',
      phone: '+1234567890',
      email: 'test@example.com',
      city: 'Test City',
      province: 'Test Province', // Optional
      organization: 'Test Org',   // Optional
      country: 'Test Country',
      subject: 'Test Inquiry',    // Optional
      message: 'This is a test inquiry' // Optional
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
    
    // Test 3: Test reading data
    console.log('\n3. Testing read operations...');
    const { data: readData, error: readError } = await supabase
      .from('inquiries')
      .select('first_name, last_name, email, city, country')
      .limit(5);
    
    if (readError) {
      console.log('❌ Read failed:', readError.message);
    } else {
      console.log('✅ Read successful!');
      console.log(`📖 Found ${readData?.length || 0} records`);
      if (readData && readData.length > 0) {
        console.log('📋 Sample records:');
        readData.forEach((record, index) => {
          console.log(`  ${index + 1}. ${record.first_name} ${record.last_name} - ${record.email}`);
        });
      }
    }
    
  } catch (error) {
    console.log('❌ Unexpected error:', error);
  }
}

testYourDatabase();
