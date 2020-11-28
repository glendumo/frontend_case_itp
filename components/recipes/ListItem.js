// imports
import React from "react";
import { Image } from "react-datocms";
import * as Routes from "../../routes";

// list/card component
function ListItem({ id, image, title }) {
    return (
        <a href={Routes.RECIPE_DETAIL.replace("[id]", id)}>
            <div className="recipes-list-item">
                <Image data={image} className="image" />
                <h2 className="title">{title}</h2>
            </div>
        </a>
    );
}

export default ListItem;
