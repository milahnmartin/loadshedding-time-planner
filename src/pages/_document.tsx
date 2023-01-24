import { QueryClient } from '@tanstack/react-query';
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';
export default class MyDocument extends Document {
  queryClient = new QueryClient();
  static async getIntitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
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
          <meta
            property="og:title"
            content="Loadshedding Time Calculator / Home"
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:description"
            content="Struggling to schedule game time with the boys due to loadshedding ? Look no Further, simply make an account, add your corresponding loadshedding area and add your friends ! Then sit back and let the LS Calculator do the stressful work for you !"
          />
          <meta
            name="description"
            content="Struggling to schedule game time with the boys due to loadshedding ? Look no Further, simply make an account, add your corresponding loadshedding area and add your friends ! Then sit back and let the LS Calculator do the stressful work for you !"
          />
          <meta property="og:image" content="/Logov3.png" />
          <link rel="icon" href="/Logov3.png" />
          <link
            ref="preload"
            href="/fonts/Satoshi-Bold.woff"
            as="font"
            type="font/woff"
            crossOrigin=""
          />
          <link
            ref="preload"
            href="/fonts/Satoshi-Variable.woff"
            as="font"
            type="font/woff"
            crossOrigin=""
          />
          <link
            ref="preload"
            href="/fonts/Satoshi-Black.woff"
            as="font"
            type="font/woff"
            crossOrigin=""
          />
          <link
            ref="preload"
            href="/fonts/Satoshi-BlackItalic.woff"
            as="font"
            type="font/woff"
            crossOrigin=""
          />

          <link
            ref="preload"
            href="@assets/97171-loading-plane.json"
            as="json"
            type="application/json"
            crossOrigin=""
          />
          <link
            ref="preload"
            href="@assets/98639-successfull.json"
            as="json"
            type="application/json"
            crossOrigin=""
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
