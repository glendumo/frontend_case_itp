import { Header, Footer } from "../components/layout";
import "../styles/app.css";

function MyApp({ Component, pageProps }) {
    return (
        <div className="app-body">
            <Header />
            <Component {...pageProps} />
            <Footer />
        </div>
    );
}

export default MyApp;
