import Document, { Head, Html, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  static async getIntitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
  render() {
    return (
      <Html>
        <Head>
          <link rel='icon' href='/Logov3.png' />
          <link rel='stylesheet' href='../styles/satoshi.css' />
          <link rel='stylesheet' href='../styles/globals.css' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
