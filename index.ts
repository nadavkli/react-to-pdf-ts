import * as puppeteer from 'puppeteer';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';

type ConvertToPdfOptions = {
    outputPath: string;
    puppeteerOptions?: puppeteer.LaunchOptions;
};

export async function convertToPdf(component: React.ReactElement, options: ConvertToPdfOptions): Promise<void> {
    const browser = await puppeteer.launch(options.puppeteerOptions);
    try {
        const page = await browser.newPage();
        const htmlContent = ReactDOMServer.renderToStaticMarkup(component);
        await page.setContent(htmlContent);
        await page.pdf({path: options.outputPath, format: 'A4'});
    } catch (error) {
        console.error('Error generating PDF:', error);
        throw error;
    } finally {
        await browser.close();
    }
}
