import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { THEME } from '@/constants/theme';
import { sendToWebhook, N8N_WEBHOOKS } from '@/config/webhooks';

export default function PaymentScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ formData?: string }>();
  
  const formData = params.formData ? JSON.parse(params.formData) : {};
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      // Simular procesamiento de pago Stripe
      // En producción, esto sería integración real con Stripe
      Alert.alert(
        '💳 Pago Simulado',
        'En producción, aquí se abre Stripe Checkout.\n\nProcediendo a DQS Gate...',
        [
          {
            text: 'Continuar',
            onPress: async () => {
              try {
                // Enviar confirmación de pago al webhook
                await sendToWebhook(
                  N8N_WEBHOOKS.stripeConfirmation,
                  {
                    ...formData,
                    paymentStatus: 'completed',
                    amount: 29700, // 297€ en céntimos
                    currency: 'EUR',
                  },
                  'pro'
                );
              } catch (error) {
                console.error('Error sending payment confirmation:', error);
              }

              // Redirigir a DQS Gate
              router.push({
                pathname: '/(tabs)/dqs-gate',
                params: { formData: JSON.stringify(formData) }
              });
            }
          }
        ]
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <Text style={styles.title}>
          Confirmación de Pago
        </Text>
        
        <Text style={styles.subtitle}>
          Plan Pro - Análisis Completo
        </Text>

        {/* Resumen de Pago */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Empresa:</Text>
            <Text style={styles.summaryValue}>{formData.empresa}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Rol:</Text>
            <Text style={styles.summaryValue}>{formData.rol}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Horas/Semana:</Text>
            <Text style={styles.summaryValue}>{formData.horas}h</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Precio Plan Pro:</Text>
            <Text style={styles.priceValue}>297€</Text>
          </View>
        </View>

        {/* Características del Plan Pro */}
        <View style={styles.featuresCard}>
          <Text style={styles.featuresTitle}>Incluye:</Text>
          
          <View style={styles.featureItem}>
            <Text style={styles.featureBullet}>✓</Text>
            <Text style={styles.featureText}>Análisis de 5 procesos críticos</Text>
          </View>
          
          <View style={styles.featureItem}>
            <Text style={styles.featureBullet}>✓</Text>
            <Text style={styles.featureText}>Validación de datos con DQS</Text>
          </View>
          
          <View style={styles.featureItem}>
            <Text style={styles.featureBullet}>✓</Text>
            <Text style={styles.featureText}>Informe PDF completo</Text>
          </View>
          
          <View style={styles.featureItem}>
            <Text style={styles.featureBullet}>✓</Text>
            <Text style={styles.featureText}>Envío por email</Text>
          </View>
          
          <View style={styles.featureItem}>
            <Text style={styles.featureBullet}>✓</Text>
            <Text style={styles.featureText}>Llamada de seguimiento (15min)</Text>
          </View>
        </View>

        {/* Info de Seguridad */}
        <View style={styles.securityInfo}>
          <Text style={styles.securityText}>
            🔒 Pago seguro procesado por Stripe
          </Text>
          <Text style={styles.securitySubtext}>
            Tus datos de pago están protegidos con encriptación de nivel bancario
          </Text>
        </View>

        {/* Botón de Pago */}
        <TouchableOpacity
          style={[
            styles.paymentButton,
            isProcessing && styles.paymentButtonDisabled
          ]}
          onPress={handlePayment}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <ActivityIndicator color={THEME.colors.white} />
          ) : (
            <Text style={styles.paymentButtonText}>
              💳 Pagar 297€
            </Text>
          )}
        </TouchableOpacity>

        {/* Botón de Cancelar */}
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => router.back()}
          disabled={isProcessing}
        >
          <Text style={styles.cancelButtonText}>
            Volver
          </Text>
        </TouchableOpacity>

        {/* Política de Reembolso */}
        <Text style={styles.refundPolicy}>
          Garantía de satisfacción: 30 días de reembolso completo si no estás satisfecho
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.lavender,
  },
  scrollContent: {
    padding: THEME.spacing.lg,
    paddingBottom: THEME.spacing.xl,
  },
  title: {
    fontFamily: THEME.typography.title.fontFamily,
    fontSize: THEME.typography.title.fontSize,
    fontWeight: '700' as any,
    color: THEME.colors.primary,
    marginBottom: THEME.spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: THEME.typography.subtitle.fontFamily,
    fontSize: THEME.typography.subtitle.fontSize,
    fontWeight: '600' as any,
    color: THEME.colors.secondary,
    marginBottom: THEME.spacing.xl,
    textAlign: 'center',
  },
  summaryCard: {
    backgroundColor: THEME.colors.white,
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.lg,
    marginBottom: THEME.spacing.lg,
    ...THEME.shadows.soft,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: THEME.spacing.sm,
  },
  summaryLabel: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 14,
    color: THEME.colors.mediumGray,
  },
  summaryValue: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 14,
    fontWeight: '600' as any,
    color: THEME.colors.darkGray,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: THEME.spacing.md,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 16,
    fontWeight: '600' as any,
    color: THEME.colors.darkGray,
  },
  priceValue: {
    fontFamily: THEME.typography.title.fontFamily,
    fontSize: 24,
    fontWeight: '700' as any,
    color: THEME.colors.gold,
  },
  featuresCard: {
    backgroundColor: THEME.colors.white,
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.lg,
    marginBottom: THEME.spacing.lg,
    ...THEME.shadows.soft,
  },
  featuresTitle: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 16,
    fontWeight: '600' as any,
    color: THEME.colors.darkGray,
    marginBottom: THEME.spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: THEME.spacing.md,
  },
  featureBullet: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 16,
    color: THEME.colors.success,
    marginRight: THEME.spacing.sm,
    marginTop: 2,
  },
  featureText: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 14,
    color: THEME.colors.darkGray,
    flex: 1,
    lineHeight: 20,
  },
  securityInfo: {
    backgroundColor: '#F0F9FF',
    borderRadius: THEME.borderRadius.md,
    padding: THEME.spacing.md,
    marginBottom: THEME.spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: THEME.colors.success,
  },
  securityText: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 14,
    fontWeight: '600' as any,
    color: THEME.colors.darkGray,
    marginBottom: THEME.spacing.xs,
  },
  securitySubtext: {
    fontFamily: THEME.typography.caption.fontFamily,
    fontSize: 12,
    color: THEME.colors.mediumGray,
  },
  paymentButton: {
    backgroundColor: THEME.colors.gold,
    paddingVertical: 16,
    borderRadius: THEME.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: THEME.spacing.md,
    ...THEME.shadows.soft,
  },
  paymentButtonDisabled: {
    opacity: 0.6,
  },
  paymentButtonText: {
    textAlign: 'center',
    color: THEME.colors.white,
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 16,
    fontWeight: '600' as any,
  },
  cancelButton: {
    paddingVertical: 12,
    borderRadius: THEME.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: THEME.colors.mediumGray,
    marginBottom: THEME.spacing.lg,
  },
  cancelButtonText: {
    textAlign: 'center',
    color: THEME.colors.mediumGray,
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 14,
    fontWeight: '600' as any,
  },
  refundPolicy: {
    fontFamily: THEME.typography.caption.fontFamily,
    fontSize: 12,
    color: THEME.colors.mediumGray,
    textAlign: 'center',
    lineHeight: 18,
  },
});
