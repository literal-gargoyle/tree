document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);

async function handleFileSelect(event) {
    const files = event.target.files;
    const fileTree = {};
    const asciiTree = document.getElementById('asciiTree');
    const downloadLinks = document.getElementById('downloadLinks');
    asciiTree.textContent = '';
    downloadLinks.innerHTML = '';

    for (const file of files) {
        const pathParts = file.webkitRelativePath.split('/');
        let current = fileTree;
        for (const part of pathParts) {
            if (!current[part]) {
                current[part] = {};
            }
            current = current[part];
        }
        current.file = file;
    }

    async function unpackFiles() {
        const unpackedTree = {};

        for (const path in fileTree) {
            const entry = fileTree[path];
            if (entry.file && (entry.file.name.endsWith('.zip') || entry.file.name.endsWith('.jar') || entry.file.name.endsWith('.exe'))) {
                // Simulate unpacking
                // In a real application, you would use a library to unpack files here
                unpackedTree[path] = {}; // Placeholder for unpacked files
            } else {
                unpackedTree[path] = entry;
            }
        }
        return unpackedTree;
    }

    const unpackedTree = await unpackFiles();

    function buildAsciiTree(obj, indent = '') {
        for (const key in obj) {
            if (key !== 'file') {
                asciiTree.textContent += indent + key + '\n';
                buildAsciiTree(obj[key], indent + '  ');
            } else {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(obj[key]);
                link.download = key;
                link.textContent = key;
                downloadLinks.appendChild(link);
                downloadLinks.appendChild(document.createElement('br'));
            }
        }
    }

    buildAsciiTree(unpackedTree);
}
