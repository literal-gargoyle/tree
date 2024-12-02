# File Tree Viewer

A JavaScript-based web application to display the directory structure of uploaded ZIP files as an ASCII tree. Each file in the tree is linked for easy downloading.

## Features

- Displays the folder and file structure of ZIP files in an ASCII tree format.
- Generates downloadable links directly within the tree.
- Simple, lightweight, and browser-based (no backend required).

## How to Use

1. Go to https://literal-gargoyle.github.io/tree/
2. Upload your folder
3. Done!

## Example Output

For a ZIP file with this structure:
```
folder/
    subfile.txt
file1.txt
file2.txt
```

The output will be:
```
folder/
│   └── subfile.txt
├── file1.txt
└── file2.txt
```

Each file (`subfile.txt`, `file1.txt`, `file2.txt`) will have a clickable link for downloading.

## Supported Formats

- Currently supports **ZIP** files.
- Additional format support (7z, JAR, EXE) can be added in the future.

## Technical Details

- Built using pure JavaScript with the [fflate](https://github.com/101arrowz/fflate) library for handling ZIP decompression.
- No external dependencies beyond the library (included via CDN).

## Limitations

- Only ZIP files are supported at this time.
- May not handle very large ZIP files efficiently due to browser memory limitations.

## Future Improvements

- Add support for other compressed formats like 7z, JAR, and EXE.
- Optimize performance for large files.
- Enhance UI for better user experience.

## License

This project is open-source and licensed under the [MIT License](LICENSE).
```
