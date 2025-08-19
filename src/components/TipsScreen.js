import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TipsScreen.css';

const TipsScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('home');
  const navigate = useNavigate();

  const categories = [
    { id: 'home', name: 'Home & Garden', icon: '🏠' },
    { id: 'commercial', name: 'Restaurant & Commercial', icon: '🏢' },
    { id: 'pets', name: 'Pets & Livestock', icon: '🐕' }
  ];

  const content = {
    home: {
      articles: [
        {
          title: "10 Natural Ways to Keep Ants Away",
          summary: "Discover eco-friendly methods to prevent ant infestations",
          readTime: "5 min read",
          image: "🐜"
        },
        {
          title: "Seasonal Pest Prevention Calendar",
          summary: "Month-by-month guide to pest prevention",
          readTime: "8 min read",
          image: "📅"
        },
        {
          title: "DIY Pest Traps That Actually Work",
          summary: "Simple homemade solutions for common pests",
          readTime: "6 min read",
          image: "🪤"
        }
      ],
      videos: [
        {
          title: "How to Seal Entry Points",
          duration: "3:45",
          thumbnail: "🎥"
        },
        {
          title: "Garden Pest Prevention",
          duration: "5:20",
          thumbnail: "🎥"
        }
      ],
      checklist: [
        "Seal cracks and crevices around windows and doors",
        "Keep kitchen surfaces clean and dry",
        "Store food in airtight containers",
        "Fix leaky pipes and eliminate standing water",
        "Trim vegetation away from house exterior",
        "Regular vacuum cleaning, especially corners"
      ]
    },
    commercial: {
      articles: [
        {
          title: "Restaurant Pest Control Best Practices",
          summary: "Essential guidelines for food service establishments",
          readTime: "10 min read",
          image: "🍽️"
        },
        {
          title: "Warehouse Rodent Prevention",
          summary: "Protecting inventory from rodent damage",
          readTime: "7 min read",
          image: "📦"
        }
      ],
      videos: [
        {
          title: "Commercial Kitchen Sanitation",
          duration: "8:15",
          thumbnail: "🎥"
        }
      ],
      checklist: [
        "Implement regular cleaning schedules",
        "Train staff on pest identification",
        "Maintain proper waste management",
        "Schedule professional inspections",
        "Document all pest control activities"
      ]
    },
    pets: {
      articles: [
        {
          title: "Pet-Safe Pest Control Methods",
          summary: "Protecting your pets while controlling pests",
          readTime: "6 min read",
          image: "🐾"
        },
        {
          title: "Flea Prevention for Dogs and Cats",
          summary: "Complete guide to flea control",
          readTime: "8 min read",
          image: "🐕"
        }
      ],
      videos: [
        {
          title: "Livestock Pest Management",
          duration: "12:30",
          thumbnail: "🎥"
        }
      ],
      checklist: [
        "Use pet-safe pest control products only",
        "Regular grooming and flea checks",
        "Keep pet areas clean and dry",
        "Consult veterinarian for pest issues",
        "Maintain proper ventilation in animal areas"
      ]
    }
  };

  const handleShare = (item) => {
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: item.summary,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      alert('Share functionality would open social media options');
    }
  };

  return (
    <div className="tips-screen">
      <div className="header">
        <button className="back-btn" onClick={() => navigate('/home')}>←</button>
        <h2>Tips & Prevention</h2>
      </div>

      <div className="category-tabs">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-tab ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <span className="category-icon">{category.icon}</span>
            <span className="category-name">{category.name}</span>
          </button>
        ))}
      </div>

      <div className="content-sections">
        <div className="articles-section">
          <h3>📚 Articles</h3>
          {content[selectedCategory].articles.map((article, index) => (
            <div key={index} className="article-card">
              <div className="article-image">{article.image}</div>
              <div className="article-content">
                <h4>{article.title}</h4>
                <p>{article.summary}</p>
                <div className="article-meta">
                  <span className="read-time">{article.readTime}</span>
                  <button 
                    className="share-btn"
                    onClick={() => handleShare(article)}
                  >
                    📤 Share
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="videos-section">
          <h3>🎥 Videos</h3>
          {content[selectedCategory].videos.map((video, index) => (
            <div key={index} className="video-card">
              <div className="video-thumbnail">{video.thumbnail}</div>
              <div className="video-content">
                <h4>{video.title}</h4>
                <span className="video-duration">{video.duration}</span>
              </div>
              <button className="play-btn">▶️</button>
            </div>
          ))}
        </div>

        <div className="checklist-section">
          <h3>✅ Prevention Checklist</h3>
          <div className="checklist">
            {content[selectedCategory].checklist.map((item, index) => (
              <label key={index} className="checklist-item">
                <input type="checkbox" />
                <span className="checkmark"></span>
                <span className="checklist-text">{item}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipsScreen;