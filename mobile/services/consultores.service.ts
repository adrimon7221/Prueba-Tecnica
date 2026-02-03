import api from './api';
import { ENDPOINTS } from '@/constants/config';
import {
  Consultor,
  CreateConsultorDto,
  UpdateConsultorDto,
  PaginatedResponse,
} from '@/types';

export const consultoresService = {
  getAll: async (page = 1, limit = 10): Promise<PaginatedResponse<Consultor>> => {
    const response = await api.get(`${ENDPOINTS.CONSULTORES}?page=${page}&limit=${limit}`);
    return response.data;
  },

  getById: async (id: number): Promise<Consultor> => {
    const response = await api.get(`${ENDPOINTS.CONSULTORES}/${id}`);
    return response.data;
  },

  create: async (data: CreateConsultorDto): Promise<Consultor> => {
    const response = await api.post(ENDPOINTS.CONSULTORES, data);
    return response.data;
  },

  update: async (id: number, data: UpdateConsultorDto): Promise<Consultor> => {
    const response = await api.put(`${ENDPOINTS.CONSULTORES}/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`${ENDPOINTS.CONSULTORES}/${id}`);
  },
};
