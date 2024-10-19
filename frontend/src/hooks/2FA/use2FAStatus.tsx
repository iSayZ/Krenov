"use client";

import { useState, useEffect } from 'react';
import axiosInstance from '@/lib/axiosInstance';

interface TwoFAStatusResponse {
  is2FAEnabled: boolean;
}

export function use2FAStatus() {
  const [is2FAEnabled, setIs2FAEnabled] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get status 2Fa of the user before check
  useEffect(() => {
    const check2FAStatus = async () => {
      try {
        const { data } = await axiosInstance.get<TwoFAStatusResponse>('/2fa/status');
        setIs2FAEnabled(data.is2FAEnabled);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors de la vérification du statut 2FA');
      } finally {
        setIsLoading(false);
      }
    };

    check2FAStatus();
  }, []);

  return { is2FAEnabled, isLoading, error };
}