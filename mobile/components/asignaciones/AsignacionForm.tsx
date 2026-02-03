import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { CreateAsignacionDto, Consultor, Proyecto } from '@/types';
import { consultoresService } from '@/services/consultores.service';
import { proyectosService } from '@/services/proyectos.service';

interface AsignacionFormProps {
  visible: boolean;
  onSubmit: (data: CreateAsignacionDto) => Promise<void>;
  onClose: () => void;
}

export const AsignacionForm: React.FC<AsignacionFormProps> = ({
  visible,
  onSubmit,
  onClose,
}) => {
  const [consultores, setConsultores] = useState<Consultor[]>([]);
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [formData, setFormData] = useState({
    consultorId: 0,
    proyectoId: 0,
    horaInicio: '',
    horaFin: '',
    notas: '',
  });
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      loadData();
      resetForm();
    }
  }, [visible]);

  const loadData = async () => {
    try {
      const [consultoresRes, proyectosRes] = await Promise.all([
        consultoresService.getAll(1, 100),
        proyectosService.getAll(1, 100),
      ]);
      setConsultores(consultoresRes.data);
      setProyectos(proyectosRes.data);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar los datos');
    }
  };

  const resetForm = () => {
    setFormData({
      consultorId: 0,
      proyectoId: 0,
      horaInicio: '',
      horaFin: '',
      notas: '',
    });
    setErrors({});
  };

  const validate = () => {
    const newErrors: any = {};

    if (!formData.consultorId) {
      newErrors.consultorId = 'Selecciona un consultor';
    }
    if (!formData.proyectoId) {
      newErrors.proyectoId = 'Selecciona un proyecto';
    }
    if (!formData.horaInicio) {
      newErrors.horaInicio = 'La hora de inicio es requerida';
    }
    if (!formData.horaFin) {
      newErrors.horaFin = 'La hora de fin es requerida';
    }
    if (formData.horaInicio && formData.horaFin) {
      if (new Date(formData.horaInicio) >= new Date(formData.horaFin)) {
        newErrors.horaFin = 'La hora de fin debe ser posterior a la de inicio';
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
        consultorId: formData.consultorId,
        proyectoId: formData.proyectoId,
        horaInicio: new Date(formData.horaInicio).toISOString(),
        horaFin: new Date(formData.horaFin).toISOString(),
        notas: formData.notas || undefined,
      };
      await onSubmit(data);
      onClose();
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Error al crear asignación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Nueva Asignación</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.form}>
            <View style={styles.pickerContainer}>
              <Text style={styles.label}>Consultor *</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.optionsContainer}>
                  {consultores.map((consultor) => (
                    <TouchableOpacity
                      key={consultor.id}
                      style={[
                        styles.optionButton,
                        formData.consultorId === consultor.id && styles.optionButtonActive,
                      ]}
                      onPress={() => setFormData({ ...formData, consultorId: consultor.id })}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          formData.consultorId === consultor.id && styles.optionTextActive,
                        ]}
                      >
                        {consultor.nombre} {consultor.apellido}
                      </Text>
                      <Text style={styles.optionSubtext}>{consultor.especialidad}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
              {errors.consultorId && <Text style={styles.errorText}>{errors.consultorId}</Text>}
            </View>

            <View style={styles.pickerContainer}>
              <Text style={styles.label}>Proyecto *</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.optionsContainer}>
                  {proyectos.map((proyecto) => (
                    <TouchableOpacity
                      key={proyecto.id}
                      style={[
                        styles.optionButton,
                        formData.proyectoId === proyecto.id && styles.optionButtonActive,
                      ]}
                      onPress={() => setFormData({ ...formData, proyectoId: proyecto.id })}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          formData.proyectoId === proyecto.id && styles.optionTextActive,
                        ]}
                      >
                        {proyecto.nombre}
                      </Text>
                      <Text style={styles.optionSubtext}>{proyecto.estado}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
              {errors.proyectoId && <Text style={styles.errorText}>{errors.proyectoId}</Text>}
            </View>

            <Input
              label="Hora de Inicio (YYYY-MM-DDTHH:MM)"
              value={formData.horaInicio}
              onChangeText={(text) => setFormData({ ...formData, horaInicio: text })}
              placeholder="2026-02-03T09:00"
              error={errors.horaInicio}
            />

            <Input
              label="Hora de Fin (YYYY-MM-DDTHH:MM)"
              value={formData.horaFin}
              onChangeText={(text) => setFormData({ ...formData, horaFin: text })}
              placeholder="2026-02-03T12:00"
              error={errors.horaFin}
            />

            <Input
              label="Notas (opcional)"
              value={formData.notas}
              onChangeText={(text) => setFormData({ ...formData, notas: text })}
              multiline
              numberOfLines={3}
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
              <Button title="Crear" onPress={handleSubmit} loading={loading} />
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
  optionsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  optionButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    minWidth: 150,
  },
  optionButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  optionText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
    marginBottom: 2,
  },
  optionTextActive: {
    color: '#fff',
  },
  optionSubtext: {
    fontSize: 12,
    color: '#999',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
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
