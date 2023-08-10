import '@/styles/globals.css'
import Navigation from "../components/Navigation/Navigation.jsx"
import Layout from '@/components/Layout/Layout.jsx';
import Provider from '@/components/Provider';


export default function App({ Component, pageProps }) {
  return (
    <Provider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
    )
}
