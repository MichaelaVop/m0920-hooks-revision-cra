import React, { useState, useEffect } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList'
import Search from './Search';

function Ingredients() {

  const [userIngredients, setUserIngredients] = useState([])

  useEffect(() => {
    fetch('https://react-hooks-misha-default-rtdb.firebaseio.com/ingredients.json')
      .then(response => response.json())
      .then(responseData => {
        const loadedIngredients = []
        for (const key in responseData) {
          loadedIngredients.push({
            id: key,
            title: responseData[key].title,
            amount: responseData[key].amount
          })
        }
        console.log('loaded Ingred', loadedIngredients);
        setUserIngredients(loadedIngredients)
      })
  },[])
  //call back = dependency array (list)

  const addIngredientHandler = (ingredients) => {
    // setUserIngredients((prevState) => [
    //   ...prevState,
    //   { id: Math.random().toString(), ...ingredients}
    // ])

    fetch('https://react-hooks-misha-default-rtdb.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredients),
      headers: { 'Content-Tpye': 'application/json'}
    })
      .then(response => response.json())
      .then(responseData => {
        setUserIngredients((prevState) => [
          ...prevState,
          { id: responseData.name, ...ingredients}
        ])
      })

  } 

  const removeIngredientsHandler = ingredientId => {
    setUserIngredients(prevState => {
      prevState.filter(ingredient => ingredient.id !== ingredientId)
    })
  }



  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search />
        <IngredientList ingredients={userIngredients} onRemoveItem={() => {}} />
      </section>
    </div>
  );
}

export default Ingredients;
