import { motion } from "framer-motion";

import Footer from '../../Footer';
import ButtonGridSkeleton from './ButtonGridSkeleton';
import NominationsGridSkeleton from './NominationsGridSkeleton';
import HeaderGridSkeleton from './HeaderGridSkeleton';

export default function RoundDetailMainSkeleton() {
  return (
    <motion.main
    transition={{ duration: 0.3, delay: 0}}
          animate={{ y: 0, opacity: 1 }}
          initial={{ y: 15, opacity: 0 }}
    className="p-6 sm:p-10 space-y-6">

      <HeaderGridSkeleton>
      </HeaderGridSkeleton>

      <ButtonGridSkeleton>
      </ButtonGridSkeleton>

      <NominationsGridSkeleton>
      </NominationsGridSkeleton>

      <Footer></Footer>
    </motion.main>
  );
}
