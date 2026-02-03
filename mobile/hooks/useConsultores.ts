import { useState, useEffect } from 'react';
import { consultoresService } from '@/services/consultores.service';
import { Consultor, CreateConsultorDto, UpdateConsultorDto } from '@/types';

export const useConsultores = () => {
  const [consultores, setConsultores] = useState<Consultor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchConsultores = async (currentPage = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await consultoresService.getAll(currentPage, 10);
      setConsultores(response.data);
      setTotalPages(response.totalPages);
      setPage(currentPage);
    } catch (err: any) {
      setError(err.message || 'Error al cargar consultores');
    } finally {
      setLoading(false);
    }
  };

  const createConsultor = async (data: CreateConsultorDto) => {
    setLoading(true);
    setError(null);
    try {
      await consultoresService.create(data);
      await fetchConsultores(page);
    } catch (err: any) {
      setError(err.message || 'Error al crear consultor');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateConsultor = async (id: number, data: UpdateConsultorDto) => {
    setLoading(true);
    setError(null);
    try {
      await consultoresService.update(id, data);
      await fetchConsultores(page);
    } catch (err: any) {
      setError(err.message || 'Error al actualizar consultor');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteConsultor = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await consultoresService.delete(id);
      await fetchConsultores(page);
    } catch (err: any) {
      setError(err.message || 'Error al eliminar consultor');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConsultores();
  }, []);

  return {
    consultores,
    loading,
    error,
    page,
    totalPages,
    fetchConsultores,
    createConsultor,
    updateConsultor,
    deleteConsultor,
  };
};
