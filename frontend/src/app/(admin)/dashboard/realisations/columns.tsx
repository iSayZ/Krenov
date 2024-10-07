/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { ColumnDef } from '@tanstack/react-table';
import {
  Clipboard,
  ExternalLink,
  MoreHorizontal,
  PencilLine,
  Search,
  Trash2,
} from 'lucide-react';
import Image from 'next/image';
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
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { deleteRealisation } from '@/api/realisationsApi';
import { formatDateForUX } from '@/lib/dateUtils';
import { Realisation } from '@/types/realisation.interface';

export const columns = (
  onRealisationDeleted: (id: string) => void
): ColumnDef<Realisation>[] => [
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
    id: 'header',
    header: 'En-tête',
    cell: ({ row }) => {
      const realisation = row.original;
      return (
        <Link
          href="https://www.nd-renov.fr/upload/Image/renovation-interieure.jpg"
          target="_blank"
          className="block w-[100px]"
        >
          <AspectRatio ratio={1 / 1}>
            <Image
              src="https://www.nd-renov.fr/upload/Image/renovation-interieure.jpg"
              alt={`En-tête de la réalisation ${realisation._id}`}
              fill
              className="rounded-md object-cover shadow-lg"
            />
          </AspectRatio>
        </Link>
      );
    },
  },
  {
    accessorKey: 'slug',
    header: 'Slug',
  },
  {
    accessorKey: 'title',
    header: 'Titre',
  },
  {
    accessorKey: 'updatedAt',
    header: 'Dernière modification',
    cell: ({ row }) => {
      const date = row.original.updatedAt;
      return formatDateForUX(date.toString());
    },
  },
  {
    accessorKey: 'status',
    header: 'Statut',
    cell: ({ row }) => {
      const status = row.original.status;
      switch (status) {
        case 'active':
          return (
            <>
              <p className="font-semibold text-lime-500">Activé</p>
            </>
          );
        case 'desactive':
          return (
            <>
              <p className="font-semibold text-red-600">Désactivé</p>
            </>
          );
        case 'draft':
          return (
            <>
              <p className="font-semibold text-amber-500">Brouillon</p>
            </>
          );
      }
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const realisation = row.original;
      const router = useRouter();

      // Function to go at the realisation modification page
      const handleShowDetails = () => {
        router.push(`/dashboard/realisations/${realisation.slug}`);
      };

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
          await deleteRealisation(realisation._id);
          console.log('Réalisation supprimée avec succès.');
          onRealisationDeleted(realisation._id);
        } catch (error) {
          console.error(
            'Erreur lors de la suppression de la réalisation:',
            error
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
                onClick={() => navigator.clipboard.writeText(realisation.slug)}
              >
                <Clipboard className="mr-2 size-4" />
                <span>Copier le slug de la réalisation</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleShowDetails}>
                <Search className="mr-2 size-4" />
                <span>Voir tous les détails</span>
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
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <span>Changer le statut</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>
                      <span className="mr-2 size-2 rounded-full bg-lime-500" />
                      <span>Activer</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span className="mr-2 size-2 rounded-full bg-red-600" />
                      <span>Désactiver</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span className="mr-2 size-2 rounded-full bg-amber-500" />
                      <span>Mettre en brouillon</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
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
