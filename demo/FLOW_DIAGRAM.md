# 🔄 Application Flow Diagram

## Complete Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER STARTS APP                          │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 1: Load Models                                            │
│  ─────────────────────                                          │
│  • Load face-api.min.js                                         │
│  • Load TinyFaceDetector model from /models                     │
│  • Status: "Models loaded successfully"                         │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 2: User Clicks "Start Detection"                         │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 3: Request Camera Access                                  │
│  ─────────────────────────────                                  │
│  • navigator.mediaDevices.getUserMedia()                        │
│  • User allows camera permission                               │
│  • Video stream starts                                          │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 4: Real-Time Face Detection (Loop every 100ms)           │
│  ────────────────────────────────────────────────               │
│  • Analyze video frame                                          │
│  • Detect faces with TinyFaceDetector                           │
│  • Draw green boxes around faces                                │
│  • Display confidence scores                                    │
│  • Update face count                                            │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
                    ┌────────┴────────┐
                    │  Face Detected? │
                    └────────┬────────┘
                             │
                    ┌────────┴────────┐
                    │       YES       │
                    └────────┬────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 5: Auto-Capture Photo (First Detection Only)             │
│  ──────────────────────────────────────────────                 │
│  • Set photoCaptured = true (prevent multiple captures)         │
│  • Show flash effect (white screen flash)                       │
│  • Create temporary canvas                                      │
│  • Capture video frame                                          │
│  • Flip image to normal orientation (remove mirror)             │
│  • Convert to JPEG blob (95% quality)                           │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 6: Show Loading Overlay                                   │
│  ────────────────────────────                                   │
│  • Display loading spinner                                      │
│  • Message: "Processing your photo..."                          │
│  • Blur background                                              │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 7: Send to Backend                                        │
│  ───────────────────────                                        │
│  • Create FormData                                              │
│  • Append image blob with field name 'image'                    │
│  • POST to http://localhost:3000/api/process-image              │
│  • Content-Type: multipart/form-data                            │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  BACKEND PROCESSING                                             │
│  ─────────────────                                              │
│                                                                 │
│  Node.js Backend (backend-example.js):                          │
│  ────────────────────────────────────                           │
│  1. Receive image via Multer                                    │
│  2. Process with Sharp:                                         │
│     • Resize to max 800px width                                 │
│     • Add purple border (10px)                                  │
│     • Add "Face Detected ✓" text overlay                        │
│     • Enhance brightness (+10%)                                 │
│     • Enhance saturation (+20%)                                 │
│     • Compress to JPEG (90% quality)                            │
│  3. Save to uploads/ folder                                     │
│  4. Return processed image as blob                              │
│                                                                 │
│  OR                                                             │
│                                                                 │
│  Python Backend (backend-python.py):                            │
│  ──────────────────────────────────                             │
│  1. Receive image via Flask request                             │
│  2. Process with Pillow:                                        │
│     • Resize to max 800px width                                 │
│     • Add purple border (10px)                                  │
│     • Add "Face Detected ✓" text overlay                        │
│     • Enhance brightness (+10%)                                 │
│     • Enhance saturation (+20%)                                 │
│     • Compress to JPEG (90% quality)                            │
│  3. Save to uploads/ folder                                     │
│  4. Return processed image as blob                              │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 8: Receive Processed Image                                │
│  ───────────────────────────────────                            │
│  • Get response blob from backend                               │
│  • Create object URL from blob                                  │
│  • Hide loading overlay                                         │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 9: Display Result                                         │
│  ──────────────────────                                         │
│  • Set result image src to object URL                           │
│  • Set download button href to object URL                       │
│  • Show result section (fade in animation)                      │
│  • Auto-scroll to result                                        │
│  • Status: "Image processed successfully!"                      │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 10: User Actions                                          │
│  ─────────────────────                                          │
│  • View processed image                                         │
│  • Click "Download Image" button                                │
│  • Image downloads as "processed-image.jpg"                     │
│  • Click "Stop Detection" to end session                        │
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Flow

```
┌──────────┐         ┌──────────┐         ┌──────────┐
│          │         │          │         │          │
│  Camera  │────────▶│  Video   │────────▶│ face-api │
│          │  Stream │  Element │  Frame  │   .js    │
└──────────┘         └──────────┘         └────┬─────┘
                                                │
                                                │ Detections
                                                ▼
                                          ┌──────────┐
                                          │  Canvas  │
                                          │  (Boxes) │
                                          └──────────┘
                                                │
                                                │ Face Found
                                                ▼
                                          ┌──────────┐
                                          │ Capture  │
                                          │  Photo   │
                                          └────┬─────┘
                                               │
                                               │ JPEG Blob
                                               ▼
                                          ┌──────────┐
                                          │ FormData │
                                          └────┬─────┘
                                               │
                                               │ HTTP POST
                                               ▼
                                          ┌──────────┐
                                          │ Backend  │
                                          │  Server  │
                                          └────┬─────┘
                                               │
                                               │ Process
                                               ▼
                                          ┌──────────┐
                                          │  Sharp/  │
                                          │  Pillow  │
                                          └────┬─────┘
                                               │
                                               │ Processed Blob
                                               ▼
                                          ┌──────────┐
                                          │ Response │
                                          └────┬─────┘
                                               │
                                               │ Image Blob
                                               ▼
                                          ┌──────────┐
                                          │  Result  │
                                          │  Display │
                                          └──────────┘
```

---

## File Structure Flow

```
Frontend (index.html)
├── Load face-api.min.js from /js
├── Load models from /models
├── Access webcam
├── Detect faces
├── Capture photo
└── Send to backend
    │
    ▼
Backend (backend-example.js or backend-python.py)
├── Receive image (Multer/Flask)
├── Process image (Sharp/Pillow)
├── Save to /uploads
└── Return processed image
    │
    ▼
Frontend (index.html)
├── Receive processed image
├── Display in result section
└── Enable download
```

---

## State Management

```
Application States:
─────────────────

1. INITIAL
   • Models: Not loaded
   • Camera: Off
   • Detection: Inactive
   • Capture: Not ready

2. MODELS_LOADED
   • Models: ✅ Loaded
   • Camera: Off
   • Detection: Inactive
   • Capture: Ready
   • Button: "Start Detection" enabled

3. CAMERA_ACTIVE
   • Models: ✅ Loaded
   • Camera: ✅ On
   • Detection: ✅ Active
   • Capture: Ready
   • Button: "Stop Detection" enabled

4. FACE_DETECTED
   • Models: ✅ Loaded
   • Camera: ✅ On
   • Detection: ✅ Active
   • Capture: ✅ Triggered
   • Flash: ✅ Shown

5. UPLOADING
   • Models: ✅ Loaded
   • Camera: ✅ On
   • Detection: ✅ Active
   • Upload: ✅ In progress
   • Loading: ✅ Shown

6. PROCESSING
   • Models: ✅ Loaded
   • Camera: ✅ On
   • Detection: ✅ Active
   • Backend: ✅ Processing
   • Loading: ✅ Shown

7. RESULT_READY
   • Models: ✅ Loaded
   • Camera: ✅ On
   • Detection: ✅ Active
   • Result: ✅ Displayed
   • Download: ✅ Available
   • Loading: ❌ Hidden

8. ERROR
   • Error message shown
   • Can retry or stop
```

---

## API Communication

```
Frontend → Backend
──────────────────

Request:
POST http://localhost:3000/api/process-image
Content-Type: multipart/form-data

FormData:
  image: [Blob] (JPEG, ~500KB-2MB)

Headers:
  (Optional) Authorization: Bearer TOKEN


Backend → Frontend
──────────────────

Response:
Status: 200 OK
Content-Type: image/jpeg

Body:
  [Binary Image Data]

OR

Error Response:
Status: 400/500
Content-Type: application/json

Body:
  {
    "error": "Error message",
    "message": "Detailed error"
  }
```

---

## Timing Diagram

```
Time    Frontend                Backend
────    ────────                ───────
0ms     User clicks "Start"
        ↓
100ms   Camera access granted
        ↓
200ms   Face detection starts
        ↓
        ... (detecting) ...
        ↓
1500ms  Face detected!
        Flash effect
        ↓
1600ms  Photo captured
        ↓
1700ms  Loading overlay shown
        ↓
1800ms  POST request sent    →  Request received
        ↓                        ↓
2000ms  Waiting...               Processing image
        ↓                        • Resize
2500ms  Waiting...               • Add border
        ↓                        • Add text
3000ms  Waiting...               • Enhance colors
        ↓                        • Compress
3500ms  Response received    ←  Response sent
        ↓
3600ms  Loading hidden
        ↓
3700ms  Result displayed
        ↓
3800ms  Auto-scroll to result
        ↓
4000ms  Download available
```

---

## Error Handling Flow

```
┌─────────────────┐
│  Error Occurs   │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────┐
│  Where did error occur?     │
└────────┬────────────────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌────────┐  ┌────────┐
│Frontend│  │Backend │
└───┬────┘  └───┬────┘
    │           │
    ▼           ▼
┌────────┐  ┌────────┐
│ Catch  │  │ Catch  │
│ Error  │  │ Error  │
└───┬────┘  └───┬────┘
    │           │
    ▼           ▼
┌────────┐  ┌────────┐
│  Log   │  │  Log   │
│Console │  │Console │
└───┬────┘  └───┬────┘
    │           │
    ▼           ▼
┌────────┐  ┌────────┐
│ Show   │  │ Return │
│ Error  │  │ Error  │
│Message │  │Response│
└───┬────┘  └───┬────┘
    │           │
    ▼           ▼
┌────────┐  ┌────────┐
│ Reset  │  │Frontend│
│ State  │  │Handles │
└────────┘  └───┬────┘
                │
                ▼
            ┌────────┐
            │ Show   │
            │ Error  │
            └────────┘
```

---

**This diagram shows the complete flow from camera access to final download!**
