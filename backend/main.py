import io
import numpy as np
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import tensorflow as tf

# Load model
MODEL_PATH = "brain_tumor_model.h5"
model = tf.keras.models.load_model(MODEL_PATH)

IMG_SIZE = (150, 150)

app = FastAPI()

# Allow CORS for your Next.js frontend during dev
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def preprocess_image(image_bytes):
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    image = image.resize(IMG_SIZE)
    img_array = np.array(image) / 255.0
    img_array = np.expand_dims(img_array, axis=0)  # (1, H, W, 3)
    return img_array

@app.get("/")
def read_root():
    return {"message": "Brain tumor detection API is running"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image_bytes = await file.read()
    img = preprocess_image(image_bytes)
    
    pred = model.predict(img)[0][0]  # single output neuron
    probability = float(pred)
    
    # If using sigmoid, value in [0,1]. Choose threshold 0.5
    label = "Tumor" if probability >= 0.5 else "No Tumor"
    
    # For nicer confidence: distance from 0.5 scaled to %
    confidence = probability if label == "Tumor" else (1 - probability)

    return {
        "label": label,
        "probability": probability,
        "confidence": float(confidence)
    }
