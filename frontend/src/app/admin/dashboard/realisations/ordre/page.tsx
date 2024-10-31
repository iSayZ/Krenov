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

import { Section } from '../../components/template/TopbarMenu';
import { useVisitedSection } from '../../contexts/VisitedSectionContext';

import Item from './components/Item';
import SortableItem from './components/SortableItem';

import { fetchAllActiveRealisations, updateOrderRealisation } from '@/api/realisationsApi';
import { Realisation } from '@/types/realisation.interface';
import { toast } from 'sonner';
import { formatDateForUX } from '@/lib/dateUtils';

const EditRealisation: React.FC = () => {
  // Update the section for breadcrumb into topbarMenu
  const { setVisitedSection } = useVisitedSection();

  const section: Section = {
    items: [
      {
        path: '/admin/dashboard/accueil',
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
  const [items, setItems] = useState<Realisation[]>([]);
  const [activeItem, setActiveItem] = useState<Realisation>(); // Track the item being dragged
  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor)); // Define sensors for drag-and-drop
  const [loading, setLoading] = useState<boolean>(true);

  const loadActiveRealisations = async () => {
    try {
      const data = await fetchAllActiveRealisations();
      setItems(data);
    } catch (error) {
      console.error('Erreur lors du chargement des réalisations:', error);
    } finally {
      setLoading(false);
    }
  };

  // Call API
  useEffect(() => {
    loadActiveRealisations();
  }, []);

  // Function to handle drag start event
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveItem(items?.find((item) => item._id === active.id)); // Set active item when drag starts
  };

  // Function to handle drag end event
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    // Find the active and the over items
    const activeItem = items?.find((item) => item._id === active.id);
    const overItem = items?.find((item) => item._id === over.id);

    if (!activeItem || !overItem) {
      return;
    }

    // Get their indices and rearrange items if necessary
    const activeIndex = items?.findIndex((item) => item._id === active.id);
    const overIndex = items?.findIndex((item) => item._id === over.id);

    if (activeIndex !== overIndex) {
      setItems((prev) => arrayMove<Realisation>(prev, activeIndex, overIndex)); // Use arrayMove to change positions
    }
    setActiveItem(undefined); // Reset active item after drag ends
  };

  const handleDragCancel = () => {
    setActiveItem(undefined); // Reset active item when drag is canceled
  };

  // Handle saving the current order
  const handleButtonClick = async () => {
    const itemIds = items?.map((item, index) => ({slug: item.slug, order: index + 1}));

    try {
      const response = await updateOrderRealisation(itemIds);
      if (response.success) {
        toast.success('Ordre des articles mis à jour avec succès.', {
          description: formatDateForUX(new Date().toISOString()),
          action: {
            label: 'Fermer',
            onClick: () => '',
          },
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la mise à jour de l'ordre des articles.", {
        description: formatDateForUX(new Date().toISOString()),
        action: {
          label: 'Fermer',
          onClick: () => '',
        },
      });
    }
  };

  // Reset the order to the original array
  const handleRefresh = () => {
    loadActiveRealisations();
    alert('Ordre réinitialisé !');
  };

  if (loading) {
    return (
      <div className="flex size-full items-center justify-center">
        <div
          className="text-foreground inline-block size-12 animate-spin rounded-full border-[3px] border-current border-t-transparent"
          role="status"
          aria-label="loading"
        ></div>
      </div>
    );
  }

  return (
    <>
      {/* Header and description */}
      <h2 className="text-xl font-semibold">
        Déplacez les images des articles en fonction de l'ordre d'affichage
        désiré.
      </h2>
      <p className="text-muted-foreground italic">
        Seuls les articles ayant l'état "
        <span className="font-semibold text-lime-500">Activé</span>" seront
        visibles ici.
      </p>

      {/* DndContext for handling drag and drop */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter} // Collision detection strategy
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
<SortableContext 
    items={items.map((item) => ({ id: item.order }))}
    strategy={rectSortingStrategy}
>          
{' '}
          {/* Define the sorting strategy */}
          <div className="mx-auto my-8 grid grid-cols-6 gap-4">
            {' '}
            {/* Grid layout for items */}
            {items?.map((item, index) => (
              <SortableItem key={item._id} item={item} index={index} />
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
