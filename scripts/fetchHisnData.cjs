const https = require('https');
const fs = require('fs');
const path = require('path');

const URL = 'https://raw.githubusercontent.com/asellam/HisnElMuslim/main/hisn.json';
const OUTPUT = path.join(__dirname, '..', 'client', 'src', 'data', 'hisn-raw.json');

https.get(URL, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    fs.writeFileSync(OUTPUT, data, 'utf8');
    console.log(`Downloaded ${data.length} bytes to ${OUTPUT}`);
  });
}).on('error', (err) => {
  console.error('Download failed:', err.message);
  process.exit(1);
});
