import { motion } from "framer-motion";

import Footer from '../Footer';
import HeaderGrid from './HeaderGrid';
import Form from './Form';

export default function Main(props) {
  return (
    <motion.main
    transition={{ duration: 0.3, delay: 0}}
          animate={{ y: 0, opacity: 1 }}
          initial={{ y: 15, opacity: 0 }}
    className="p-6 sm:p-10 space-y-6">

      <HeaderGrid>
      </HeaderGrid>

      <Form
        onSubmit={props.onSubmit}>
      </Form>

      <Footer>
      </Footer>
    </motion.main>
  )
}
