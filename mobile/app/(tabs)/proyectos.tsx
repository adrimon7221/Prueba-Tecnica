import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { ProyectoCard } from '@/components/proyectos/ProyectoCard';
import { ProyectoForm } from '@/components/proyectos/ProyectoForm';
import { useProyectos } from '@/hooks/useProyectos';
import { Proyecto } from '@/types';

export default function ProyectosScreen() {
  const {
    proyectos,
    loading,
    error,
    page,
    totalPages,
    fetchProyectos,
    createProyecto,
    updateProyecto,
    deleteProyecto,
  } = useProyectos();

  const [showForm, setShowForm] = useState(false);
  const [selectedProyecto, setSelectedProyecto] = useState<Proyecto | undefined>();

  const handleCreate = () => {
    setSelectedProyecto(undefined);
    setShowForm(true);
  };

  const handleEdit = (proyecto: Proyecto) => {
    setSelectedProyecto(proyecto);
    setShowForm(true);
  };

  const handleSubmit = async (data: any) => {
    if (selectedProyecto) {
      await updateProyecto(selectedProyecto.id, data);
    } else {
      await createProyecto(data);
    }
  };

  const handleDelete = async (id: number) => {
    await deleteProyecto(id);
  };

  const handleLoadMore = () => {
    if (page < totalPages && !loading) {
      fetchProyectos(page + 1);
    }
  };

  if (loading && proyectos.length === 0) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Proyectos</Text>
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
        data={proyectos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProyectoCard
            proyecto={item}
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
            <Text style={styles.emptyText}>No hay proyectos registrados</Text>
          </View>
        }
      />

      <ProyectoForm
        visible={showForm}
        proyecto={selectedProyecto}
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
