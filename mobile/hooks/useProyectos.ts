import { useState, useEffect } from 'react';
import { proyectosService } from '@/services/proyectos.service';
import { Proyecto, CreateProyectoDto, UpdateProyectoDto } from '@/types';

export const useProyectos = () => {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProyectos = async (currentPage = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await proyectosService.getAll(currentPage, 10);
      setProyectos(response.data);
      setTotalPages(response.totalPages);
      setPage(currentPage);
    } catch (err: any) {
      setError(err.message || 'Error al cargar proyectos');
    } finally {
      setLoading(false);
    }
  };

  const createProyecto = async (data: CreateProyectoDto) => {
    setLoading(true);
    setError(null);
    try {
      await proyectosService.create(data);
      await fetchProyectos(page);
    } catch (err: any) {
      setError(err.message || 'Error al crear proyecto');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProyecto = async (id: number, data: UpdateProyectoDto) => {
    setLoading(true);
    setError(null);
    try {
      await proyectosService.update(id, data);
      await fetchProyectos(page);
    } catch (err: any) {
      setError(err.message || 'Error al actualizar proyecto');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteProyecto = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await proyectosService.delete(id);
      await fetchProyectos(page);
    } catch (err: any) {
      setError(err.message || 'Error al eliminar proyecto');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProyectos();
  }, []);

  return {
    proyectos,
    loading,
    error,
    page,
    totalPages,
    fetchProyectos,
    createProyecto,
    updateProyecto,
    deleteProyecto,
  };
};
