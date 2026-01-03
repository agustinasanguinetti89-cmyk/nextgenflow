import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { THEME } from '@/constants/theme';
import { sendToNextGenWebhook } from '@/config/webhooks';
import { useRouter } from 'expo-router';

export default function MiniNextGenFlow() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    clientname: '',
    companyname: '',
    email: '',
    miniprocessname: '',
    processfreq: '',
  });
  const router = useRouter();

  const handleSubmit = async () => {
    if (!formData.clientname || !formData.companyname || !formData.email || !formData.miniprocessname || !formData.processfreq) {
      Alert.alert('Error', 'Por favor, rellena todos los campos obligatorios');
      return;
    }

    setLoading(true);
    try {
      const result = await sendToNextGenWebhook({
        templateType: 'mini',
        ...formData,
        dqsscore: 85, // Simulado para el flujo mini
      });
      
      router.push({
        pathname: '/result',
        params: { ...result, type: 'mini' }
      });
    } catch (error) {
      Alert.alert('Error', 'Error al procesar el diagnóstico');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Mini Diagnóstico</Text>
      <Text style={styles.subtitle}>Analiza tu proceso de forma gratuita</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Nombre completo *</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Tu nombre"
          value={formData.clientname}
          onChangeText={(text) => setFormData({...formData, clientname: text})}
        />

        <Text style={styles.label}>Empresa *</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Nombre de tu empresa"
          value={formData.companyname}
          onChangeText={(text) => setFormData({...formData, companyname: text})}
        />

        <Text style={styles.label}>Email *</Text>
        <TextInput 
          style={styles.input} 
          placeholder="tu@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={formData.email}
          onChangeText={(text) => setFormData({...formData, email: text})}
        />

        <Text style={styles.label}>Proceso manual actual *</Text>
        <TextInput 
          style={[styles.input, styles.textArea]} 
          placeholder="Describe el proceso..."
          multiline
          numberOfLines={4}
          value={formData.miniprocessname}
          onChangeText={(text) => setFormData({...formData, miniprocessname: text})}
        />

        <Text style={styles.label}>Horas/semana (1-60) *</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Ej: 15"
          keyboardType="numeric"
          value={formData.processfreq}
          onChangeText={(text) => setFormData({...formData, processfreq: text})}
        />

        <TouchableOpacity 
          style={styles.button} 
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>GENERAR DIAGNÓSTICO MINI (GRATIS)</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.colors.white },
  content: { padding: 24, paddingTop: 60 },
  title: { 
    fontFamily: 'Montserrat-Bold', 
    fontSize: 28, 
    color: THEME.colors.primary,
    marginBottom: 8 
  },
  subtitle: { 
    fontFamily: 'Inter-Regular', 
    fontSize: 16, 
    color: THEME.colors.mediumGray,
    marginBottom: 32 
  },
  form: { gap: 16 },
  label: { 
    fontFamily: 'Inter-SemiBold', 
    fontSize: 14, 
    color: THEME.colors.darkGray,
    marginBottom: 4
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    backgroundColor: THEME.colors.lavender
  },
  textArea: { height: 100, textAlignVertical: 'top' },
  button: {
    backgroundColor: THEME.colors.secondary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    shadowColor: THEME.colors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Montserrat-Bold',
    fontSize: 16
  }
});
