import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { AsignacionCard } from '@/components/asignaciones/AsignacionCard';
import { AsignacionForm } from '@/components/asignaciones/AsignacionForm';
import { useAsignaciones } from '@/hooks/useAsignaciones';

export default function AsignacionesScreen() {
  const {
    asignaciones,
    loading,
    error,
    page,
    totalPages,
    fetchAsignaciones,
    createAsignacion,
    deleteAsignacion,
  } = useAsignaciones();

  const [showForm, setShowForm] = useState(false);

  const handleCreate = () => {
    setShowForm(true);
  };

  const handleSubmit = async (data: any) => {
    await createAsignacion(data);
  };

  const handleDelete = async (id: number) => {
    await deleteAsignacion(id);
  };

  const handleLoadMore = () => {
    if (page < totalPages && !loading) {
      fetchAsignaciones(page + 1);
    }
  };

  if (loading && asignaciones.length === 0) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Asignaciones</Text>
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
        data={asignaciones}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <AsignacionCard asignacion={item} onDelete={handleDelete} />
        )}
        contentContainerStyle={styles.list}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? <ActivityIndicator size="small" color="#007AFF" /> : null
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No hay asignaciones registradas</Text>
          </View>
        }
      />

      <AsignacionForm
        visible={showForm}
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
