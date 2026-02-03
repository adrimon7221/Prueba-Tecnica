import { useState, useEffect } from 'react';
import { asignacionesService } from '@/services/asignaciones.service';
import { Asignacion, CreateAsignacionDto } from '@/types';

export const useAsignaciones = () => {
  const [asignaciones, setAsignaciones] = useState<Asignacion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchAsignaciones = async (currentPage = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await asignacionesService.getAll(currentPage, 10);
      setAsignaciones(response.data);
      setTotalPages(response.totalPages);
      setPage(currentPage);
    } catch (err: any) {
      setError(err.message || 'Error al cargar asignaciones');
    } finally {
      setLoading(false);
    }
  };

  const createAsignacion = async (data: CreateAsignacionDto) => {
    setLoading(true);
    setError(null);
    try {
      await asignacionesService.create(data);
      await fetchAsignaciones(page);
    } catch (err: any) {
      setError(err.message || 'Error al crear asignación');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteAsignacion = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await asignacionesService.delete(id);
      await fetchAsignaciones(page);
    } catch (err: any) {
      setError(err.message || 'Error al eliminar asignación');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAsignaciones();
  }, []);

  return {
    asignaciones,
    loading,
    error,
    page,
    totalPages,
    fetchAsignaciones,
    createAsignacion,
    deleteAsignacion,
  };
};
