import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { ConsultorCard } from '@/components/consultores/ConsultorCard';
import { ConsultorForm } from '@/components/consultores/ConsultorForm';
import { useConsultores } from '@/hooks/useConsultores';
import { Consultor } from '@/types';

export default function ConsultoresScreen() {
  const {
    consultores,
    loading,
    error,
    page,
    totalPages,
    fetchConsultores,
    createConsultor,
    updateConsultor,
    deleteConsultor,
  } = useConsultores();

  const [showForm, setShowForm] = useState(false);
  const [selectedConsultor, setSelectedConsultor] = useState<Consultor | undefined>();

  const handleCreate = () => {
    setSelectedConsultor(undefined);
    setShowForm(true);
  };

  const handleEdit = (consultor: Consultor) => {
    setSelectedConsultor(consultor);
    setShowForm(true);
  };

  const handleSubmit = async (data: any) => {
    if (selectedConsultor) {
      await updateConsultor(selectedConsultor.id, data);
    } else {
      await createConsultor(data);
    }
  };

  const handleDelete = async (id: number) => {
    await deleteConsultor(id);
  };

  const handleLoadMore = () => {
    if (page < totalPages && !loading) {
      fetchConsultores(page + 1);
    }
  };

  if (loading && consultores.length === 0) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Consultores</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleCreate}>
          <Text style={styles.addButtonText}>+ Agregar</Text>
        </TouchableOpacity>
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <FlatList
        data={consultores}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ConsultorCard
            consultor={item}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
        contentContainerStyle={styles.list}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? <ActivityIndicator size="small" color="#007AFF" /> : null
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No hay consultores registrados</Text>
          </View>
        }
      />

      <ConsultorForm
        visible={showForm}
        consultor={selectedConsultor}
        onSubmit={handleSubmit}
        onClose={() => setShowForm(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorContainer: {
    backgroundColor: '#FFE5E5',
    padding: 12,
    margin: 16,
    borderRadius: 8,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
  },
  list: {
    padding: 16,
  },
  empty: {
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});
