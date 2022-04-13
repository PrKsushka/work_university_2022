import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dataAboutRecipes, getFavouriteRecipes, setNameOfMeal, unsavedFromFavouriteRecipes } from '../../store/modules/recipes/recipes.actions';
import { ProductElement, StoreState } from '../../store/types';
import { getRecipes } from '../../store/modules/recipes/recipes.selectors';
import styles from './recipes.module.scss';
import SortPanel from '../../components/sortPannel/sortPannel';
import './card.css';
import SortMenu from '../../UI/sortMenu/sortMenu';
import { meal } from '../../constants/sortMenu';
import PopUp from '../../components/popUp/popUp';
import links from '../../constants/links';
import { Link } from 'react-router-dom';

const Recipes: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: StoreState) => getRecipes(state));
  const [showWindow, setShowWindow] = useState(false);
  const saveTargetElement: any = useRef();
  useEffect(() => {
    dispatch(dataAboutRecipes());
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setShowWindow((prevState) => false);
    }, 10000);
  }, [showWindow]);

  const handleClick = (elem: ProductElement) => (e: any) => {
    if (e.target.className === 'saveClicked') {
      e.target.className = 'save';
      return dispatch(unsavedFromFavouriteRecipes(elem));
    }
    e.target.className = 'saveClicked';
    setShowWindow((prevState) => true);
    saveTargetElement.current = elem;
    dispatch(getFavouriteRecipes(elem));
  };
  const menuClick = (e: any) => {
    dispatch(setNameOfMeal(e.target.textContent.toLowerCase()));
  };
  const objForSortMenu = {
    arr: meal,
    sortFunc: menuClick,
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.darkGlass}>
        <div className={styles.textBlockWrapper}>Лучшие рецепты</div>
        <div className={styles.banner} />
      </div>
      <div className={styles.mainContent}>
        <div className={styles.columnForSort}>
          <SortPanel />
        </div>
        <div className={styles.rightProdColumn}>
          <SortMenu obj={objForSortMenu} />
          <div className={styles.products}>
            {data.length !== 0
              ? data.map((el) => (
                  <div className={styles.card} key={el._id}>
                    <div style={{ backgroundImage: `url(${require(`../../${el.image}`)}` }} className={styles.image} />
                    <div className="save" onClick={handleClick(el)} />
                    <Link to={`${links.recipes}/${el._id}`}>
                      <div className={styles.mainText}>
                        <h3>{el.name}</h3>
                        <div className={styles.ratingSec}>
                          <p>{el.time}</p>
                          <p>{el.rating}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              : 'Sorry there are no recipes'}
            {showWindow ? <PopUp elem={saveTargetElement.current} /> : null}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Recipes;
