<template>
  <div class="detector-container">
    <h2 class="detector-title">{{ msg }}</h2>
    
    <div class="image-container">
      <img class="image" ref="img" :src="require('../assets/images/' + getImgIndex + '.jpg')" />
      <div v-if="isLoading" class="loading-overlay">
        <div class="spinner"></div>
        <p>{{ language === 'es' ? 'Analizando imagen...' : 'Analyzing image...' }}</p>
      </div>
    </div>
    
    <div class="controls">
      <button class="button" @click="next()" :disabled="disable">
        {{ image == numImages ? (language === 'es' ? 'Finalizar' : 'Finish') : (language === 'es' ? 'Siguiente' : 'Next') }}
      </button>
      <div class="image-counter">
        {{ language === 'es' ? 'Imagen' : 'Image' }} {{ image }} {{ language === 'es' ? 'de' : 'of' }} {{ numImages }}
      </div>
    </div>
    
    <div class="results-container" v-if="predictions.length">
      <h3>{{ language === 'es' ? 'Resultados:' : 'Results:' }}</h3>
      <div class="prediction-bars">
        <div v-for="pred in predictions" :key="pred.index" class="prediction-item">
          <div class="prediction-label">{{ pred.label }}</div>
          <div class="prediction-bar-container">
            <div class="prediction-bar" :style="{width: pred.probability + '%', backgroundColor: getBarColor(pred.probability)}"></div>
            <span class="prediction-value">{{ pred.probability.toFixed(0) + '%' }}</span>
          </div>
        </div>
      </div>
      
      <div class="verdict" v-if="predictions.length">
        <h3 v-if="isDarkSide" class="dark-side">
          {{ language === 'es' ? '¡Este cachorro parece haberse unido al lado oscuro!' : 'This puppy appears to have joined the dark side!' }}
        </h3>
        <h3 v-else class="light-side">
          {{ language === 'es' ? 'Este cachorro parece estar a salvo del lado oscuro.' : 'This puppy seems to be safe from the dark side.' }}
        </h3>
      </div>
    </div>
    
    <div v-if="!predictions.length && !isLoading" class="no-results">
      {{ language === 'es' ? 'Esperando análisis...' : 'Waiting for analysis...' }}
    </div>
  </div>
</template>

<script>
import * as cvstfjs from "customvision-tfjs";
import labels from "raw-loader!../../public/models/labels.txt";

export default {
  name: "DetectImage",
  props: {
    msg: String,
    language: {
      type: String,
      default: 'es'
    }
  },
  data() {
    return {
      labels: labels,
      model: null,
      predictions: [],
      image: 0,
      numImages: 21,
      isLoading: false
    };
  },
  computed: {
    getImgIndex() {
      return this.image.toString();
    },
    disable() {
      if (this.image == this.numImages) {
        return true;
      } else return false;
    },
    isDarkSide() {
      // Check if the top prediction is "Ewok" - meaning the puppy has joined the dark side
      // We need to find the Ewok label and check if it has the highest probability
      const sortedPredictions = [...this.predictions].sort((a, b) => b.probability - a.probability);
      if (sortedPredictions.length > 0) {
        // Assuming the Ewok label is the one containing "Ewok" or similar
        const topPrediction = sortedPredictions[0];
        return topPrediction.label.toLowerCase().includes("ewok");
      }
      return false;
    }
  },
  async mounted() {
    this.image++;
    this.isLoading = true;
    
    try {
      //load up a new model
      this.model = new cvstfjs.ClassificationModel();
      await this.model.loadModelAsync("models/model.json");
      //parse labels
      this.labels = labels.split("\n").map(e => {
        return e.trim();
      });
      //run prediction
      await this.predict();
    } catch (error) {
      console.error("Error loading model or making prediction:", error);
    } finally {
      this.isLoading = false;
    }
  },
  methods: {
    async predict() {
      this.isLoading = true;
      
      try {
        //execute inference
        let prediction = await this.model.executeAsync(this.$refs.img);
        let label = prediction[0];
        //build up a predictions object by parsing details to labels and probability
        this.predictions = label.map((p, i) => {
          return { index: i, label: this.labels[i], probability: p * 100 };
        });
        
        // Sort predictions by probability (highest first)
        this.predictions.sort((a, b) => b.probability - a.probability);
      } catch (error) {
        console.error("Error during prediction:", error);
      } finally {
        this.isLoading = false;
      }
    },

    next() {
      this.image++;
      this.predictions = [];
      this.isLoading = true;
      setTimeout(async () => {
        await this.predict();
      }, 500);
    },
    
    getBarColor(probability) {
      // Return different colors based on probability
      if (probability > 70) return "#e74c3c"; // Red for high probability
      if (probability > 40) return "#f39c12"; // Orange for medium
      return "#2ecc71"; // Green for low
    }
  }
};
</script>

<style scoped>
.detector-container {
  background-color: var(--card-bg-color);
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 25px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
  transition: background-color 0.3s ease;
}

.detector-title {
  font-size: 1.8em;
  color: var(--text-color);
  margin-bottom: 25px;
  transition: color 0.3s ease;
}

.image-container {
  position: relative;
  margin-bottom: 20px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  min-height: 400px;
  max-height: 600px;
}

.image {
  max-height: 600px;
  max-width: 100%;
  display: block;
  object-fit: contain;
  width: auto;
  height: auto;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
}

.spinner {
  border: 5px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 5px solid white;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
  flex-wrap: wrap;
}

.button {
  width: 200px;
  height: 50px;
  border-radius: 8px;
  background-color: var(--button-bg-color);
  border: none;
  color: white;
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button:hover:not(:disabled) {
  background-color: var(--button-hover-color);
}

.button:disabled {
  background-color: var(--disabled-bg-color);
  color: var(--disabled-text-color);
  cursor: not-allowed;
}

.image-counter {
  font-size: 16px;
  color: var(--muted-color);
  transition: color 0.3s ease;
}

.results-container {
  margin-top: 30px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.prediction-bars {
  margin-top: 15px;
}

.prediction-item {
  margin-bottom: 10px;
}

.prediction-label {
  font-weight: bold;
  margin-bottom: 5px;
  text-align: left;
  color: var(--text-color);
  transition: color 0.3s ease;
}

.prediction-bar-container {
  height: 25px;
  background-color: var(--secondary-bg-color);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  transition: background-color 0.3s ease;
}

.prediction-bar {
  height: 100%;
  transition: width 0.5s ease;
}

.prediction-value {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-color);
  font-weight: bold;
  transition: color 0.3s ease;
}

.verdict {
  margin-top: 25px;
  padding: 15px;
  border-radius: 8px;
}

.dark-side {
  background-color: var(--dark-side-bg);
  color: var(--dark-side-color);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.light-side {
  background-color: var(--light-side-bg);
  color: var(--light-side-color);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.no-results {
  margin: 20px 0;
  font-style: italic;
  color: var(--muted-color);
  transition: color 0.3s ease;
}

h3 {
  margin: 20px 0 10px;
  font-size: 1.4em;
  color: var(--text-color);
  transition: color 0.3s ease;
}

/* Responsive layout */
@media (min-width: 768px) {
  .results-container {
    grid-template-columns: 1fr 1fr;
  }
  
  .verdict {
    grid-column: span 2;
  }
}

@media (max-width: 600px) {
  .controls {
    flex-direction: column;
    align-items: center;
  }
  
  .image-counter {
    margin-top: 10px;
  }
  
  .button {
    width: 80%;
  }
}
</style>