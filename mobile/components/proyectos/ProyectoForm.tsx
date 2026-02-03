import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Proyecto, CreateProyectoDto, UpdateProyectoDto } from '@/types';

interface ProyectoFormProps {
  visible: boolean;
  proyecto?: Proyecto;
  onSubmit: (data: CreateProyectoDto | UpdateProyectoDto) => Promise<void>;
  onClose: () => void;
}

export const ProyectoForm: React.FC<ProyectoFormProps> = ({
  visible,
  proyecto,
  onSubmit,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    estado: 'activo' as 'activo' | 'completado' | 'pausado',
    fechaInicio: '',
    fechaFin: '',
  });
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (proyecto) {
      setFormData({
        nombre: proyecto.nombre,
        descripcion: proyecto.descripcion,
        estado: proyecto.estado,
        fechaInicio: proyecto.fechaInicio.split('T')[0],
        fechaFin: proyecto.fechaFin.split('T')[0],
      });
    } else {
      setFormData({
        nombre: '',
        descripcion: '',
        estado: 'activo',
        fechaInicio: '',
        fechaFin: '',
      });
    }
    setErrors({});
  }, [proyecto, visible]);

  const validate = () => {
    const newErrors: any = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }
    if (!formData.descripcion.trim()) {
      newErrors.descripcion = 'La descripción es requerida';
    }
    if (!formData.fechaInicio) {
      newErrors.fechaInicio = 'La fecha de inicio es requerida';
    }
    if (!formData.fechaFin) {
      newErrors.fechaFin = 'La fecha de fin es requerida';
    }
    if (formData.fechaInicio && formData.fechaFin) {
      if (new Date(formData.fechaInicio) > new Date(formData.fechaFin)) {
        newErrors.fechaFin = 'La fecha de fin debe ser posterior a la de inicio';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      const data = {
        ...formData,
        fechaInicio: new Date(formData.fechaInicio + 'T08:00:00.000Z').toISOString(),
        fechaFin: new Date(formData.fechaFin + 'T18:00:00.000Z').toISOString(),
      };
      await onSubmit(data);
      onClose();
    } catch (error) {
      console.error('Error al guardar:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>
              {proyecto ? 'Editar Proyecto' : 'Nuevo Proyecto'}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.form}>
            <Input
              label="Nombre"
              value={formData.nombre}
              onChangeText={(text) => setFormData({ ...formData, nombre: text })}
              error={errors.nombre}
            />

            <Input
              label="Descripción"
              value={formData.descripcion}
              onChangeText={(text) => setFormData({ ...formData, descripcion: text })}
              multiline
              numberOfLines={3}
              error={errors.descripcion}
            />

            <View style={styles.pickerContainer}>
              <Text style={styles.label}>Estado</Text>
              <View style={styles.estadoButtons}>
                {['activo', 'pausado', 'completado'].map((estado) => (
                  <TouchableOpacity
                    key={estado}
                    style={[
                      styles.estadoButton,
                      formData.estado === estado && styles.estadoButtonActive,
                    ]}
                    onPress={() =>
                      setFormData({
                        ...formData,
                        estado: estado as 'activo' | 'completado' | 'pausado',
                      })
                    }
                  >
                    <Text
                      style={[
                        styles.estadoButtonText,
                        formData.estado === estado && styles.estadoButtonTextActive,
                      ]}
                    >
                      {estado.charAt(0).toUpperCase() + estado.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <Input
              label="Fecha de Inicio (YYYY-MM-DD)"
              value={formData.fechaInicio}
              onChangeText={(text) => setFormData({ ...formData, fechaInicio: text })}
              placeholder="2026-02-01"
              error={errors.fechaInicio}
            />

            <Input
              label="Fecha de Fin (YYYY-MM-DD)"
              value={formData.fechaFin}
              onChangeText={(text) => setFormData({ ...formData, fechaFin: text })}
              placeholder="2026-06-30"
              error={errors.fechaFin}
            />
          </ScrollView>

          <View style={styles.footer}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={onClose}
                disabled={loading}
              >
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>
              <Button
                title={proyecto ? 'Actualizar' : 'Crear'}
                onPress={handleSubmit}
                loading={loading}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    fontSize: 24,
    color: '#666',
  },
  form: {
    padding: 20,
  },
  pickerContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  estadoButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  estadoButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  estadoButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  estadoButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  estadoButtonTextActive: {
    color: '#fff',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
});
