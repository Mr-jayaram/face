// Simple Node.js + Express backend for image processing
// This is a basic example - customize based on your needs

const express = require('express');
const multer = require('multer');
const cors = require('cors');
const sharp = require('sharp'); // For image processing
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Enable CORS for frontend
app.use(cors());

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB max file size
    },
    fileFilter: (req, file, cb) => {
        // Accept images only
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    }
});

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// API endpoint to process image
app.post('/api/process-image', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image file provided' });
        }

        console.log('Received image:', req.file.originalname, `(${req.file.size} bytes)`);

        // Process the image with sharp
        // Example: Add a border, resize, apply filters, etc.
        const processedImage = await sharp(req.file.buffer)
            // Resize to max 800px width while maintaining aspect ratio
            .resize(800, null, {
                fit: 'inside',
                withoutEnlargement: true
            })
            // Add a border
            .extend({
                top: 10,
                bottom: 10,
                left: 10,
                right: 10,
                background: { r: 102, g: 126, b: 234, alpha: 1 } // Purple border
            })
            // Add text overlay (requires composite)
            .composite([{
                input: Buffer.from(
                    `<svg width="800" height="50">
                        <style>
                            .title { fill: white; font-size: 30px; font-weight: bold; font-family: Arial; }
                        </style>
                        <text x="50%" y="35" text-anchor="middle" class="title">Face Detected ✓</text>
                    </svg>`
                ),
                gravity: 'north'
            }])
            // Apply a slight blur for artistic effect (optional)
            // .blur(0.5)
            // Adjust brightness/contrast (optional)
            .modulate({
                brightness: 1.1, // 10% brighter
                saturation: 1.2  // 20% more saturated
            })
            // Convert to JPEG
            .jpeg({
                quality: 90,
                progressive: true
            })
            .toBuffer();

        console.log('Image processed successfully');

        // Optional: Save to disk
        const filename = `processed-${Date.now()}.jpg`;
        const filepath = path.join(uploadsDir, filename);
        fs.writeFileSync(filepath, processedImage);
        console.log('Saved to:', filepath);

        // Send processed image back to frontend
        res.set('Content-Type', 'image/jpeg');
        res.send(processedImage);

    } catch (error) {
        console.error('Error processing image:', error);
        res.status(500).json({
            error: 'Failed to process image',
            message: error.message
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Backend is running' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Backend server running on http://localhost:${PORT}`);
    console.log(`📸 Image processing endpoint: http://localhost:${PORT}/api/process-image`);
    console.log(`💚 Health check: http://localhost:${PORT}/api/health`);
});

// Error handling
app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ error: 'File is too large. Max size is 10MB' });
        }
    }
    res.status(500).json({ error: error.message });
});
