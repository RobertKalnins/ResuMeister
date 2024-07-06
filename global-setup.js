const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

module.exports = async () => {
  const uuid = uuidv4();
  const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
  const downloadDir = path.resolve(__dirname, 'test-results', `${timestamp}_${uuid}`);

  // Store the UUID, timestamp and download dir in environment variables
  process.env.TEST_UUID = uuid;
  process.env.TEST_TIMESTAMP = timestamp;
  process.env.DOWNLOAD_DIR = downloadDir;

  // Create the directory
  fs.mkdirSync(downloadDir, { recursive: true });
};