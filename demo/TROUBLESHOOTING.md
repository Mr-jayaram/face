# 🔧 Common Errors & Solutions

This guide addresses the most common errors when working with face-api.js in the browser.

---

## ❌ Error 1: "faceapi is not defined"

### What it means:
The face-api.js library hasn't loaded or isn't available in the global scope.

### Common Causes:

#### 1. Wrong file path
```html
<!-- ❌ WRONG -->
<script src="face-api.min.js"></script>
<script src="../face-api.min.js"></script>

<!-- ✅ CORRECT -->
<script src="js/face-api.min.js"></script>
```

#### 2. File doesn't exist
- Check if `face-api.min.js` exists in the `js/` folder
- File size should be ~664 KB
- Download from: https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/dist/face-api.min.js

#### 3. Script loaded after your code
```html
<!-- ❌ WRONG ORDER -->
<script>
  console.log(faceapi); // Error: faceapi is not defined
</script>
<script src="js/face-api.min.js"></script>

<!-- ✅ CORRECT ORDER -->
<script src="js/face-api.min.js"></script>
<script>
  console.log(faceapi); // Works!
</script>
```

#### 4. Using file:// protocol
- Opening `index.html` directly (double-click) uses `file://` protocol
- This blocks script loading due to CORS
- **Solution:** Use a local server (Live Server, http-server, etc.)

### How to verify it's loaded:

1. Open browser console (F12)
2. Type: `console.log(faceapi)`
3. You should see an object with methods like `detectAllFaces`, `nets`, etc.

### ✅ Solution Checklist:
- [ ] File exists at `demo/js/face-api.min.js`
- [ ] Script tag is in `<body>` before your code
- [ ] Using correct relative path
- [ ] Running on localhost (not file://)
- [ ] Check Network tab in DevTools for 404 errors

---

## ❌ Error 2: "exports is not defined"

### What it means:
You're using the Node.js/CommonJS version of face-api.js instead of the browser version.

### Common Causes:

#### 1. Wrong version downloaded
```javascript
// ❌ This is Node.js code (won't work in browser)
const faceapi = require('face-api.js');
import * as faceapi from 'face-api.js';
```

#### 2. Using npm package directly
If you installed via npm:
```bash
npm install face-api.js
```

The default export is for Node.js. You need the browser build.

### ✅ Solutions:

#### Solution 1: Use the browser version (UMD build)
Download the minified browser version:
```
https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/dist/face-api.min.js
```

#### Solution 2: If using npm, use the dist folder
```html
<script src="node_modules/face-api.js/dist/face-api.min.js"></script>
```

#### Solution 3: Remove require/import statements
```html
<!-- ❌ WRONG (Node.js style) -->
<script>
  const faceapi = require('face-api.js'); // Error!
</script>

<!-- ✅ CORRECT (Browser style) -->
<script src="js/face-api.min.js"></script>
<script>
  // faceapi is now available globally
  faceapi.nets.tinyFaceDetector.loadFromUri('models');
</script>
```

### File naming:
- ✅ `face-api.min.js` (browser version, UMD build)
- ❌ `face-api.js` (Node.js version, CommonJS)
- ❌ `face-api.esm.js` (ES6 modules, needs bundler)

---

## ❌ Error 3: Models fail to load (404 errors)

### What it means:
The model files can't be found at the specified path.

### Common Causes:

#### 1. Wrong folder path
```javascript
// ❌ WRONG
await faceapi.nets.tinyFaceDetector.loadFromUri('model');
await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
await faceapi.nets.tinyFaceDetector.loadFromUri('./models/');

// ✅ CORRECT
await faceapi.nets.tinyFaceDetector.loadFromUri('models');
```

#### 2. Missing model files
Required files for TinyFaceDetector:
- `tiny_face_detector_model-shard1` (193 KB)
- `tiny_face_detector_model-weights_manifest.json` (3 KB)

Download from:
- https://github.com/justadudewhohacks/face-api.js/tree/master/weights

#### 3. Wrong file names
Files must be named EXACTLY:
- ✅ `tiny_face_detector_model-shard1`
- ❌ `tiny_face_detector_model-shard1.txt`
- ❌ `tiny_face_detector_model-shard1.bin`

#### 4. Using file:// protocol
- Model loading requires HTTP/HTTPS
- **Solution:** Use localhost

### ✅ Solution Checklist:
- [ ] `models/` folder exists in same directory as `index.html`
- [ ] Model files are named correctly (no extra extensions)
- [ ] Path in code is `'models'` (relative path)
- [ ] Running on localhost
- [ ] Check Network tab for 404 errors

---

## ❌ Error 4: "file:// protocol doesn't work"

### Why file:// doesn't work:

#### 1. CORS Security Policy
Modern browsers block cross-origin requests from `file://` for security:
- Can't load external scripts
- Can't load model files
- Can't make fetch/XHR requests

#### 2. getUserMedia() requires secure context
The camera API only works on:
- `https://` (secure)
- `http://localhost` (localhost exception)
- NOT `file://` (insecure)

#### 3. Module loading blocked
Browser blocks loading resources from local filesystem.

### ✅ Solution: Use a local server

#### Option 1: VS Code Live Server (Easiest)
1. Install "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"
4. Opens at `http://localhost:5500`

#### Option 2: Python
```bash
# Python 3
python -m http.server 8000

# Open: http://localhost:8000
```

#### Option 3: Node.js
```bash
# Install once
npm install -g http-server

# Run
http-server -p 8000

# Open: http://localhost:8000
```

#### Option 4: PHP
```bash
php -S localhost:8000

# Open: http://localhost:8000
```

---

## ❌ Error 5: Camera not working

### Common Causes:

#### 1. Permission denied
- Browser asks for camera permission
- User clicked "Block" or "Deny"

**Solution:**
- Click the camera icon in browser address bar
- Change permission to "Allow"
- Reload page

#### 2. Camera in use
- Another app is using the camera
- Another browser tab is using the camera

**Solution:**
- Close other apps (Zoom, Skype, etc.)
- Close other browser tabs with camera access

#### 3. Not using secure context
- Camera requires HTTPS or localhost
- Won't work on `file://` or `http://` (non-localhost)

**Solution:**
- Use `http://localhost` or `https://`

#### 4. Browser doesn't support getUserMedia
- Very old browsers don't support it

**Solution:**
- Use modern browser (Chrome 53+, Firefox 36+, Safari 11+)

### How to debug:

```javascript
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    console.log('Camera works!', stream);
  })
  .catch(error => {
    console.error('Camera error:', error.name, error.message);
  });
```

Error types:
- `NotAllowedError` → Permission denied
- `NotFoundError` → No camera found
- `NotReadableError` → Camera in use
- `SecurityError` → Not secure context (use localhost)

---

## ❌ Error 6: CORS errors

### What you see:
```
Access to fetch at 'file:///models/...' from origin 'null' has been blocked by CORS policy
```

### Why it happens:
- Loading resources from `file://` protocol
- Browser blocks for security

### ✅ Solution:
Use a local server (see Error 4 above)

---

## 🔍 Debugging Checklist

When something doesn't work:

### 1. Check Browser Console (F12)
- Look for red error messages
- Check what the error says
- Look for 404 errors (file not found)

### 2. Check Network Tab (F12 → Network)
- See if files are loading (200 = success, 404 = not found)
- Check file sizes match expected sizes
- Look for CORS errors

### 3. Verify File Structure
```
demo/
├── index.html          ✅ Should exist
├── js/
│   └── face-api.min.js ✅ Should be ~664 KB
└── models/
    ├── tiny_face_detector_model-shard1                 ✅ Should be ~193 KB
    └── tiny_face_detector_model-weights_manifest.json  ✅ Should be ~3 KB
```

### 4. Test in Console
```javascript
// Test 1: Is faceapi loaded?
console.log(faceapi);

// Test 2: Can we access camera?
navigator.mediaDevices.getUserMedia({ video: true })
  .then(s => console.log('Camera OK'))
  .catch(e => console.error('Camera error:', e));

// Test 3: What's the current URL?
console.log(window.location.href);
// Should be: http://localhost:XXXX/index.html
// NOT: file:///C:/Users/.../index.html
```

### 5. Clear Cache
Sometimes old files cause issues:
- Press Ctrl+Shift+R (hard reload)
- Or: DevTools → Network → Disable cache

---

## 📞 Still Having Issues?

### Check these:
1. ✅ Using a local server (not file://)
2. ✅ All files exist in correct folders
3. ✅ File names are exactly correct
4. ✅ Browser console shows no errors
5. ✅ Camera permission allowed
6. ✅ Using modern browser
7. ✅ Internet connection (for first-time CDN downloads)

### Test with minimal code:
```html
<!DOCTYPE html>
<html>
<body>
  <script src="js/face-api.min.js"></script>
  <script>
    console.log('faceapi loaded:', typeof faceapi !== 'undefined');
    faceapi.nets.tinyFaceDetector.loadFromUri('models')
      .then(() => console.log('Models loaded!'))
      .catch(err => console.error('Model error:', err));
  </script>
</body>
</html>
```

If this works, the issue is in your main code.
If this doesn't work, check file paths and server setup.

---

**Good luck! 🎭**
