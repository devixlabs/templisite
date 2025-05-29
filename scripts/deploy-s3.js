const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

// Configuration - set these via environment variables
const config = {
    bucket: process.env.S3_BUCKET || 'your-bucket-name',
    region: process.env.AWS_REGION || 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
};

const s3Client = new S3Client({
    region: config.region,
    credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey
    }
});

async function uploadFile(filePath, s3Key) {
    const fileContent = fs.readFileSync(filePath);
    const contentType = mime.lookup(filePath) || 'application/octet-stream';
    
    // Special cache control for API files
    let cacheControl = 'public, max-age=31536000'; // 1 year default
    if (s3Key.startsWith('api/')) {
        cacheControl = 'no-cache, no-store, must-revalidate, max-age=0';
    }

    const params = {
        Bucket: config.bucket,
        Key: s3Key,
        Body: fileContent,
        ContentType: contentType,
        CacheControl: cacheControl
    };

    try {
        await s3Client.send(new PutObjectCommand(params));
        console.log(`✓ Uploaded: ${s3Key}`);
    } catch (error) {
        console.error(`✗ Failed to upload ${s3Key}:`, error.message);
    }
}

async function uploadDirectory(dirPath, s3Prefix = '') {
    const items = fs.readdirSync(dirPath);

    for (const item of items) {
        const fullPath = path.join(dirPath, item);
        const s3Key = path.join(s3Prefix, item).replace(/\\/g, '/');

        if (fs.statSync(fullPath).isDirectory()) {
            await uploadDirectory(fullPath, s3Key);
        } else {
            await uploadFile(fullPath, s3Key);
        }
    }
}

async function deploy() {
    const distPath = path.join(__dirname, '..', 'dist');
    
    if (!fs.existsSync(distPath)) {
        console.error('❌ dist/ directory not found. Run "npm run build:prod" first.');
        process.exit(1);
    }

    console.log('🚀 Starting S3 deployment...');
    console.log(`📦 Bucket: ${config.bucket}`);
    console.log(`🌍 Region: ${config.region}`);

    try {
        await uploadDirectory(distPath);
        console.log('✅ Deployment completed successfully!');
    } catch (error) {
        console.error('❌ Deployment failed:', error.message);
        process.exit(1);
    }
}

// Check if required environment variables are set
if (!config.accessKeyId || !config.secretAccessKey) {
    console.error('❌ AWS credentials not found. Set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY environment variables.');
    process.exit(1);
}

deploy();
