import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Image from 'next/image';
import { HTMLAttributes } from 'react';

import { AspectRatio } from '@/components/ui/aspect-ratio';

import { TItem } from '../page';

// Define props for the SortableItem component, including item and HTML attributes
type Props = {
  item: TItem;
} & HTMLAttributes<HTMLDivElement>; // Allow additional HTML attributes for the div

const SortableItem = ({ item, ...props }: Props) => {
  // Use the useSortable hook to manage the item's dragging state and attributes
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: item.id, // Set the unique ID for the sortable item
    });

  // Styles for the item, applying transformation and transition effects
  const styles = {
    transform: CSS.Transform.toString(transform), // Convert the transform object to a CSS string
    transition: transition || undefined, // Apply transition if available
  };

  return (
    <div
      ref={setNodeRef} // Reference to the DOM node for sortable functionality
      style={styles} // Apply calculated styles for transformations
      {...props} // Spread additional props onto the div
      {...attributes} // Spread accessibility attributes for dragging
      {...listeners} // Spread event listeners for drag-and-drop functionality
    >
      <AspectRatio ratio={1 / 1} className="size-full shadow-md">
        <Image
          src={item.imageUrl}
          alt={`${item.id}`}
          fill
          className="rounded-md object-cover"
        />
      </AspectRatio>
    </div>
  );
};

export default SortableItem;
