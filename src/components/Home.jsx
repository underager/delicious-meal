import Veggies from "../pages/Veggies"
import Popular from "../pages/Popular"
import {motion} from 'framer-motion'

function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
        <Veggies />
        <Popular />
    </motion.div>
  )
}

export default Home