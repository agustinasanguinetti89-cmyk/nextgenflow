import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { THEME } from '@/constants/theme';
import { sendToNextGenWebhook } from '@/config/webhooks';
import { useRouter } from 'expo-router';

export default function ProDiagnosis() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    clientname: '',
    companyname: '',
    email: '',
    processes: [
      { name: '', hours: '', stack: '' },
      { name: '', hours: '', stack: '' },
      { name: '', hours: '', stack: '' },
      { name: '', hours: '', stack: '' },
      { name: '', hours: '', stack: '' },
    ],
    budget: '',
  });
  const router = useRouter();

  const updateProcess = (index: number, field: string, value: string) => {
    const newProcesses = [...formData.processes];
    newProcesses[index] = { ...newProcesses[index], [field]: value };
    setFormData({ ...formData, processes: newProcesses });
  };

  const handleSubmit = async () => {
    if (!formData.clientname || !formData.companyname || !formData.email) {
      Alert.alert('Error', 'Por favor, rellena los datos básicos');
      return;
    }

    setLoading(true);
    try {
      const result = await sendToNextGenWebhook({
        templateType: 'pro',
        ...formData,
        dqsscore: 92,
        accuracypromised: 92
      });
      
      Alert.alert(
        'Pago Requerido',
        'Serás redirigido a Stripe para completar el pago de €297',
        [
          { text: 'Continuar', onPress: () => router.push({ pathname: '/result', params: { ...result, type: 'pro' } }) }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Error al procesar el diagnóstico Pro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Diagnóstico PRO</Text>
      <Text style={styles.subtitle}>Análisis profundo de 5 procesos (€297)</Text>

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

        <Text style={styles.sectionTitle}>Define tus 5 procesos</Text>
        {formData.processes.map((process, index) => (
          <View key={index} style={styles.processCard}>
            <Text style={styles.processNumber}>Proceso {index + 1}</Text>
            <TextInput 
              style={styles.inputSmall} 
              placeholder="Nombre del proceso"
              value={process.name}
              onChangeText={(text) => updateProcess(index, 'name', text)}
            />
            <View style={styles.row}>
              <TextInput 
                style={[styles.inputSmall, { flex: 1, marginRight: 8 }]} 
                placeholder="Horas/mes"
                keyboardType="numeric"
                value={process.hours}
                onChangeText={(text) => updateProcess(index, 'hours', text)}
              />
              <TextInput 
                style={[styles.inputSmall, { flex: 2 }]} 
                placeholder="Stack actual (ej: Excel)"
                value={process.stack}
                onChangeText={(text) => updateProcess(index, 'stack', text)}
              />
            </View>
          </View>
        ))}

        <TextInput 
          style={styles.input} 
          placeholder="Presupuesto actual (opcional)"
          keyboardType="numeric"
          value={formData.budget}
          onChangeText={(text) => setFormData({...formData, budget: text})}
        />

        <TouchableOpacity 
          style={styles.button} 
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>ANALIZAR 5 PROCESOS (€297)</Text>
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
  form: { gap: 12 },
  sectionTitle: { fontFamily: 'Montserrat-SemiBold', fontSize: 18, color: THEME.colors.primary, marginTop: 16, marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    backgroundColor: THEME.colors.lavender
  },
  inputSmall: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 6,
    padding: 8,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    backgroundColor: '#fff',
    marginBottom: 8
  },
  processCard: {
    backgroundColor: THEME.colors.lavender,
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB'
  },
  processNumber: { fontFamily: 'Inter-SemiBold', fontSize: 12, color: THEME.colors.secondary, marginBottom: 4 },
  row: { flexDirection: 'row' },
  button: {
    backgroundColor: THEME.colors.gold,
    padding: 18,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
    shadowColor: THEME.colors.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5
  },
  buttonText: { color: '#fff', fontFamily: 'Montserrat-Bold', fontSize: 16 }
});
