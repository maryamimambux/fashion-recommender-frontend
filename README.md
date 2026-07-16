<div align="center">

# 👗 Fashion Visual Search

**An AI-powered visual search engine that finds visually similar fashion items — clothing, bags, shoes, and accessories — from a single uploaded photo.**

[![Live Demo](https://img.shields.io/badge/🛍️_Live_Demo-Visit_App-4B5FD1?style=for-the-badge)](https://fashion-visual-search.vercel.app)
![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=flat-square&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-3.1-000000?style=flat-square&logo=flask&logoColor=white)
![TensorFlow](https://img.shields.io/badge/TensorFlow-2.21-FF6F00?style=flat-square&logo=tensorflow&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-C9A227?style=flat-square)

**[🔗 Try it live → fashion-visual-search.vercel.app](https://fashion-visual-search.vercel.app)**

</div>

---

## 📖 What is this?

Instead of searching for fashion items by keyword, this app lets you search **by image**. Upload a photo of something you like — a bag, a pair of glasses, a jacket — and the app returns the closest visual matches from a catalog of over 44,000 product photos, ranked by similarity.

> Upload a photo → a pretrained CNN converts it into a feature vector → the app finds the nearest neighbors in that feature space → you see the most visually similar items, ranked.

No categories, no tags, no manual labeling — the model compares raw visual style: shape, color, texture, and pattern.

---

## ✨ Features

- 🧠 **Deep feature extraction** using ResNet50 (pretrained on ImageNet), with global max-pooling on top
- 🔍 **Nearest-neighbor similarity search** over 44,000+ product images using scikit-learn
- 🌐 **Full-stack web app** — Flask backend + React/Vite frontend
- ☁️ **Deployed entirely for free** — TensorFlow backend on Hugging Face Spaces, frontend on Vercel
- 📦 **Reproducible setup** — large assets (feature vectors, image dataset) auto-download on first run, so nothing bloats the git repo

---

## 🖥️ Try It Yourself

<div align="center">

**👉 [fashion-visual-search.vercel.app](https://fashion-visual-search.vercel.app) 👈**

</div>

Upload a photo of any fashion item and click **Find similar items** to see the closest matches from the catalog.

---

## 🛠️ How It Works

| Stage | What Happens |
|---|---|
| **1. Dataset** | ~44,400 fashion product photos, with precomputed feature vectors stored as `Images_features.pkl` |
| **2. Feature extraction** | Each image is passed through ResNet50 (ImageNet weights, top layer removed) + `GlobalMaxPool2D`, producing a normalized feature vector |
| **3. Upload handling** | A user-uploaded photo goes through the exact same extraction pipeline at request time |
| **4. Similarity search** | `NearestNeighbors` (scikit-learn, brute-force, Euclidean distance) finds the closest catalog vectors to the uploaded image's vector |
| **5. Results** | The top matches (excluding the image matching itself) are returned with their similarity distance and served back to the frontend |
| **6. Deployment** | Backend containerized with Docker and hosted on Hugging Face Spaces; frontend built with Vite and hosted on Vercel |

---

## ⚙️ Tech Stack

**Backend:** `Python` · `Flask` · `TensorFlow / Keras` · `ResNet50` · `scikit-learn` · `gunicorn` · `Docker`
**Frontend:** `React` · `Vite`
**Hosting:** `Hugging Face Spaces` (backend) · `Vercel` (frontend)

---

## 🚀 Run It Locally

**Backend:**

```bash
git clone https://github.com/maryamimambux/fashion-recommender-backend.git
cd fashion-recommender-backend
pip install -r requirements.txt
python app.py
```

The first run automatically downloads the feature file and image dataset, then starts the server at **http://localhost:7860**.

**Frontend:**

```bash
git clone https://github.com/maryamimambux/fashion-recommender-frontend.git
cd fashion-recommender-frontend
npm install
npm run dev
```

Then open **http://localhost:5173** in your browser. Create a `.env` file with:

```
VITE_API_URL=http://localhost:7860
```

so the frontend knows where to find the local backend.

---

## 📁 Project Structure

```
fashion-recommender/
├── backend/
│   ├── app.py                 # Flask API — feature extraction + nearest-neighbor search
│   ├── download_assets.py     # Downloads Images_features.pkl and images.zip on first run
│   ├── filenames.pkl          # Maps feature vectors to image filenames
│   ├── requirements.txt       # Pinned dependencies
│   └── Dockerfile             # Container definition for deployment
└── frontend/
    ├── src/
    │   └── App.jsx            # Upload UI, results grid, API calls
    ├── index.html
    └── package.json
```

---

<div align="center">

### 👤 About

**Maryam Imam**

[![GitHub](https://img.shields.io/badge/GitHub-maryamimambux-181717?style=flat-square&logo=github)](https://github.com/maryamimambux)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Maryam_Imam-0A66C2?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/maryam-imam-394455342/)
[![Email](https://img.shields.io/badge/Email-maryamimambux%40gmail.com-D14836?style=flat-square&logo=gmail&logoColor=white)](mailto:maryamimambux@gmail.com)

*Built as a hands-on deep learning project — from raw images to a live, deployed visual search engine.*

</div>
