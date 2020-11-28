// imports
import React from "react";
import * as Routes from "../../routes";

const Header = ({ children }) => {
    return (
        <header className="app-header">
            <nav className="navigation">
                <a href={Routes.LANDING} className="logo">
                    RecipeRoom
                </a>
            </nav>
        </header>
    );
};

export default Header;
