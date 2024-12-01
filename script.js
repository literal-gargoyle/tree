document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);

function handleFileSelect(event) {
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

    buildAsciiTree(fileTree);
}
