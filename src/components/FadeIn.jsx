import React from 'react';
import { motion } from 'framer-motion';

/**
 * Wraps children so they fade in and slide up as they scroll into view.
 * Triggers once per element (won't re-animate on scrolling back up/down).
 *
 * Props:
 *  - delay: seconds to wait before starting (good for staggering a grid)
 *  - y: how far (px) to slide up from
 *  - amount: fraction of the element that must be visible before it fires (0-1)
 *  - className: passed straight through to the wrapping div
 */
const FadeIn = ({ children, delay = 0, y = 28, amount = 0.2, className = '' }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
  >
    {children}
  </motion.div>
);

export default FadeIn;
