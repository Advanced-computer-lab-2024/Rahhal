'use client'

import React, { useState } from 'react'
import { Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import useWishlistStore from '@/stores/wishlist-count-store'

interface WishlistIconProps {
  itemCount: number
}

const WishlistIcon: React.FC<WishlistIconProps> = ({ itemCount }) => {

  const { count } = useWishlistStore();

  return (
    <motion.div
      className="relative inline-block cursor-pointer"
      whileHover={{ scale: 1.1 }} // Slight scaling on hover
      whileTap={{ scale: 0.95 }} // Slight scaling on tap
    >
      <Heart className="w-6 h-6 text-gray-700 transition-colors duration-300" />
      {count > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-lg"
        >
          {count > 99 ? '99+' : count}
        </motion.div>
      )}
    </motion.div>
  )
}

export default WishlistIcon