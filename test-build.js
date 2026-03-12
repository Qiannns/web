// 构建测试脚本
console.log('开始测试构建配置...\n');

// 检查关键文件是否存在
const fs = require('fs');
const path = require('path');

const requiredFiles = [
  'package.json',
  'vite.config.ts',
  'tailwind.config.js',
  'src/index.css',
  'src/App.tsx',
  'src/main.tsx'
];

console.log('检查必要文件:');
requiredFiles.forEach(file => {
  const exists = fs.existsSync(path.join(__dirname, file));
  console.log(`  ${exists ? '✓' : '✗'} ${file}`);
});

// 检查 package.json 配置
console.log('\n检查 package.json 配置:');
try {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  const requiredScripts = ['dev', 'build', 'preview'];
  requiredScripts.forEach(script => {
    const hasScript = pkg.scripts && pkg.scripts[script];
    console.log(`  ${hasScript ? '✓' : '✗'} scripts.${script}`);
  });
  
  const requiredDeps = ['react', 'react-dom', 'vite', 'tailwindcss'];
  requiredDeps.forEach(dep => {
    const hasDep = (pkg.dependencies && pkg.dependencies[dep]) || 
                   (pkg.devDependencies && pkg.devDependencies[dep]);
    console.log(`  ${hasDep ? '✓' : '✗'} ${dep}`);
  });
} catch (error) {
  console.log('  ✗ 无法读取 package.json:', error.message);
}

// 检查 index.css 内容
console.log('\n检查 src/index.css:');
try {
  const cssContent = fs.readFileSync('src/index.css', 'utf8');
  
  const checks = [
    { name: '包含 @tailwind base', check: cssContent.includes('@tailwind base') },
    { name: '包含 @tailwind components', check: cssContent.includes('@tailwind components') },
    { name: '包含 @tailwind utilities', check: cssContent.includes('@tailwind utilities') },
    { name: '没有无效的 @apply border-border', check: !cssContent.includes('@apply border-border') },
    { name: 'CSS变量定义完整', check: cssContent.includes('--background:') && cssContent.includes('--foreground:') }
  ];
  
  checks.forEach(check => {
    console.log(`  ${check.check ? '✓' : '✗'} ${check.name}`);
  });
} catch (error) {
  console.log('  ✗ 无法读取 src/index.css:', error.message);
}

// 检查 tailwind.config.js
console.log('\n检查 tailwind.config.js:');
try {
  const tailwindConfig = fs.readFileSync('tailwind.config.js', 'utf8');
  
  const checks = [
    { name: '包含 dark 颜色定义', check: tailwindConfig.includes("dark: {") },
    { name: '包含 border 颜色映射', check: tailwindConfig.includes('border: "hsl(var(--border))"') },
    { name: '包含 content 配置', check: tailwindConfig.includes('./src/') }
  ];
  
  checks.forEach(check => {
    console.log(`  ${check.check ? '✓' : '✗'} ${check.name}`);
  });
} catch (error) {
  console.log('  ✗ 无法读取 tailwind.config.js:', error.message);
}

console.log('\n测试完成！');
console.log('\n下一步：');
console.log('1. 运行: npm install');
console.log('2. 运行: npm run build');
console.log('3. 如果没有错误，说明修复成功');
console.log('4. 提交更改到 Git 并推送到 GitHub');
console.log('5. Vercel 会自动重新部署\n');