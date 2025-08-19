import React, { useState } from 'react';
import { pestAPI } from '../services/api';

interface PestIdentifierProps {}

const PestIdentifier: React.FC<PestIdentifierProps> = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleIdentify = async () => {
    if (!selectedFile) return;

    setLoading(true);
    try {
      const response = await pestAPI.identifyPest(selectedFile);
      setResult(response.data);
    } catch (error) {
      console.error('Identification failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pest-identifier">
      <h2>AI Pest Identification</h2>
      
      <div className="upload-section">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="file-input"
        />
        
        {selectedFile && (
          <div className="preview">
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Preview"
              style={{ maxWidth: '300px', maxHeight: '300px' }}
            />
          </div>
        )}
        
        <button
          onClick={handleIdentify}
          disabled={!selectedFile || loading}
          className="identify-btn"
        >
          {loading ? 'Identifying...' : 'Identify Pest'}
        </button>
      </div>

      {result && (
        <div className="results">
          <h3>Identification Results</h3>
          <div className="main-result">
            <h4>{result.identified_pest?.name || 'Unknown Pest'}</h4>
            <p>Confidence: {(result.confidence_score * 100).toFixed(1)}%</p>
          </div>
          
          {result.alternative_matches?.length > 0 && (
            <div className="alternatives">
              <h5>Alternative Matches:</h5>
              {result.alternative_matches.map((match: any, index: number) => (
                <div key={index} className="alternative">
                  <span>{match.pest_name}</span>
                  <span>{(match.confidence * 100).toFixed(1)}%</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PestIdentifier;