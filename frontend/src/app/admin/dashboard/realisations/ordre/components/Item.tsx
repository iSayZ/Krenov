import Image from 'next/image';

import { AspectRatio } from '@/components/ui/aspect-ratio';

import { Realisation } from '@/types/realisation.interface';

// Define the props expected by the Item component
type Props = {
  item: Realisation;
  isDragging?: boolean; // Optional flag to indicate if the item is currently being dragged
};

// Functional component for rendering a draggable item
const Item = ({ item, isDragging }: Props) => {
  return (
    <div
      style={{
        opacity: isDragging ? 0.7 : 1, // Change opacity during drag for visual feedback
        transition: 'opacity 0.2s ease', // Smooth transition for opacity change
      }}
    >
      <AspectRatio ratio={1 / 1} className="size-[150px] shadow-md">
        <Image
          src={item.header}
          alt={`${item._id}`}
          fill
          className="rounded-md object-cover"
        />
      </AspectRatio>
    </div>
  );
};

export default Item;
