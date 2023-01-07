import { DirectoryItemContainer, Body, BackgroundImage } from "./directory-item.styles";
import { useNavigate } from 'react-router-dom';

const DirectoryItem = (props) => {
    const { imageUrl, title, id, route } = props.category;
    const navigate = useNavigate();

    const onNavigateHandler = () => navigate(route);

    return(
        <DirectoryItemContainer onClick={ onNavigateHandler }>
        <BackgroundImage
        imageUrl={imageUrl}/>
        <Body>
          <h2>{ title }</h2>
          <p>Shop Now</p>
        </Body>
      </DirectoryItemContainer>
    )
};

export default DirectoryItem;