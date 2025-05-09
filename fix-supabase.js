/**
 * Script de correction spécifique pour Supabase
 * 
 * Ce script s'assure que les dépendances Supabase sont correctement
 * installées et configurées pour Netlify.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 Vérification de la dépendance Supabase...');

// Chemin vers le répertoire node_modules
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const supabasePath = path.resolve(nodeModulesPath, '@supabase/supabase-js');

// Vérifier si le package Supabase est installé
if (!fs.existsSync(supabasePath)) {
  console.log('❌ @supabase/supabase-js est manquant');
  console.log('🔄 Installation forcée de Supabase...');
  
  try {
    execSync('npm install @supabase/supabase-js@latest --force', { stdio: 'inherit' });
    console.log('✅ @supabase/supabase-js installé avec succès');
  } catch (error) {
    console.error('❌ Erreur lors de l\'installation de Supabase:', error);
    process.exit(1);
  }
} else {
  console.log('✅ @supabase/supabase-js est présent');
  
  // Vérifier la version installée
  try {
    const packageJsonPath = path.resolve(supabasePath, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
      console.log(`Version installée: ${packageJson.version}`);
      
      // Si la version est obsolète, essayer de la mettre à jour
      if (packageJson.version.startsWith('1.')) {
        console.log('🔄 Mise à jour de Supabase vers la dernière version...');
        execSync('npm install @supabase/supabase-js@latest --force', { stdio: 'inherit' });
      }
    }
  } catch (error) {
    console.error('❌ Erreur lors de la vérification de la version de Supabase:', error);
  }
}

// Vérifier les sous-dépendances requises par Supabase
const requiredDeps = [
  { name: 'cross-fetch', scope: null }, // Pas dans le scope @supabase
  { name: 'postgrest-js', scope: '@supabase' },
  { name: 'realtime-js', scope: '@supabase' },
  { name: 'storage-js', scope: '@supabase' },
  { name: 'functions-js', scope: '@supabase' },
  { name: 'gotrue-js', scope: '@supabase' }
];

console.log('\n🔍 Vérification des sous-dépendances de Supabase...');
const missingDeps = [];

for (const dep of requiredDeps) {
  const depPath = dep.scope 
    ? path.resolve(nodeModulesPath, dep.scope, dep.name)
    : path.resolve(nodeModulesPath, dep.name);
    
  const depName = dep.scope ? `${dep.scope}/${dep.name}` : dep.name;
  
  if (!fs.existsSync(depPath)) {
    console.log(`❌ ${depName} est manquant`);
    missingDeps.push(depName);
  } else {
    console.log(`✅ ${depName} est présent`);
  }
}

// Installer les dépendances manquantes
if (missingDeps.length > 0) {
  console.log('\n🔄 Installation des sous-dépendances manquantes...');
  try {
    execSync(`npm install ${missingDeps.join(' ')} --force`, { stdio: 'inherit' });
    console.log('✅ Sous-dépendances installées avec succès');
  } catch (error) {
    console.error('❌ Erreur lors de l\'installation des sous-dépendances:', error);
  }
}

// Vérifier si des shims sont nécessaires
console.log('\n🔍 Vérification des shims pour Supabase...');

const libDir = path.resolve(__dirname, 'src', 'lib');
const polyfillPath = path.resolve(libDir, 'supabase-polyfill.js');

// Créer un polyfill si nécessaire
if (!fs.existsSync(polyfillPath)) {
  console.log('📝 Création d\'un polyfill pour Supabase...');
  
  const polyfillContent = `/**
 * Polyfill pour Supabase dans les environnements Netlify
 * 
 * Ce fichier fournit des polyfills pour les fonctionnalités requises par Supabase
 * qui peuvent être manquantes dans l'environnement Netlify.
 */

// Polyfill pour global
if (typeof global === 'undefined') {
  window.global = window;
}

// Polyfill pour Buffer si nécessaire
if (typeof window !== 'undefined' && typeof window.Buffer === 'undefined') {
  window.Buffer = require('buffer/').Buffer;
}

// Exporter des objets nécessaires
export const supabasePolyfill = {
  isPolyfilled: true,
  environment: typeof process !== 'undefined' ? process.env.NODE_ENV : 'unknown'
};

// Exporter le polyfill par défaut
export default supabasePolyfill;
`;
  
  if (!fs.existsSync(libDir)) {
    fs.mkdirSync(libDir, { recursive: true });
  }
  
  fs.writeFileSync(polyfillPath, polyfillContent);
  console.log('✅ Polyfill créé avec succès');
  
  // Mettre à jour les fichiers qui importent Supabase
  const supabaseImporters = [
    path.resolve(__dirname, 'src', 'lib', 'supabase.ts'),
    path.resolve(__dirname, 'src', 'lib', 'supabaseClient.ts')
  ];
  
  for (const filePath of supabaseImporters) {
    if (fs.existsSync(filePath)) {
      console.log(`📝 Mise à jour de ${filePath}...`);
      
      let content = fs.readFileSync(filePath, 'utf-8');
      
      // 1. Ajouter le polyfill s'il n'est pas déjà inclus
      if (!content.includes('supabase-polyfill')) {
        content = `import './supabase-polyfill';\n${content}`;
        console.log(`✅ Polyfill ajouté à ${filePath}`);
      }
      
      // 2. Corriger l'importation de @supabase/supabase-js
      if (content.includes('from "@supabase/supabase-js"') || content.includes("from '@supabase/supabase-js'")) {
        // Remplacer l'importation par une importation directe du chemin absolu
        content = content.replace(
          /import\s+\{\s*createClient\s*\}\s+from\s+['"]@supabase\/supabase-js['"];?/,
          `// Import direct pour éviter les problèmes de résolution Netlify\nimport { createClient } from '../../node_modules/@supabase/supabase-js/dist/index.js';`
        );
        console.log(`✅ Import de Supabase corrigé dans ${filePath}`);
      }
      
      // Écrire les modifications
      fs.writeFileSync(filePath, content);
      console.log(`✅ ${filePath} mis à jour avec succès`);
    }
  }
}

console.log('\n✨ Correction Supabase terminée!');
