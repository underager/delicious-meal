import React from 'react'
import { useEffect, useState } from 'react';
import styled from 'styled-components'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import {Link} from 'react-router-dom'

function Popular() {
    const [populars, setPopulars] = useState([]);
    useEffect(() =>{
        console.log('in Popular useEffect')
        getPopularRecipes();
    }, [])

    async function getPopularRecipes(){
        const popularLocalStorage = localStorage.getItem('popular');
        let dataRecipes;
        if(popularLocalStorage){
            dataRecipes = JSON.parse(popularLocalStorage);
        }else{
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`);
            dataRecipes = await api.json();
            localStorage.setItem('popular', JSON.stringify(dataRecipes));
            console.log(dataRecipes);
        }
        setPopulars(dataRecipes.recipes);
    }
  return (
    <div>
        <h3>Our Popular picks</h3>
        <Wrapper>
            <Splide 
                options={{
                    perPage: 3,
                    arrows: true,
                    pagination: false,
                    drag: 'free',
                    gap: '5rem'
                }}
            >
            {populars.map((popular) =>{
                return (
                    <SplideSlide key={popular.id}>
                        <Link to={`/recipe/${popular.id}`}>
                        <Card key={popular.id}>
                            <p>{popular.title}</p>
                            <img src={popular.image} alt={popular.title}/>
                            <Gradient/>
                        </Card>
                        </Link>
                    </SplideSlide>
                )
            })}
            </Splide>
        </Wrapper>
    </div>
  )
}

const Wrapper = styled.div`
    margin: 4rem 0rem;
`;

const Card = styled.div`
    min-height: 20rem;
    border-radius: 2rem;
    overflow: hidden;
    position: relative;

    img{
        border-radius: 2rem;
        position: absolute;
        left:0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    p{
        position: absolute;
        z-index: 10;
        // left: 50%;
        bottom: 0%;
        transform: translateX(-50%, 0%);
        color: white;
        width:100%;
        text-align: center;
        font-weight: 600;
        font-size: 1rem;
        height: 40%;
        display:flex;
        justify-content: center;
        align-items: center;
    }

    
`;

const Gradient = styled.div`
    z-index: 3;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5));
`;

export default Popular