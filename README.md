
# react-to-pdf

This package provides a convenient and efficient way to convert React components into PDF files, leveraging the capabilities of Puppeteer in a TypeScript environment. It is designed with a focus on ease of use, flexibility, and robustness, making it an ideal solution for projects requiring PDF generation from React components.

## Features

- **React to PDF Conversion**: Seamlessly convert React components into high-quality PDF files.
- **Puppeteer Integration**: Utilizes Puppeteer for reliable and accurate rendering.
- **TypeScript Support**: Full TypeScript support ensures type safety and developer-friendly usage.
- **Customizable Options**: Offers a range of customization options for Puppeteer, giving you control over the PDF generation process.

## Prerequisites

- Puppeteer: Ensure that Puppeteer is installed and properly configured in your environment, as it is crucial for the functioning of this package.

## Installation

Install the package using npm:

```bash
npm install react-to-pdf
```

## Usage

Below is a simple example to get you started with `react-to-pdf`:

```typescript
import { convertToPdf } from 'react-to-pdf';
import React from 'react';

const MyComponent = <div>Hello, welcome to PDF world!</div>;

convertToPdf(MyComponent, {outputPath: './my-component.pdf'})
    .then(() => console.log('PDF has been created successfully.'))
    .catch(error => console.error('Error encountered during PDF creation:', error));
```

## API

### `convertToPdf(component: React.ReactElement, options: ConvertToPdfOptions): Promise<void>`

- `component`: React component you wish to convert into a PDF.
- `options`: Configuration options for PDF generation.
  - `outputPath`: File path to save the generated PDF.
  - `puppeteerOptions` (optional): Custom options for Puppeteer.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for full details.
