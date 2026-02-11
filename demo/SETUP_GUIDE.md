# 🚀 Quick Start Guide

## ✅ Setup Complete!

All necessary files have been downloaded and are ready to use.

## 📁 Current Folder Structure

```
demo/
├── index.html                                          (13 KB)
├── README.md                                           (7.6 KB)
├── SETUP_GUIDE.md                                      (This file)
├── js/
│   └── face-api.min.js                                 (664 KB) ✅
└── models/
    ├── tiny_face_detector_model-shard1                 (193 KB) ✅
    └── tiny_face_detector_model-weights_manifest.json  (3 KB)   ✅
```

## 🎯 How to Run

### Option 1: Using VS Code Live Server (Recommended)

1. **Install Live Server extension** in VS Code (if not already installed)
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X)
   - Search for "Live Server" by Ritwick Dey
   - Click Install

2. **Start the server**
   - Right-click on `index.html`
   - Select "Open with Live Server"
   - Your browser will open automatically at `http://localhost:5500`

3. **Allow camera access** when prompted

4. **Click "Start Detection"** button

### Option 2: Using Python HTTP Server

```bash
# Python 3
python -m http.server 8000

# Then open: http://localhost:8000
```

### Option 3: Using Node.js http-server

```bash
# Install globally (one time)
npm install -g http-server

# Run server
http-server -p 8000

# Then open: http://localhost:8000
```

### Option 4: Using PHP Built-in Server

```bash
php -S localhost:8000

# Then open: http://localhost:8000
```

## ⚠️ Important Notes

### ❌ DO NOT open index.html directly (double-click)

Opening the file directly uses `file://` protocol which will cause:
- ❌ CORS errors when loading models
- ❌ Camera access blocked
- ❌ "faceapi is not defined" errors

### ✅ ALWAYS use a local server

The application MUST run on:
- `http://localhost:XXXX` ✅
- `https://yourdomain.com` ✅
- NOT `file:///C:/Users/...` ❌

## 🎮 How to Use

1. **Start the server** (see options above)
2. **Open in browser** (Chrome, Firefox, Edge recommended)
3. **Allow camera access** when prompted
4. **Click "Start Detection"** button
5. **Position your face** in front of the camera
6. **See the green box** around detected faces with confidence score

## 🎛️ Features

- ✅ Real-time face detection
- ✅ Multiple face detection
- ✅ Confidence score display (percentage)
- ✅ Face count tracker
- ✅ Mirrored video (selfie mode)
- ✅ Start/Stop controls
- ✅ Responsive design
- ✅ Modern gradient UI

## 🐛 Troubleshooting

### Camera not working?
- Check if camera is being used by another app
- Allow camera permission in browser
- Make sure you're using localhost (not file://)

### Models not loading?
- Check browser console (F12) for errors
- Verify files exist in `models/` folder
- Make sure you're using a local server

### "faceapi is not defined"?
- Verify `face-api.min.js` exists in `js/` folder
- Check browser console Network tab
- Clear browser cache and reload

### Low performance?
- Reduce detection frequency in code (increase interval from 100ms to 200ms)
- Lower inputSize in TinyFaceDetectorOptions (from 416 to 320 or 224)
- Close other browser tabs

## 📊 Performance Tips

### For better accuracy:
```javascript
new faceapi.TinyFaceDetectorOptions({
  inputSize: 512,        // Higher = more accurate
  scoreThreshold: 0.3    // Lower = detect more faces
})
```

### For better performance:
```javascript
new faceapi.TinyFaceDetectorOptions({
  inputSize: 224,        // Lower = faster
  scoreThreshold: 0.6    // Higher = fewer false positives
})
```

### Adjust detection speed:
```javascript
setInterval(async () => {
  await detectFaces();
}, 200); // 200ms = 5 FPS (change to 100ms for 10 FPS)
```

## 🎨 Customization

### Change detection box color:
Open `index.html` and find:
```javascript
ctx.strokeStyle = '#00ff00'; // Change to any color
```

### Change box thickness:
```javascript
ctx.lineWidth = 3; // Increase for thicker lines
```

### Remove mirror effect:
Remove or comment out these CSS lines:
```css
transform: scaleX(-1);
```

## 📚 Next Steps

Want to add more features? Check `README.md` for:
- Adding face landmarks (68 facial points)
- Face recognition
- Age and gender detection
- Expression detection
- Face comparison

## 🆘 Need Help?

1. Check the detailed `README.md` file
2. Open browser console (F12) to see errors
3. Verify all files are in correct folders
4. Make sure you're using a local server

## 🎉 You're All Set!

Everything is ready to go. Just start a local server and enjoy real-time face detection!

---

**Happy Coding! 🎭**
