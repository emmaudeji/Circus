import Head from "next/head"

const HeadSEO = ({title, description, }) => {
  return (
    <Head>
        <title>{title ? title : 'Circus'}</title>
        <meta name="description" content={description ? description : "Explore free web courses and upskill in your career."} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
  </Head>
  )
}

export default HeadSEO