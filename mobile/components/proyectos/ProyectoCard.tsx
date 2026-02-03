import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Card } from '../ui/Card';
import { Proyecto } from '@/types';
import { formatDate } from '@/utils/formatDate';

interface ProyectoCardProps {
  proyecto: Proyecto;
  onEdit: (proyecto: Proyecto) => void;
  onDelete: (id: number) => void;
}

export const ProyectoCard: React.FC<ProyectoCardProps> = ({
  proyecto,
  onEdit,
  onDelete,
}) => {
  const handleDelete = () => {
    Alert.alert(
      'Eliminar Proyecto',
      `¿Estás seguro de eliminar el proyecto "${proyecto.nombre}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => onDelete(proyecto.id),
        },
      ]
    );
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'activo':
        return '#34C759';
      case 'completado':
        return '#007AFF';
      case 'pausado':
        return '#FF9500';
      default:
        return '#999';
    }
  };

  return (
    <Card>
      <View style={styles.header}>
        <Text style={styles.name}>{proyecto.nombre}</Text>
        <View style={[styles.estadoBadge, { backgroundColor: getEstadoColor(proyecto.estado) }]}>
          <Text style={styles.estadoText}>{proyecto.estado.toUpperCase()}</Text>
        </View>
      </View>

      <Text style={styles.descripcion}>{proyecto.descripcion}</Text>

      <View style={styles.fechas}>
        <View style={styles.fecha}>
          <Text style={styles.label}>Inicio:</Text>
          <Text style={styles.value}>{formatDate(proyecto.fechaInicio)}</Text>
        </View>
        <View style={styles.fecha}>
          <Text style={styles.label}>Fin:</Text>
          <Text style={styles.value}>{formatDate(proyecto.fechaFin)}</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => onEdit(proyecto)}
        >
          <Text style={styles.editText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  estadoBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  estadoText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  descripcion: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  fechas: {
    marginBottom: 12,
  },
  fecha: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
    width: 60,
  },
  value: {
    fontSize: 14,
    color: '#333',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
    gap: 8,
  },
  editButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    backgroundColor: '#007AFF',
  },
  editText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  deleteButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    backgroundColor: '#FF3B30',
  },
  deleteText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
