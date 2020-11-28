// imports
import { request } from "../../lib/datocms";
import { Image } from "react-datocms";
import Head from "next/head";

// get ID's of all recipes
export async function getStaticPaths() {
    const ID_QUERY = `query RecipeIds {
      allRecipes {
        id
      }
    }`;

    const data = await request({
        query: ID_QUERY,
    });

    const paths = data.allRecipes.map((recipe) => ({
        params: { id: recipe.id },
    }));

    return {
        paths,
        fallback: true,
    };
}

export async function getStaticProps({ params }) {
    console.log(params);
    // create query for recipe detail
    const RECIPE_DETAIL_QUERY = `query RecipeDetail {
      recipe(filter: {id: {eq: "${params.id}"}}) {
        estimatedTime
        id
        image {
          responsiveImage {
            src
            width
            height
          }
        }
        ingredients(markdown: true)
        method(markdown: true)
        portions
        title
      }
    }`;

    // fetch data
    const data = await request({
        query: RECIPE_DETAIL_QUERY,
    });
    return {
        props: { data },
    };
}

// display the data
export default function RecipeDetail({ data }) {
    return (
        <main className="app-main">
            <Head>
                <title>RecipeRoom - {data.recipe.title}</title>
            </Head>
            <div className="page page--recipe-detail">
                <div className="container">
                    <h1>
                        Recipe For <span>{data.recipe.title}</span>
                    </h1>
                    <div className="detail-container">
                        <div className="detail-info row">
                            <div className="detail-info-content col-12 col-md-4">
                                <h4>
                                    Estimated Time:{" "}
                                    <em>{data.recipe.estimatedTime} minutes</em>
                                </h4>
                                <h4>
                                    Portions: <em>{data.recipe.portions}</em>
                                </h4>
                            </div>
                            <Image
                                data={data.recipe.image.responsiveImage}
                                className="detail-info-image col-12 col-md-8"
                            />
                        </div>
                        <div className="recipe-info">
                            <div className="ingredients">
                                <h2>Ingredients</h2>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: data.recipe.ingredients,
                                    }}
                                />
                            </div>
                            <div className="method">
                                <h2>Method</h2>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: data.recipe.method,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
