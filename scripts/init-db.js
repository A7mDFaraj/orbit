/**
 * Database Initialization Script
 * Run this after starting the development server to seed the database
 * 
 * Usage: node scripts/init-db.js
 */

const http = require('http');

const SERVER_HOST = 'localhost';
const SERVER_PORT = 3000;
const SEED_PATH = '/api/seed';

// First, check if server is running
function checkServer(callback) {
  const checkReq = http.request({
    hostname: SERVER_HOST,
    port: SERVER_PORT,
    path: '/',
    method: 'GET',
    timeout: 3000,
  }, (res) => {
    callback(true);
  });

  checkReq.on('error', () => {
    callback(false);
  });

  checkReq.on('timeout', () => {
    checkReq.destroy();
    callback(false);
  });

  checkReq.end();
}

const options = {
  hostname: SERVER_HOST,
  port: SERVER_PORT,
  path: SEED_PATH,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
};

console.log('🔍 Checking if server is running...\n');

checkServer((isRunning) => {
  if (!isRunning) {
    console.error('❌ Server is not running on http://localhost:3000');
    console.log('\n💡 Please start the development server first:');
    console.log('   npm run dev\n');
    console.log('   Then run this script again:');
    console.log('   npm run seed\n');
    process.exit(1);
  }

  console.log('✅ Server is running');
  
  // Test if the API route exists
  console.log('🔍 Testing API endpoint...\n');
  testApiEndpoint(() => {
    console.log('🌱 Seeding database...\n');
    makeSeedRequest();
  });
});

function testApiEndpoint(callback) {
  const testReq = http.request({
    hostname: SERVER_HOST,
    port: SERVER_PORT,
    path: SEED_PATH,
    method: 'GET', // Use GET to test if route exists (will return 405 Method Not Allowed if route exists)
    timeout: 3000,
  }, (res) => {
    // If we get 405, the route exists but doesn't accept GET (which is expected)
    // If we get 404, the route doesn't exist
    if (res.statusCode === 405) {
      console.log('✅ API endpoint exists (405 Method Not Allowed is expected for GET)\n');
      callback();
    } else if (res.statusCode === 404) {
      console.error('❌ API endpoint /api/seed not found (404)');
      console.log('\n💡 The route file exists but Next.js may not have loaded it.');
      console.log('   Try:');
      console.log('   1. Stop the server (Ctrl+C)');
      console.log('   2. Delete .next folder: Remove-Item -Recurse -Force .next');
      console.log('   3. Restart server: npm run dev');
      console.log('   4. Wait for "Ready" message, then run: npm run seed\n');
      process.exit(1);
    } else {
      // Other status codes - route might exist
      console.log('⚠️  Got status code:', res.statusCode, '- proceeding anyway...\n');
      callback();
    }
  });

  testReq.on('error', (error) => {
    console.error('❌ Error testing endpoint:', error.message);
    process.exit(1);
  });

  testReq.on('timeout', () => {
    console.error('❌ Timeout testing endpoint');
    testReq.destroy();
    process.exit(1);
  });

  testReq.end();
}

function makeSeedRequest() {
  const req = http.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      // Check if response is HTML (404 or error page)
      if (data.trim().startsWith('<!DOCTYPE') || data.trim().startsWith('<html')) {
        console.error('❌ Server returned HTML instead of JSON');
        console.error('   Status Code:', res.statusCode);
        console.error('   URL: http://' + SERVER_HOST + ':' + SERVER_PORT + SEED_PATH);
        console.error('   This usually means:');
        console.error('   1. The API endpoint /api/seed does not exist');
        console.error('   2. The server returned an error page');
        console.error('   3. Next.js may need to rebuild routes');
        console.log('\n💡 Try:');
        console.log('   1. Stop the server (Ctrl+C)');
        console.log('   2. Delete .next folder: Remove-Item -Recurse -Force .next');
        console.log('   3. Restart server: npm run dev');
        console.log('   4. Wait for "Ready" message, then run: npm run seed\n');
        process.exit(1);
      }

      // Check status code before parsing
      if (res.statusCode !== 200) {
        console.error('❌ Request failed with status:', res.statusCode);
        try {
          const errorResponse = JSON.parse(data);
          console.error('   Error:', errorResponse.error || errorResponse.message || 'Unknown error');
          if (errorResponse.details) {
            console.error('   Details:', errorResponse.details);
          }
        } catch (e) {
          console.error('   Response:', data.substring(0, 200));
        }
        process.exit(1);
      }

      try {
        const response = JSON.parse(data);
        
        if (response.admin) {
          console.log('✅ Database seeded successfully!\n');
          console.log('📋 Admin Credentials:');
          console.log('   Email:', response.admin.email);
          console.log('   Password:', response.admin.password);
          console.log('\n🌐 Access your website:');
          console.log('   Main Site: http://localhost:3000');
          console.log('   Admin Panel: http://localhost:3000/admin\n');
          process.exit(0);
        } else {
          console.log('✅ Response received:', JSON.stringify(response, null, 2));
          process.exit(0);
        }
      } catch (error) {
        console.error('❌ Failed to parse JSON response');
        console.error('   Error:', error.message);
        console.error('   Response (first 500 chars):', data.substring(0, 500));
        console.log('\n💡 The endpoint may have returned an unexpected format\n');
        process.exit(1);
      }
    });
  });

  req.on('error', (error) => {
    console.error('❌ Connection error:', error.message);
    console.log('\n💡 Make sure:');
    console.log('   1. The development server is running (npm run dev)');
    console.log('   2. MongoDB is running and connected');
    console.log('   3. .env.local file exists with correct settings\n');
    process.exit(1);
  });

  req.on('timeout', () => {
    console.error('❌ Request timeout - server took too long to respond');
    req.destroy();
    process.exit(1);
  });

  req.end();
}

