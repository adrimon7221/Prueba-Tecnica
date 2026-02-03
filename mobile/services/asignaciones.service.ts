import api from './api';
import { ENDPOINTS } from '@/constants/config';
import { Asignacion, CreateAsignacionDto, PaginatedResponse } from '@/types';

export const asignacionesService = {
  getAll: async (page = 1, limit = 10): Promise<PaginatedResponse<Asignacion>> => {
    const response = await api.get(`${ENDPOINTS.ASIGNACIONES}?page=${page}&limit=${limit}`);
    return response.data;
  },

  create: async (data: CreateAsignacionDto): Promise<Asignacion> => {
    const response = await api.post(ENDPOINTS.ASIGNACIONES, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`${ENDPOINTS.ASIGNACIONES}/${id}`);
  },
};
