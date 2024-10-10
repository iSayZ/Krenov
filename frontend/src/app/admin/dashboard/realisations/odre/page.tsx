'use client';

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

import { Section } from '../../components/topbarMenu';
import { useVisitedSection } from '../../VisitedSectionContext';

import Item from './components/Item';
import SortableItem from './components/SortableItem';

// Define item type with an ID and imageUrl
export type TItem = {
  id: string;
  imageUrl: string;
};

// Array representing the initial set of items (realisations)
const realisationsArray: TItem[] = [
  {
    id: '1',
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1680382578857-c331ead9ed51?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '2',
    imageUrl:
      'https://images.unsplash.com/photo-1481277542470-605612bd2d61?q=80&w=2906&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '3',
    imageUrl:
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '4',
    imageUrl:
      'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '5',
    imageUrl:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2758&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '6',
    imageUrl:
      'https://images.unsplash.com/photo-1564540583246-934409427776?q=80&w=2906&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

const EditRealisation: React.FC = () => {
  // Update the section for breadcrumb into topbarMenu
  const { setVisitedSection } = useVisitedSection();

  const section: Section = {
    items: [
      {
        path: '/admin/dashboard',
        name: 'Dashboard',
      },
      {
        path: '/admin/dashboard/realisations',
        name: 'Réalisations',
      },
    ],
    page: {
      path: '/admin/dashboard/realisation/ordre',
      name: `Réorganisation de l'ordre d'affichage`,
    },
  };

  useEffect(() => {
    setVisitedSection(section);
  }, [setVisitedSection]);

  // Manage the state of items and active item being dragged
  const [items, setItems] = useState<TItem[]>(realisationsArray);
  const [activeItem, setActiveItem] = useState<TItem>(); // Track the item being dragged
  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor)); // Define sensors for drag-and-drop

  // Function to handle drag start event
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveItem(items.find((item) => item.id === active.id)); // Set active item when drag starts
  };

  // Function to handle drag end event
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    // Find the active and the over items
    const activeItem = items.find((item) => item.id === active.id);
    const overItem = items.find((item) => item.id === over.id);

    if (!activeItem || !overItem) {
      return;
    }

    // Get their indices and rearrange items if necessary
    const activeIndex = items.findIndex((item) => item.id === active.id);
    const overIndex = items.findIndex((item) => item.id === over.id);

    if (activeIndex !== overIndex) {
      setItems((prev) => arrayMove<TItem>(prev, activeIndex, overIndex)); // Use arrayMove to change positions
    }
    setActiveItem(undefined); // Reset active item after drag ends
  };

  const handleDragCancel = () => {
    setActiveItem(undefined); // Reset active item when drag is canceled
  };

  // Handle saving the current order
  const handleButtonClick = () => {
    const itemIds = items.map((item) => item.id);
    alert(itemIds);
  };

  // Reset the order to the original array
  const handleRefresh = () => {
    setItems(realisationsArray);
    alert('Ordre réinitialisé !');
  };

  return (
    <>
      {/* Header and description */}
      <h2 className="text-xl font-semibold">
        Déplacez les images des articles en fonction de l'ordre d'affichage
        désiré.
      </h2>
      <p className="italic text-muted-foreground">
        Seuls les articles ayant l'état "
        <span className="font-semibold text-lime-500">Activé</span>" seront
        visibles.
      </p>

      {/* DndContext for handling drag and drop */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter} // Collision detection strategy
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext items={items} strategy={rectSortingStrategy}>
          {' '}
          {/* Define the sorting strategy */}
          <div className="mx-auto my-8 grid grid-cols-6 gap-4">
            {' '}
            {/* Grid layout for items */}
            {items.map((item) => (
              <SortableItem key={item.id} item={item} />
            ))}
          </div>
        </SortableContext>
        <DragOverlay adjustScale style={{ transformOrigin: '0 0 ' }}>
          {' '}
          {/* Overlay to show the item being dragged */}
          {activeItem ? <Item item={activeItem} isDragging /> : null}{' '}
          {/* Render the active item during drag */}
        </DragOverlay>
      </DndContext>

      {/* Action buttons */}
      <div className="flex w-full gap-4">
        <Button
          onClick={handleButtonClick}
          className="bg-lime-600 hover:bg-lime-600/85"
        >
          Sauvegarder cet ordre
        </Button>
        <Button onClick={handleRefresh} variant="destructive">
          Annuler les changements
        </Button>
      </div>
    </>
  );
};

export default EditRealisation;
