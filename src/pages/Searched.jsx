import React from "react";
import {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom'
import styled from 'styled-components'

function Searched() {
  const [searchRecipes, setSearchRecipes] = useState([]);
  let params = useParams();

  const getSearched = async (name) =>{
    const api = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`);
    const data = await api.json();
    console.log(data);
    setSearchRecipes(data.results);
};

  useEffect(() =>{
    getSearched(params.searchkey);
  }, [params.searchkey])

  return (
    <Grid>
      {searchRecipes.map((recipe) =>{
        return(
          <Link to={`/recipe/${recipe.id}`}>
          <Card id={recipe.id}>
            <img src={recipe.image} alt={recipe.title}/>
            <h4>{recipe.title}</h4>
          </Card>
          </Link>
        )
      })}
    </Grid>
  )
}

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    grid-gap: 3rem;
`;

const Card = styled.div`
    img{
        width: 100%;
        border-radius: 2rem;
    }

    a{
        text-decoration:none;
    }

    h4{
        text-align: center;
        padding: 1rem;
    }
`;

export default Searched