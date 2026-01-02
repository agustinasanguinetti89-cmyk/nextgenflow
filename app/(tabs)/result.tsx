import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { THEME } from '@/constants/theme';

export default function ResultScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const paymentInfo = params.payment_info ? JSON.parse(params.payment_info as string) : null;

  const handleDownload = () => {
    if (params.pdfUrl) {
      Linking.openURL(params.pdfUrl as string);
    } else {
      Alert.alert('Info', 'El PDF se está generando y se enviará a tu email.');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>¡Resultado Listo!</Text>
      
      <View style={styles.card}>
        <Text style={styles.scoreLabel}>DQS Score</Text>
        <Text style={styles.scoreValue}>{params.dqs_score || '85'}/100</Text>
        
        {params.type === 'mini' && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Impacto estimado:</Text>
            <Text style={styles.infoValue}>€{params.miniimpactroi || '1.200'}/año</Text>
          </View>
        )}

        {params.type === 'pro' && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Precisión Prometida:</Text>
            <Text style={styles.infoValue}>{params.accuracy_promised || '92'}%</Text>
          </View>
        )}
      </View>

      {paymentInfo && (
        <View style={styles.paymentCard}>
          <Text style={styles.paymentTitle}>Pendiente de Pago</Text>
          <Text style={styles.paymentText}>Por favor, realiza la transferencia para confirmar:</Text>
          <View style={styles.bankDetails}>
            <Text style={styles.bankLabel}>IBAN:</Text>
            <Text style={styles.bankValue}>{paymentInfo.iban}</Text>
            <Text style={styles.bankLabel}>Concepto:</Text>
            <Text style={styles.bankValue}>NEXTGENFLOW-{params.type?.toString().toUpperCase()}</Text>
            <Text style={styles.bankLabel}>Importe:</Text>
            <Text style={styles.bankValue}>€{params.comboprice || params.formacionPrice}</Text>
          </View>
        </View>
      )}

      <View style={styles.actions}>
        <TouchableOpacity style={styles.primaryButton} onPress={handleDownload}>
          <Text style={styles.buttonText}>DESCARGAR PDF</Text>
        </TouchableOpacity>

        {params.type === 'mini' && (
          <TouchableOpacity 
            style={styles.secondaryButton} 
            onPress={() => router.push('/pro')}
          >
            <Text style={styles.buttonText}>UPGRADE A PRO (€297)</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity 
          style={styles.outlineButton} 
          onPress={() => router.push('/')}
        >
          <Text style={styles.outlineButtonText}>VOLVER AL INICIO</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.colors.white },
  content: { padding: 24, paddingTop: 60 },
  title: { fontFamily: 'Montserrat-Bold', fontSize: 32, color: THEME.colors.primary, textAlign: 'center', marginBottom: 32 },
  card: {
    backgroundColor: THEME.colors.lavender,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: THEME.colors.primary
  },
  scoreLabel: { fontFamily: 'Inter-Regular', fontSize: 16, color: THEME.colors.mediumGray },
  scoreValue: { fontFamily: 'Montserrat-Bold', fontSize: 48, color: THEME.colors.secondary },
  infoRow: { flexDirection: 'row', marginTop: 16, gap: 8 },
  infoLabel: { fontFamily: 'Inter-SemiBold', fontSize: 16, color: THEME.colors.darkGray },
  infoValue: { fontFamily: 'Inter-Bold', fontSize: 16, color: THEME.colors.primary },
  paymentCard: {
    backgroundColor: '#FFFBEB',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F59E0B',
    marginBottom: 24
  },
  paymentTitle: { fontFamily: 'Montserrat-Bold', fontSize: 18, color: '#92400E', marginBottom: 8 },
  paymentText: { fontFamily: 'Inter-Regular', fontSize: 14, color: '#92400E', marginBottom: 16 },
  bankDetails: { gap: 4 },
  bankLabel: { fontFamily: 'Inter-SemiBold', fontSize: 12, color: '#92400E' },
  bankValue: { fontFamily: 'Inter-Bold', fontSize: 14, color: THEME.colors.primary, marginBottom: 8 },
  actions: { gap: 12 },
  primaryButton: {
    backgroundColor: THEME.colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center'
  },
  secondaryButton: {
    backgroundColor: THEME.colors.secondary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center'
  },
  outlineButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: THEME.colors.mediumGray
  },
  buttonText: { color: '#fff', fontFamily: 'Montserrat-Bold', fontSize: 16 },
  outlineButtonText: { color: THEME.colors.mediumGray, fontFamily: 'Montserrat-Bold', fontSize: 16 }
});
