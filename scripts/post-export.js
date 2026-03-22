const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'out');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Fix src="/xxx" and src:"/xxx" patterns
  if (content.includes('src="/') || content.includes('src:"/')) {
    content = content.replace(/src="\/([^"]+)"/g, 'src="./$1"');
    content = content.replace(/src:"\/([^"]+)"/g, 'src:"./$1"');
    modified = true;
  }

  // Fix href links
  if (content.includes('href="/')) {
    content = content.replace(/href="\/"/g, 'href="./"');
    content = content.replace(/href="\/([^"]+)"/g, 'href="./$1"');
    modified = true;
  }

  // Fix srcset
  if (content.includes('srcset="/')) {
    content = content.replace(/srcset="\/([^"]+)"/g, 'srcset="./$1"');
    modified = true;
  }

  // For HTML: fix page links ./pagename -> ./pagename.html
  if (filePath.endsWith('.html')) {
    content = content.replace(/href="\.\/([^".\/]+)"/g, (_, p1) => {
      if (p1.includes('.')) return `href="./${p1}"`;
      const htmlPath = path.join(outDir, p1 + '.html');
      if (fs.existsSync(htmlPath)) {
        return `href="./${p1}.html"`;
      }
      return `href="./${p1}"`;
    });
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`Fixed: ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (file.endsWith('.html') || file.endsWith('.js')) {
      processFile(filePath);
    }
  }
}

if (fs.existsSync(outDir)) {
  walkDir(outDir);
  console.log('All files fixed for local file access.');
} else {
  console.error('out directory not found. Run `npm run export` first.');
}