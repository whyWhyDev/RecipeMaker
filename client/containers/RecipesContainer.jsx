import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { CardColumns, CardDeck } from 'react-bootstrap';
import RecipeDisplay from '../components/RecipeDisplay';
import { useRecipe, useSetRecipe } from '../contexts/RecipeContext';

function RecipesContainer() {
  const recipe = useRecipe();
  const setRecipe = useSetRecipe();
  const inventory = useInventory();
  if (inventory === null) {
    return 'loading';
  }
  useEffect(() => {
    axios
      .post('./api/recipes', inventory)
      .then((res) => {
        setRecipe(res.data);
      })
      .catch((err) => console.log(err));
  }, [inventory]);

  if (recipe === null) {
    return 'Loading...';
  }

  const RecipesDisplay = Object.values(recipe).reduce((acc, ele, index) => {
    acc.push(<RecipeDisplay key={`rd${index}`} recipe={ele} />);
    return acc;
  }, []);
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <CardDeck style={{ width: '800px', display: 'flex', flexDirection: 'column' }}>{RecipesDisplay}</CardDeck>
    </div>
  );
}

export default RecipesContainer;
