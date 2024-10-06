/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { ColumnDef } from '@tanstack/react-table';
import {
  MoreHorizontal,
  Clipboard,
  PencilLine,
  Trash2,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Realisation } from '@/types/realisation.interface';

export const columns: ColumnDef<Realisation>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: '_id',
    header: 'ID',
  },
  {
    accessorKey: 'title',
    header: 'Titre',
  },
  {
    accessorKey: 'date',
    header: 'Date de création',
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const realisation = row.original;
      const router = useRouter();

      // Function to go at the realisation modification page
      const handleModify = () => {
        router.push(`/dashboard/realisations/${realisation._id}/edition`);
      };

      const deleteConfirmTrigger = useRef<HTMLButtonElement | null>(null);

      const handleShowDeleteConfirm = () => {
        if (deleteConfirmTrigger.current) {
          deleteConfirmTrigger.current.click();
        }
      };

      // Function to delete an realisation
      const handleDelete = async () => {
        try {
          const response = await fetch(`/api/realisations/${realisation._id}`, {
            method: 'DELETE',
          });

          if (!response.ok) {
            throw new Error('Erreur lors de la suppression de la réalisation');
          }

          alert('Réalisation supprimée avec succès.');

          router.refresh();
        } catch (error) {
          console.error(error);
          alert(
            "Une erreur s'est produite lors de la suppression de la réalisation."
          );
        }
      };

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="size-8 p-0">
                <span className="sr-only">Ouvrir le menu</span>
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(realisation._id)}
              >
                <Clipboard className="mr-2 size-4" />
                <span>Copier l'ID de la réalisation</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleModify}>
                <PencilLine className="mr-2 size-4" />
                <span>Modifier la réalisation</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleShowDeleteConfirm}>
                <Trash2 className="mr-2 size-4" />
                <span>Supprimer la réalisation</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ExternalLink className="mr-2 size-4" />
                <Link href={`/realisations/${realisation._id}`} target="_blank">
                  <span>Voir la réalisation</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialog>
            <AlertDialogTrigger ref={deleteConfirmTrigger}></AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmer la Suppression</AlertDialogTitle>
                <AlertDialogDescription>
                  Êtes-vous sûr de vouloir supprimer cette réalisation ? Cette
                  action est irréversible et toutes les données associées seront
                  définitivement perdues. Veuillez confirmer votre choix pour
                  continuer.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Supprimer
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      );
    },
  },
];
