module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/ewok-o-cachorro/'
    : '/',
  outputDir: 'docs'  // GitHub Pages will serve from the 'docs' folder
}