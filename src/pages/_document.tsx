import { QueryClient } from "@tanstack/react-query";
import Document, { DocumentContext, Head, Html, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";
export default class MyDocument extends Document {
  queryClient = new QueryClient();
  static async getIntitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [initialProps.styles, sheet.getStyleElement()],
      };
    } finally {
      sheet.seal();
    }
  }
  render() {
    return (
      <Html>
        <Head>
          <link rel='icon' href='/Logov3.png' />
          <link
            ref='preload'
            href='/fonts/Satoshi-Bold.woff'
            as='font'
            type='font/woff'
            crossOrigin=''
          />
          <link
            ref='preload'
            href='/fonts/Satoshi-Variable.woff'
            as='font'
            type='font/woff'
            crossOrigin=''
          />
          <link
            ref='preload'
            href='/fonts/Satoshi-Black.woff'
            as='font'
            type='font/woff'
            crossOrigin=''
          />
          <link
            ref='preload'
            href='/fonts/Satoshi-BlackItalic.woff'
            as='font'
            type='font/woff'
            crossOrigin=''
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
