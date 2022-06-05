import Header from "./Header";
import Footer from "./Footer";
import "./Layout.module.scss";

export default function Layout(props) {
    return (
        <>
            <Header />
            <main>{props.children}</main>
            <Footer />
        </>
    );
}
