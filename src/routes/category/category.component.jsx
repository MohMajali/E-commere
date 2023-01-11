import './category.styles.scss';
import { useContext, useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CategoruContext } from '../../contexts/categories.context';
import ProductCard from '../../components/product-card/product-card.component';
import { selectCategoriesMap } from '../../store/categories/category.selector';

const Category = () => {

    const { category } = useParams();
    // const { categories } = useContext(CategoruContext);
    const categories = useSelector(selectCategoriesMap);    
    const [products, setProducts] = useState(categories[category]);

    useEffect(() => {

        setProducts(categories[category]);

    }, [category, categories]);

    return(
        <Fragment>
            <h2 className='category-title'>{ category.toUpperCase() }</h2>
            <div className='category-container'>
                {
                    products && products.map((product) => <ProductCard key={ product.id } product={ product }/>)
                }
            </div>
        </Fragment>
    );
};

export default Category;