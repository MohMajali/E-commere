import { useContext, Fragment } from "react";
import { useSelector } from 'react-redux';
// import { CategoruContext } from "../../contexts/categories.context";
import { selectCategoriesMap } from "../../store/categories/category.selector";
import CategoryView from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {
    // const { categories } = useContext(CategoruContext);
    const categories = useSelector(selectCategoriesMap);
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