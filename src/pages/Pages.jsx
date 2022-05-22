import Home from "../components/Home"
import Cuisine from "./Cuisine"
import {Routes, Route, useLocation} from "react-router-dom"
import Searched from "./Searched"
import Recipe from "./Recipe"
import {AnimatePresence} from 'framer-motion'

function Pages() {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home/>} />
            <Route path="/cuisine/:type" element={<Cuisine/>} />
            <Route path="/search/:searchkey" element={<Searched/>} />
            <Route path="/recipe/:id" element={<Recipe/>} />
        </Routes>
        </AnimatePresence>
  )
}

export default Pages