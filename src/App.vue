<template>
  <div id="app" :class="{ 'dark-mode': isDarkTheme }">
    <header class="app-header">
      <div class="header-content">
        <h1 class="site-title">Ewok-o-Cachorro</h1>
        <p class="site-description">
          {{ language === 'es' ? 'Descubre si tu cachorro se ha unido al lado oscuro' : 'Find out if your puppy has joined the dark side' }}
        </p>
        <div class="header-controls">
          <button @click="toggleLanguage" class="control-button lang-button">
            {{ language === 'es' ? 'Translate to English' : 'Traducir al Español' }}
          </button>
          <button @click="toggleTheme" class="control-button theme-button">
            <span v-if="isDarkTheme">🌞 {{ language === 'es' ? 'Modo Claro' : 'Light Mode' }}</span>
            <span v-else>🌙 {{ language === 'es' ? 'Modo Oscuro' : 'Dark Mode' }}</span>
          </button>
        </div>
      </div>
    </header>
    
    <main class="app-content">
      <div class="content-container">
        <DetectImage :msg="language === 'es' ? '¿Tu cachorro se ha unido al lado oscuro?' : 'Has your puppy joined the dark side?'" :language="language"/>
        <InfoSection :language="language" />
      </div>
    </main>
    
    <footer class="app-footer">
      <div class="footer-content">
        <p>&copy; 2023 Ewok-o-Cachorro - 
          {{ language === 'es' ? 'Un detector de cachorros del lado oscuro' : 'A dark side puppy detector' }}
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import DetectImage from './components/DetectImage.vue'
import InfoSection from './components/InfoSection.vue'

export default {
  name: 'App',
  components: {
    DetectImage,
    InfoSection
  },
  data() {
    return {
      language: 'es', // Default language is Spanish
      isDarkTheme: false // Default theme is light
    }
  },
  created() {
    // Check if user previously set a theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isDarkTheme = savedTheme === 'dark';
    } else {
      // Check user's system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.isDarkTheme = prefersDark;
    }
  },
  methods: {
    toggleLanguage() {
      this.language = this.language === 'es' ? 'en' : 'es';
    },
    toggleTheme() {
      this.isDarkTheme = !this.isDarkTheme;
      localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
    }
  }
}
</script>

<style>
:root {
  /* Light theme variables */
  --bg-color: #f5f5f5;
  --card-bg-color: #ffffff;
  --text-color: #2c3e50;
  --header-bg-color: #2c3e50;
  --header-text-color: #ffffff;
  --secondary-bg-color: #f8f9fa;
  --border-color: #ecf0f1;
  --footer-bg-color: #2c3e50;
  --footer-text-color: #ffffff;
  --button-bg-color: #3498db;
  --button-hover-color: #2980b9;
  --dark-side-bg: rgba(231, 76, 60, 0.2);
  --dark-side-color: #c0392b;
  --light-side-bg: rgba(46, 204, 113, 0.2);
  --light-side-color: #27ae60;
  --muted-color: #7f8c8d;
  --accent-color: #3498db;
  --disabled-bg-color: #cccccc;
  --disabled-text-color: #666666;
}

.dark-mode {
  /* Dark theme variables */
  --bg-color: #121212;
  --card-bg-color: #1e1e1e;
  --text-color: #e0e0e0;
  --header-bg-color: #0f0f0f;
  --header-text-color: #ffffff;
  --secondary-bg-color: #2d2d2d;
  --border-color: #3d3d3d;
  --footer-bg-color: #0f0f0f;
  --footer-text-color: #ffffff;
  --button-bg-color: #3498db;
  --button-hover-color: #2980b9;
  --dark-side-bg: rgba(231, 76, 60, 0.3);
  --dark-side-color: #e74c3c;
  --light-side-bg: rgba(46, 204, 113, 0.3);
  --light-side-color: #2ecc71;
  --muted-color: #a0a0a0;
  --accent-color: #3498db;
  --disabled-bg-color: #4d4d4d;
  --disabled-text-color: #8d8d8d;
}

body {
  margin: 0;
  padding: 0;
  background-color: var(--bg-color);
  min-height: 100vh;
  transition: background-color 0.3s ease;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text-color);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  transition: color 0.3s ease;
  width: 100%;
}

.app-header {
  background-color: var(--header-bg-color);
  color: var(--header-text-color);
  padding: 20px 0;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
  width: 100%;
}

.header-content {
  position: relative;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  max-width: 1400px;
  margin: 0 auto;
}

.header-controls {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 15px;
}

.control-button {
  background-color: var(--button-bg-color);
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
  white-space: nowrap;
}

.control-button:hover {
  background-color: var(--button-hover-color);
}

.site-title {
  margin: 0;
  font-size: 2.5em;
  font-weight: bold;
}

.site-description {
  margin: 10px 0 0;
  font-size: 1.1em;
  opacity: 0.9;
}

.app-content {
  flex: 1;
  width: 100%;
  padding: 20px 0;
  box-sizing: border-box;
  background-color: var(--bg-color);
}

.content-container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
}

.app-footer {
  background-color: var(--footer-bg-color);
  color: var(--footer-text-color);
  text-align: center;
  padding: 15px 0;
  width: 100%;
  transition: background-color 0.3s ease;
}

.footer-content {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
}

/* Responsive styles */
@media (min-width: 600px) {
  .header-controls {
    position: absolute;
    top: 0;
    right: 20px;
    flex-direction: row;
    margin-top: 0;
  }
}

@media (max-width: 600px) {
  .site-title {
    font-size: 1.8em;
  }
  
  .site-description {
    font-size: 1em;
  }
}
</style>
