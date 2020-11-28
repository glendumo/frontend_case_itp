// imports
import { Header, Footer } from "../components/layout";
import "../styles/app.css";

// defining a base layout
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
