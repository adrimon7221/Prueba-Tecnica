import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Consultor, CreateConsultorDto, UpdateConsultorDto } from '@/types';

interface ConsultorFormProps {
  visible: boolean;
  consultor?: Consultor;
  onSubmit: (data: CreateConsultorDto | UpdateConsultorDto) => Promise<void>;
  onClose: () => void;
}

export const ConsultorForm: React.FC<ConsultorFormProps> = ({
  visible,
  consultor,
  onSubmit,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    especialidad: '',
  });
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (consultor) {
      setFormData({
        nombre: consultor.nombre,
        apellido: consultor.apellido,
        email: consultor.email,
        telefono: consultor.telefono,
        especialidad: consultor.especialidad,
      });
    } else {
      setFormData({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        especialidad: '',
      });
    }
    setErrors({});
  }, [consultor, visible]);

  const validate = () => {
    const newErrors: any = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }
    if (!formData.apellido.trim()) {
      newErrors.apellido = 'El apellido es requerido';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es requerido';
    }
    if (!formData.especialidad.trim()) {
      newErrors.especialidad = 'La especialidad es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      await onSubmit(formData);
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
              {consultor ? 'Editar Consultor' : 'Nuevo Consultor'}
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
              label="Apellido"
              value={formData.apellido}
              onChangeText={(text) => setFormData({ ...formData, apellido: text })}
              error={errors.apellido}
            />

            <Input
              label="Email"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
            />

            <Input
              label="Teléfono"
              value={formData.telefono}
              onChangeText={(text) => setFormData({ ...formData, telefono: text })}
              keyboardType="phone-pad"
              error={errors.telefono}
            />

            <Input
              label="Especialidad"
              value={formData.especialidad}
              onChangeText={(text) => setFormData({ ...formData, especialidad: text })}
              error={errors.especialidad}
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
                title={consultor ? 'Actualizar' : 'Crear'}
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
