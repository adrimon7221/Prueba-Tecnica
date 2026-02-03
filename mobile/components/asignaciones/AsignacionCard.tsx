import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Card } from '../ui/Card';
import { Asignacion } from '@/types';
import { formatDateTime, formatTime } from '@/utils/formatDate';

interface AsignacionCardProps {
  asignacion: Asignacion;
  onDelete: (id: number) => void;
}

export const AsignacionCard: React.FC<AsignacionCardProps> = ({
  asignacion,
  onDelete,
}) => {
  const handleDelete = () => {
    Alert.alert(
      'Eliminar Asignación',
      '¿Estás seguro de eliminar esta asignación?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => onDelete(asignacion.id),
        },
      ]
    );
  };

  return (
    <Card>
      <View style={styles.header}>
        <Text style={styles.consultorName}>
          {asignacion.consultor
            ? `${asignacion.consultor.nombre} ${asignacion.consultor.apellido}`
            : 'Consultor no disponible'}
        </Text>
        <Text style={styles.especialidad}>
          {asignacion.consultor?.especialidad || ''}
        </Text>
      </View>

      <View style={styles.proyectoContainer}>
        <Text style={styles.proyectoLabel}>Proyecto:</Text>
        <Text style={styles.proyectoName}>
          {asignacion.proyecto?.nombre || 'Proyecto no disponible'}
        </Text>
      </View>

      <View style={styles.horariosContainer}>
        <View style={styles.horario}>
          <Text style={styles.horarioLabel}>Inicio:</Text>
          <Text style={styles.horarioValue}>{formatDateTime(asignacion.horaInicio)}</Text>
        </View>
        <View style={styles.horario}>
          <Text style={styles.horarioLabel}>Fin:</Text>
          <Text style={styles.horarioValue}>{formatDateTime(asignacion.horaFin)}</Text>
        </View>
      </View>

      {asignacion.notas && (
        <View style={styles.notasContainer}>
          <Text style={styles.notasLabel}>Notas:</Text>
          <Text style={styles.notasText}>{asignacion.notas}</Text>
        </View>
      )}

      <View style={styles.actions}>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 12,
  },
  consultorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  especialidad: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '600',
  },
  proyectoContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  proyectoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginRight: 8,
  },
  proyectoName: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    fontWeight: '500',
  },
  horariosContainer: {
    marginBottom: 12,
  },
  horario: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  horarioLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
    width: 60,
  },
  horarioValue: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  notasContainer: {
    marginTop: 8,
    padding: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  notasLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
    marginBottom: 4,
  },
  notasText: {
    fontSize: 14,
    color: '#333',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
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
