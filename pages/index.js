// imports
import { request } from "../lib/datocms";
import { ListItem } from "../components/recipes";
import Head from "next/head";

// create query for recipe cards
const RECIPES_QUERY = `query Recipes {
  allRecipes {
    id
    image {
      responsiveImage {
        src
        width
        height
      }
    }
    title
  }
}`;

// fetch data
export async function getStaticProps() {
    const data = await request({
        query: RECIPES_QUERY,
    });
    return {
        props: { data },
    };
}

export default function Recipes({ data }) {
    return (
        <main className="app-main">
            <Head>
                <title>RecipeRoom</title>
            </Head>
            <div className="page page--recipes">
                <div className="container">
                    <h1>Recipes</h1>
                    <div className="recipes-list row">
                        {/* displaying the data */}
                        {data.allRecipes.map((recipe) => (
                            <div
                                className="col-12 col-md-6 col-lg-4"
                                key={recipe.id}
                            >
                                <ListItem
                                    id={recipe.id}
                                    image={recipe.image.responsiveImage}
                                    title={recipe.title}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
