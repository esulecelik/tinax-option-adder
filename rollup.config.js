import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/index.js', // Giriş dosyan
  output: [
    {
      file: 'dist/bundle.cjs.js',
      format: 'cjs'
    },
    {
      file: 'dist/bundle.esm.js',
      format: 'es' // ES6 Modül formatı
    },
    {
      file: 'dist/bundle.umd.js',
      format: 'umd',
      name: 'TinaxOptionAdder', // Tarayıcıda window.TinaxOptionAdder olarak görünecek isim
      globals: {
        bootstrap: 'bootstrap' // Eğer bootstrap bağımlılığı varsa
      }
    }
  ],
  plugins: [
    resolve(),  // Node_modules içindeki paketleri çözmek için
    commonjs(), // CommonJS modüllerini ES6'ya çevirmek için
    terser() ,   // Kodu sıkıştırmak (minify) için
    postcss({
      extract: true, // CSS'i dist/bundle.css olarak dışarı çıkarır
      minimize: true
    })
  ]
};