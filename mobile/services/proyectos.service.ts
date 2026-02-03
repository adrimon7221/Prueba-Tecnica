import api from './api';
import { ENDPOINTS } from '@/constants/config';
import {
  Proyecto,
  CreateProyectoDto,
  UpdateProyectoDto,
  PaginatedResponse,
} from '@/types';

export const proyectosService = {
  getAll: async (page = 1, limit = 10): Promise<PaginatedResponse<Proyecto>> => {
    const response = await api.get(`${ENDPOINTS.PROYECTOS}?page=${page}&limit=${limit}`);
    return response.data;
  },

  getById: async (id: number): Promise<Proyecto> => {
    const response = await api.get(`${ENDPOINTS.PROYECTOS}/${id}`);
    return response.data;
  },

  create: async (data: CreateProyectoDto): Promise<Proyecto> => {
    const response = await api.post(ENDPOINTS.PROYECTOS, data);
    return response.data;
  },

  update: async (id: number, data: UpdateProyectoDto): Promise<Proyecto> => {
    const response = await api.put(`${ENDPOINTS.PROYECTOS}/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`${ENDPOINTS.PROYECTOS}/${id}`);
  },
};
