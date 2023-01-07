import { useContext, Fragment } from "react";
import { CategoruContext } from "../../contexts/categories.context";
import CategoryView from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {
    const { categories } = useContext(CategoruContext);
    return(
        <Fragment>
            {
                Object.keys(categories).map((title) => {
                    const products = categories[title];
                    return (<CategoryView key={ title }  products={ products } title= { title }/>)
                })
            }
        </Fragment>
    );
};

export default CategoriesPreview;