import {convertToPdf, ConvertToPdfOptions} from './index';
import * as ReactDOMServer from 'react-dom/server';
import React from 'react';
import puppeteer from 'puppeteer';

jest.mock('puppeteer', () => ({
    launch: jest.fn().mockResolvedValue({
        newPage: jest.fn().mockResolvedValue({
            setContent: jest.fn().mockResolvedValue(undefined),
            pdf: jest.fn().mockResolvedValue(undefined),
        }),
        close: jest.fn().mockResolvedValue(undefined),
    }),
}));

jest.mock('react-dom/server', () => ({
    renderToStaticMarkup: jest.fn(),
}));

describe('convertToPdf', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should generate a PDF successfully', async () => {
        const options: ConvertToPdfOptions = {
            outputPath: 'test.pdf',
        };

        await convertToPdf(<div>Test</div>, options);

        expect(puppeteer.launch).toHaveBeenCalled();
        expect(ReactDOMServer.renderToStaticMarkup).toHaveBeenCalled();
    });

    it('should throw an error when generating a PDF fails', async () => {
        const options: ConvertToPdfOptions = {
            outputPath: 'test.pdf',
        };

        ((await (await puppeteer.launch()).newPage()).pdf as jest.Mock).mockRejectedValue(new Error('PDF generation failed'));

        await expect(convertToPdf(<div>Test</div>, options)).rejects.toThrow('PDF generation failed');

        expect(puppeteer.launch).toHaveBeenCalled();
        expect(ReactDOMServer.renderToStaticMarkup).toHaveBeenCalled();
    });
});