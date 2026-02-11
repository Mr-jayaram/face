# Face Detection Project with face-api.js

A complete frontend-only face detection application using face-api.js and TinyFaceDetector model.

## 📁 Folder Structure

```
demo/
├── index.html          # Main HTML file
├── js/
│   └── face-api.min.js # face-api.js library (browser version)
├── models/             # Face detection model files
│   ├── tiny_face_detector_model-shard1
│   ├── tiny_face_detector_model-weights_manifest.json
│   └── (other model files if using additional features)
└── README.md           # This file
```

## 🚀 Setup Instructions

### Step 1: Download face-api.js

1. Go to: https://github.com/justadudewhohacks/face-api.js/releases
2. Download the latest release
3. Extract the archive
4. Copy `face-api.min.js` from the `dist` folder to your `demo/js/` folder

**Alternative - Direct Download:**
```
https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/dist/face-api.min.js
```
Download this file and save it to `demo/js/face-api.min.js`

### Step 2: Download Model Files

1. Go to: https://github.com/justadudewhohacks/face-api.js/tree/master/weights
2. Download the following files for TinyFaceDetector:
   - `tiny_face_detector_model-shard1`
   - `tiny_face_detector_model-weights_manifest.json`

3. Place these files in the `demo/models/` folder

**Direct Links:**
- https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/tiny_face_detector_model-shard1
- https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/tiny_face_detector_model-weights_manifest.json

### Step 3: Run with Live Server

1. Install Live Server extension in VS Code (or use any local server)
2. Right-click on `index.html` and select "Open with Live Server"
3. The application will open in your browser at `http://localhost:5500` (or similar)

## 📋 Required Model Files

### For Basic Face Detection (TinyFaceDetector):
- `tiny_face_detector_model-shard1` (1.1 MB)
- `tiny_face_detector_model-weights_manifest.json` (356 bytes)

### Optional - For Face Landmarks (68 points):
- `face_landmark_68_model-shard1`
- `face_landmark_68_model-weights_manifest.json`

### Optional - For Face Recognition:
- `face_recognition_model-shard1`
- `face_recognition_model-shard2`
- `face_recognition_model-weights_manifest.json`

## ❓ Common Issues & Fixes

### 1. Why doesn't it work with `file://` protocol?

**Problem:** Opening `index.html` directly (double-clicking) uses `file://` protocol.

**Reason:**
- Modern browsers block loading external resources (models, scripts) from `file://` due to CORS security policy
- `getUserMedia()` API requires HTTPS or localhost for security
- Model files cannot be loaded via `file://` protocol

**Solution:** Always use a local server (Live Server, http-server, etc.)

### 2. Error: "faceapi is not defined"

**Causes:**
- face-api.js file not loaded correctly
- Wrong path to face-api.min.js
- Using Node.js version instead of browser version

**Fixes:**
```html
<!-- ✅ CORRECT - Browser version -->
<script src="js/face-api.min.js"></script>

<!-- ❌ WRONG - Don't use these in browser -->
<script type="module">
  import * as faceapi from 'face-api.js'; // This is for Node.js
</script>
```

**Verify:**
- Check browser console: `console.log(faceapi)` should show an object
- Ensure `face-api.min.js` exists in `demo/js/` folder
- Check Network tab in DevTools to see if file loaded (200 status)

### 3. Error: "exports is not defined"

**Cause:** Using the Node.js/CommonJS version of face-api.js instead of the browser version.

**Fix:**
- Download `face-api.min.js` (browser version) NOT `face-api.js` (Node.js version)
- Remove any `require()` or `import` statements
- Use the UMD/browser build from the `dist` folder

**Wrong:**
```javascript
const faceapi = require('face-api.js'); // Node.js only
import * as faceapi from 'face-api.js'; // ES6 modules
```

**Correct:**
```html
<script src="js/face-api.min.js"></script>
<script>
  // faceapi is now available globally
  console.log(faceapi);
</script>
```

### 4. Models fail to load

**Error:** "Error loading models" or 404 errors in console

**Fixes:**
- Verify `models/` folder exists in the same directory as `index.html`
- Check that model files are named correctly (no `.txt` extension)
- Ensure model files are not corrupted (re-download if needed)
- Check browser console Network tab for 404 errors
- Verify the path in code matches your folder structure:
  ```javascript
  await faceapi.nets.tinyFaceDetector.loadFromUri('models');
  ```

### 5. Camera not working

**Possible causes:**
- Camera permission denied
- Not using HTTPS or localhost
- Camera already in use by another application
- Browser doesn't support `getUserMedia()`

**Fixes:**
- Allow camera permission when prompted
- Use localhost (Live Server)
- Close other apps using the camera
- Use a modern browser (Chrome, Firefox, Edge)

## 🎛️ Configuration Options

### TinyFaceDetector Options:

```javascript
new faceapi.TinyFaceDetectorOptions({
  inputSize: 416,        // 128, 160, 224, 320, 416, 512, 608
  scoreThreshold: 0.5    // 0.0 to 1.0 (confidence threshold)
})
```

- **inputSize:** Higher = more accurate but slower (416 is recommended)
- **scoreThreshold:** Lower = detect more faces but more false positives

### Detection Frequency:

```javascript
setInterval(async () => {
  await detectFaces();
}, 100); // Run every 100ms (10 FPS)
```

Adjust the interval for performance:
- 100ms = 10 FPS (smooth, recommended)
- 200ms = 5 FPS (slower, better performance)
- 50ms = 20 FPS (very smooth, higher CPU usage)

## 🌐 Browser Compatibility

- ✅ Chrome 53+
- ✅ Firefox 36+
- ✅ Safari 11+
- ✅ Edge 79+
- ✅ Opera 40+

## 📦 File Sizes

- `face-api.min.js`: ~800 KB
- TinyFaceDetector model: ~1.1 MB
- Total download: ~2 MB

## 🔒 Security Notes

- Camera access requires user permission
- Works on `localhost` or `https://` only
- No data is sent to any server (100% client-side)
- All processing happens in the browser

## 📚 Additional Resources

- **face-api.js GitHub:** https://github.com/justadudewhohacks/face-api.js
- **Documentation:** https://justadudewhohacks.github.io/face-api.js/docs/
- **Examples:** https://github.com/justadudewhohacks/face-api.js/tree/master/examples

## 🎨 Features

- ✅ Real-time face detection
- ✅ Multiple face detection
- ✅ Confidence score display
- ✅ Mirrored video (selfie mode)
- ✅ Responsive design
- ✅ Modern UI with animations
- ✅ Error handling
- ✅ Face count display

## 🛠️ Customization

### Change detection box color:
```javascript
ctx.strokeStyle = '#00ff00'; // Green (default)
ctx.strokeStyle = '#ff0000'; // Red
ctx.strokeStyle = '#0000ff'; // Blue
```

### Change box thickness:
```javascript
ctx.lineWidth = 3; // Default
ctx.lineWidth = 5; // Thicker
```

### Add face landmarks:
```javascript
// Uncomment in loadModels():
await faceapi.nets.faceLandmark68Net.loadFromUri('models');

// Modify detection:
const detections = await faceapi
  .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
  .withFaceLandmarks();

// Draw landmarks:
faceapi.draw.drawFaceLandmarks(canvas, detections);
```

## 📝 License

This project uses face-api.js which is MIT licensed.

## 🤝 Contributing

Feel free to modify and enhance this project for your needs!

---

**Happy Face Detecting! 🎭**
