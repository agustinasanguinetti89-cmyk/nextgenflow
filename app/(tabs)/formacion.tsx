import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { THEME } from '@/constants/theme';
import { sendToNextGenWebhook, BANK_INFO } from '@/config/webhooks';
import { useRouter } from 'expo-router';

export default function Formacion() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    clientname: '',
    companyname: '',
    email: '',
    topics: '',
  });
  const router = useRouter();

  const handleSubmit = async () => {
    if (!formData.clientname || !formData.email || !formData.topics) {
      Alert.alert('Error', 'Por favor, rellena los campos obligatorios');
      return;
    }

    setLoading(true);
    try {
      const result = await sendToNextGenWebhook({
        templateType: 'formacion',
        ...formData,
        formacionPrice: 400,
        formacionDuracion: '2 semanas',
      });
      
      router.push({
        pathname: '/result',
        params: { ...result, type: 'formacion', payment_info: JSON.stringify(BANK_INFO) }
      });
    } catch (error) {
      Alert.alert('Error', 'Error al procesar la reserva de formación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Formación</Text>
      <Text style={styles.subtitle}>Autonomía del equipo (2 semanas) (€400)</Text>

      <View style={styles.form}>
        <TextInput 
          style={styles.input} 
          placeholder="Nombre completo"
          value={formData.clientname}
          onChangeText={(text) => setFormData({...formData, clientname: text})}
        />
        <TextInput 
          style={styles.input} 
          placeholder="Empresa"
          value={formData.companyname}
          onChangeText={(text) => setFormData({...formData, companyname: text})}
        />
        <TextInput 
          style={styles.input} 
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={formData.email}
          onChangeText={(text) => setFormData({...formData, email: text})}
        />
        <TextInput 
          style={[styles.input, styles.textArea]} 
          placeholder="Temas a cubrir (ej: Automatización, IA)"
          multiline
          numberOfLines={4}
          value={formData.topics}
          onChangeText={(text) => setFormData({...formData, topics: text})}
        />

        <TouchableOpacity 
          style={styles.button} 
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>RESERVAR FORMACIÓN (€400)</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.colors.white },
  content: { padding: 24, paddingTop: 60 },
  title: { fontFamily: 'Montserrat-Bold', fontSize: 28, color: THEME.colors.primary, marginBottom: 8 },
  subtitle: { fontFamily: 'Inter-Regular', fontSize: 16, color: THEME.colors.mediumGray, marginBottom: 32 },
  form: { gap: 16 },
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
  },
  buttonText: { color: '#fff', fontFamily: 'Montserrat-Bold', fontSize: 16 }
});
