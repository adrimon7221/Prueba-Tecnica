import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Consultor } from '@/types';

interface ConsultorCardProps {
  consultor: Consultor;
  onEdit: (consultor: Consultor) => void;
  onDelete: (id: number) => void;
}

export const ConsultorCard: React.FC<ConsultorCardProps> = ({
  consultor,
  onEdit,
  onDelete,
}) => {
  const handleDelete = () => {
    Alert.alert(
      'Eliminar Consultor',
      `¿Estás seguro de eliminar a ${consultor.nombre} ${consultor.apellido}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => onDelete(consultor.id),
        },
      ]
    );
  };

  return (
    <Card>
      <View style={styles.header}>
        <Text style={styles.name}>
          {consultor.nombre} {consultor.apellido}
        </Text>
        <Text style={styles.especialidad}>{consultor.especialidad}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{consultor.email}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.label}>Teléfono:</Text>
        <Text style={styles.value}>{consultor.telefono}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => onEdit(consultor)}
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
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  especialidad: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  info: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
    width: 80,
  },
  value: {
    fontSize: 14,
    color: '#333',
    flex: 1,
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
