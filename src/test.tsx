import * as puppeteer from 'puppeteer';
import {convertToPdf, ConvertToPdfOptions} from './index';
import * as ReactDOMServer from 'react-dom/server';
import React from 'react';

jest.mock('puppeteer', () => ({
    launch: jest.fn(),
}));

jest.mock('react-dom/server', () => ({
    renderToStaticMarkup: jest.fn(),
}));

describe('convertToPdf', () => {
    const pdfMock = jest.fn().mockResolvedValue(undefined);
    const newPageMock = jest.fn().mockResolvedValue({
        setContent: jest.fn().mockResolvedValue(undefined),
        pdf: pdfMock,
    });

    const launchMock = (puppeteer.launch as unknown as jest.Mock).mockResolvedValue({
        newPage: newPageMock,
        close: jest.fn().mockResolvedValue(undefined),
    });

    const renderToStaticMarkupMock = (ReactDOMServer.renderToStaticMarkup as jest.Mock).mockReturnValue('<html></html>');

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should generate a PDF successfully', async () => {
        const options: ConvertToPdfOptions = {
            outputPath: 'test.pdf',
        };

        await convertToPdf(<div>Test</div>, options);

        expect(launchMock).toHaveBeenCalled();
        expect(renderToStaticMarkupMock).toHaveBeenCalled();
    });

    it('should throw an error when generating a PDF fails', async () => {
        const options: ConvertToPdfOptions = {
            outputPath: 'test.pdf',
        };

        pdfMock.mockRejectedValue(new Error('PDF generation failed'));

        await expect(convertToPdf(<div>Test</div>, options)).rejects.toThrow('PDF generation failed');

        expect(launchMock).toHaveBeenCalled();
        expect(renderToStaticMarkupMock).toHaveBeenCalled();
    });
});