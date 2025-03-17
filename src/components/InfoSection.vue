<template>
  <div class="info-section">
    <h2>{{ language === 'es' ? 'Acerca de este proyecto' : 'About this project' }}</h2>
    <div class="info-content">
      <p>
        {{ language === 'es' 
          ? 'Ewok-o-Cachorro es un proyecto que utiliza inteligencia artificial para analizar si tu cachorro tiene características similares a un Ewok o si se ha "unido al lado oscuro".' 
          : 'Ewok-o-Cachorro is a project that uses artificial intelligence to analyze whether your puppy has characteristics similar to an Ewok or if it has "joined the dark side".'
        }}
      </p>
      
      <div class="info-block">
        <h3>{{ language === 'es' ? '¿Cómo funciona?' : 'How does it work?' }}</h3>
        <p>
          {{ language === 'es' 
            ? 'Utilizamos un modelo de machine learning entrenado para identificar características específicas en imágenes de cachorros. El modelo analiza la imagen y proporciona una puntuación de probabilidad para diferentes categorías.' 
            : 'We use a machine learning model trained to identify specific characteristics in puppy images. The model analyzes the image and provides a probability score for different categories.'
          }}
        </p>
      </div>
      
      <div class="info-block">
        <h3>{{ language === 'es' ? 'Instrucciones' : 'Instructions' }}</h3>
        <ol>
          <li>
            {{ language === 'es' 
              ? 'Observa la imagen del cachorro que se muestra' 
              : 'Look at the puppy image displayed'
            }}
          </li>
          <li>
            {{ language === 'es' 
              ? 'Revisa las predicciones del modelo' 
              : 'Review the model predictions'
            }}
          </li>
          <li>
            {{ language === 'es' 
              ? 'Haz clic en "Siguiente" para analizar la siguiente imagen' 
              : 'Click "Next" to analyze the next image'
            }}
          </li>
        </ol>
      </div>
    </div>
    
    <div class="star-wars-reference">
      <p>
        {{ language === 'es' 
          ? '"Que la fuerza te acompañe (y a tu cachorro también)"' 
          : '"May the force be with you (and your puppy too)"'
        }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoSection",
  props: {
    language: {
      type: String,
      default: 'es'
    }
  }
}
</script>

<style scoped>
.info-section {
  background-color: var(--card-bg-color);
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 25px;
  margin: 30px auto;
  width: 100%;
  box-sizing: border-box;
  transition: background-color 0.3s ease;
}

h2 {
  color: var(--text-color);
  border-bottom: 2px solid var(--border-color);
  padding-bottom: 15px;
  margin-bottom: 20px;
  transition: color 0.3s ease, border-color 0.3s ease;
}

.info-content {
  font-size: 16px;
  line-height: 1.6;
  color: var(--text-color);
  transition: color 0.3s ease;
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.info-block {
  margin: 10px 0;
  padding: 15px;
  background-color: var(--secondary-bg-color);
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

h3 {
  color: var(--accent-color);
  margin-bottom: 10px;
  font-size: 1.3em;
  transition: color 0.3s ease;
}

ol {
  padding-left: 20px;
}

li {
  margin-bottom: 8px;
  text-align: left;
}

.star-wars-reference {
  margin-top: 30px;
  font-style: italic;
  color: var(--muted-color);
  font-size: 18px;
  transition: color 0.3s ease;
  text-align: center;
  padding: 10px;
  border-top: 1px solid var(--border-color);
}

/* Responsive layout */
@media (min-width: 768px) {
  .info-content {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .info-content > p {
    grid-column: span 2;
  }
}

@media (max-width: 600px) {
  .info-section {
    padding: 20px 15px;
  }
  
  h2 {
    font-size: 1.5em;
  }
  
  h3 {
    font-size: 1.2em;
  }
  
  .star-wars-reference {
    font-size: 16px;
  }
}
</style>