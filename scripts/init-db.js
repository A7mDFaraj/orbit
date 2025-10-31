/**
 * Database Initialization Script
 * Run this after starting the development server to seed the database
 * 
 * Usage: node scripts/init-db.js
 */

const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/seed',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

console.log('🌱 Seeding database...\n');

const req = http.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      
      if (res.statusCode === 200) {
        console.log('✅ Database seeded successfully!\n');
        console.log('📋 Admin Credentials:');
        console.log('   Email:', response.admin.email);
        console.log('   Password:', response.admin.password);
        console.log('\n🌐 Access your website:');
        console.log('   Main Site: http://localhost:3000');
        console.log('   Admin Panel: http://localhost:3000/admin\n');
      } else {
        console.error('❌ Seeding failed:', response.error || 'Unknown error');
      }
    } catch (error) {
      console.error('❌ Failed to parse response:', data);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Connection error:', error.message);
  console.log('\n💡 Make sure:');
  console.log('   1. The development server is running (npm run dev)');
  console.log('   2. MongoDB is running and connected');
  console.log('   3. .env.local file exists with correct settings\n');
});

req.end();

