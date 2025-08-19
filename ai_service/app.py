from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os
from PIL import Image
import numpy as np
import tensorflow as tf
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input, decode_predictions
import json

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Load pre-trained model (placeholder - you'd train your own pest identification model)
model = MobileNetV2(weights='imagenet')

# Pest database mapping (simplified)
PEST_DATABASE = {
    'ant': {'id': 1, 'confidence_threshold': 0.7},
    'cockroach': {'id': 2, 'confidence_threshold': 0.6},
    'termite': {'id': 3, 'confidence_threshold': 0.8},
    'spider': {'id': 4, 'confidence_threshold': 0.7},
    'mouse': {'id': 5, 'confidence_threshold': 0.8},
}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'png', 'jpg', 'jpeg', 'gif'}

def preprocess_image(image_path):
    img = Image.open(image_path)
    img = img.resize((224, 224))
    img_array = np.array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = preprocess_input(img_array)
    return img_array

def identify_pest_from_predictions(predictions):
    # Simplified pest identification logic
    # In a real implementation, you'd have a trained model specifically for pests
    decoded = decode_predictions(predictions, top=5)[0]
    
    pest_matches = []
    for pred in decoded:
        class_name = pred[1].lower()
        confidence = float(pred[2])
        
        # Check if any pest keywords match
        for pest_name, pest_info in PEST_DATABASE.items():
            if pest_name in class_name or class_name in pest_name:
                if confidence >= pest_info['confidence_threshold']:
                    pest_matches.append({
                        'pest_id': pest_info['id'],
                        'pest_name': pest_name,
                        'confidence': confidence
                    })
    
    return pest_matches

@app.route('/identify', methods=['POST'])
def identify_pest():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400
    
    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        try:
            # Preprocess and predict
            img_array = preprocess_image(filepath)
            predictions = model.predict(img_array)
            
            # Identify pest from predictions
            pest_matches = identify_pest_from_predictions(predictions)
            
            if pest_matches:
                best_match = max(pest_matches, key=lambda x: x['confidence'])
                alternatives = [match for match in pest_matches if match != best_match][:3]
                
                result = {
                    'pest_id': best_match['pest_id'],
                    'pest_name': best_match['pest_name'],
                    'confidence': best_match['confidence'],
                    'alternatives': alternatives
                }
            else:
                result = {
                    'pest_id': None,
                    'pest_name': 'Unknown',
                    'confidence': 0.0,
                    'alternatives': []
                }
            
            # Clean up uploaded file
            os.remove(filepath)
            
            return jsonify(result)
            
        except Exception as e:
            return jsonify({'error': f'Processing error: {str(e)}'}), 500
    
    return jsonify({'error': 'Invalid file type'}), 400

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    app.run(debug=True, port=5000)