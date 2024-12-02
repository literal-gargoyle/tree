const fileInput = document.getElementById('fileInput');
const output = document.getElementById('output');

fileInput.addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  if (file.name.endsWith('.zip')) {
    // Handle ZIP files using fflate
    const { unzipSync, strFromU8 } = await import('https://cdn.jsdelivr.net/npm/fflate/esm/index.js');
    const arrayBuffer = await file.arrayBuffer();
    const files = unzipSync(new Uint8Array(arrayBuffer));

    const tree = buildTree(files);
    output.innerHTML = treeToHtml(tree, files);
  } else {
    output.textContent = 'Unsupported file format. Only ZIP files are currently supported.';
  }
});

// Build ASCII tree
function buildTree(files) {
  const root = {};
  for (const fileName in files) {
    const parts = fileName.split('/');
    let current = root;
    parts.forEach((part, index) => {
      if (!current[part]) {
        current[part] = index === parts.length - 1 ? null : {};
      }
      current = current[part];
    });
  }
  return root;
}

// Convert tree to ASCII with links
function treeToHtml(tree, files, path = '', prefix = '') {
  let result = '';
  const entries = Object.entries(tree);

  entries.forEach(([name, subtree], index) => {
    const isLast = index === entries.length - 1;
    const newPrefix = prefix + (isLast ? '   ' : '│  ');
    const displayName = subtree === null 
      ? `<a href="${URL.createObjectURL(new Blob([files[path + name]]))}" class="file-link" download="${name}">${name}</a>`
      : name;
    result += `${prefix}${isLast ? '└── ' : '├── '}${displayName}\n`;
    if (subtree) {
      result += treeToHtml(subtree, files, path + name + '/', newPrefix);
    }
  });

  return result;
}
