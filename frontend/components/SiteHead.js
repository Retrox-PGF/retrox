import Head from 'next/head'

export default function SiteHead(props) {
  return (
      <Head>
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
  )
}
