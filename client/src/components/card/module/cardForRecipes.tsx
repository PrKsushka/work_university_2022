import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import links from '../../../constants/links';
import Card, { Obj } from '../card';
import { ProductElement } from '../../../store/types';

interface CardForRecipesTypes {
  el: ProductElement;
  obj: Obj;
  child?: ReactNode;
}

const CardForRecipes: React.FunctionComponent<CardForRecipesTypes> = ({ el, obj }) => {
  return (
    <Card key={el._id} el={el} obj={obj}>
      <Link to={`${links.recipes}/${el._id}`} className="cardTextLink">
        <div className="cardMainText">
          <h3 className="cardTitle">{el.name}</h3>
          <div className="ratingSec">
            <p className="cardParagraph">
              {el.time}
              &nbsp;
              {el.time && el.time <= 60 ? 'мин' : 'ч'}
            </p>
            <p className="cardParagraph">Рейтинг {el.rating}</p>
          </div>
        </div>
      </Link>
    </Card>
  );
};
export default CardForRecipes;
