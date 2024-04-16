import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <script src="https://accounts.google.com/gsi/client" async defer></script>
      <link/>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
