import styled from 'styled-components'
import {motion} from 'framer-motion'
import {useParams, Link} from 'react-router-dom'
import {useState, useEffect} from 'react'

function Cuisine() {
    const [cuisines, setCuisines] = useState([]);
    let params = useParams();
    const getCuisine = async (name) =>{
        const api = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`);
        const data = await api.json();
        console.log(data);
        setCuisines(data.results);
    };

    useEffect(() =>{
        getCuisine(params.type);
    }, [params])

  return (
    <Grid
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    >
        {cuisines.map((cuisine) =>{
            return(
                <Link to={`/recipe/${cuisine.id}`}>
                <Card id={cuisine.id}>
                    <img src={cuisine.image} alt={cuisine.title}/>
                    <h4>{cuisine.title}</h4>
                </Card>
                </Link>
            )
        })}
    </Grid>
  )
}

const Grid = styled(motion.div)`
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

export default Cuisine