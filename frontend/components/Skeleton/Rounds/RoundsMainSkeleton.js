import RoundsCardSkeleton from './RoundsCardSkeleton';
import Footer from '../../Footer';
import HeaderGrid from '../../Rounds/HeaderGrid';

import { motion } from "framer-motion";

export default function RoundsMain(props) {
  return (
    <motion.main
    transition={{ duration: 0.3, delay: 0}}
          animate={{ y: 0, opacity: 1 }}
          initial={{ y: 15, opacity: 0 }}
    className="p-6 sm:p-10 space-y-6">
      <HeaderGrid>
      </HeaderGrid>

      <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        <RoundsCardSkeleton></RoundsCardSkeleton>
      </section>

      <Footer></Footer>
    </motion.main>
  );
}
