import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { THEME } from '@/constants/theme';
import { calculateDQS } from '@/config/webhooks';

export default function DQSGate() {
  const router = useRouter();
  const params = useLocalSearchParams<{ formData?: string }>();
  
  const formData = params.formData ? JSON.parse(params.formData) : {};
  
  const [systems, setSystems] = useState<string[]>([]);
  const [integrations, setIntegrations] = useState('');
  const [constraints, setConstraints] = useState('');
  const [isCurrentData, setIsCurrentData] = useState(false);
  const [dqsScore, setDqsScore] = useState(0);

  useEffect(() => {
    const score = calculateDQS({
      ...formData,
      systems,
      integrations,
      constraints,
      isCurrentData
    });
    setDqsScore(score);
  }, [systems, integrations, constraints, isCurrentData]);

  const handleSubmit = async () => {
    if (!isCurrentData) {
      Alert.alert('⚠️ Confirmación requerida', 'Debes confirmar que los datos son actuales.');
      return;
    }

    if (dqsScore < 70) {
      Alert.alert(
        '🔴 Validación de Datos Necesaria',
        'Agendemos call 15min (gratis) para garantizar precisión del análisis.',
        [
          { 
            text: 'Reservar Call Ahora', 
            onPress: async () => {
              try {
                await fetch('https://n8n.nextgenpm.es/webhook/dqs-low', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ ...formData, dqsScore, systems, integrations, constraints })
                });
              } catch (error) {
                console.error('Error sending to webhook:', error);
              }
              router.push('/(tabs)/result');
            }
          },
          { text: 'Cancelar', style: 'cancel' }
        ]
      );
      return;
    }

    router.push({
      pathname: '/(tabs)/processing',
      params: {
        plan: 'pro',
        formData: JSON.stringify({
          ...formData,
          prepInfo: { systems, integrations, constraints },
          dqsScore
        })
      }
    });
  };

  const SYSTEMS_OPTIONS = [
    'CRM (HubSpot, Salesforce, Pipedrive)',
    'Email (Gmail, Outlook)',
    'Project Management (Asana, Monday, Jira)',
    'Reporting (Google Analytics, Tableau)',
    'Accounting (Sage, Xero)',
    'Inventory (SAP, Odoo)',
    'Otros'
  ];

  const INTEGRATIONS_OPTIONS = [
    'Sí, la mayoría se integran',
    'Parcialmente (algunos sí, otros no)',
    'No, todo es manual'
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <Text style={styles.title}>
          Validemos tu información
        </Text>
        
        <Text style={styles.subtitle}>
          Para garantizar análisis 100% preciso, necesitamos validar 4 datos técnicos adicionales. <Text style={styles.bold}>2 minutos máximo.</Text>
        </Text>

        {/* Campo 1: Sistemas */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>
            ¿Qué sistemas usas actualmente?
          </Text>
          <Text style={styles.fieldHint}>
            Selecciona todos los que apliquen:
          </Text>
          {SYSTEMS_OPTIONS.map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.checkboxRow}
              onPress={() => {
                setSystems(prev => 
                  prev.includes(item) 
                    ? prev.filter(s => s !== item)
                    : [...prev, item]
                );
              }}
            >
              <View style={[
                styles.checkbox,
                {
                  borderColor: systems.includes(item) ? THEME.colors.primary : '#D1D5DB',
                  backgroundColor: systems.includes(item) ? THEME.colors.primary : 'transparent',
                }
              ]}>
                {systems.includes(item) && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>
              <Text style={styles.checkboxLabel}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Campo 2: Integraciones */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>
            ¿Tus sistemas hablan entre sí?
          </Text>
          <Text style={styles.fieldHint}>
            ¿Se sincronizan datos automáticamente entre herramientas?
          </Text>
          {INTEGRATIONS_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.radioRow}
              onPress={() => setIntegrations(option)}
            >
              <View style={[
                styles.radio,
                {
                  borderColor: integrations === option ? THEME.colors.primary : '#D1D5DB',
                }
              ]}>
                {integrations === option && (
                  <View style={[
                    styles.radioDot,
                    { backgroundColor: THEME.colors.primary }
                  ]} />
                )}
              </View>
              <Text style={styles.radioLabel}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Campo 3: Restricciones */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>
            ¿Hay restricciones técnicas que conoces?
          </Text>
          <Text style={styles.fieldHint}>
            APIs limitadas, datos en silos, limitaciones DB, etc.
          </Text>
          <TextInput
            style={styles.textInput}
            multiline
            numberOfLines={4}
            placeholder="Ej: Salesforce solo permite 500 API calls/dia"
            placeholderTextColor={THEME.colors.mediumGray}
            value={constraints}
            onChangeText={setConstraints}
          />
        </View>

        {/* Campo 4: Confirmación */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>
            ¿Esta información es de HOY?
          </Text>
          <Text style={styles.fieldHint}>
            Confirmamos que datos están actualizados (últimas 24h)
          </Text>
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setIsCurrentData(!isCurrentData)}
          >
            <View style={[
              styles.checkbox,
              {
                borderColor: isCurrentData ? THEME.colors.primary : '#D1D5DB',
                backgroundColor: isCurrentData ? THEME.colors.primary : 'transparent',
              }
            ]}>
              {isCurrentData && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </View>
            <Text style={styles.checkboxLabel}>
              Sí, esta información es de hoy (última 24h)
            </Text>
          </TouchableOpacity>
        </View>

        {/* DQS Indicator */}
        <View style={[
          styles.dqsIndicator,
          {
            backgroundColor: dqsScore >= 70 
              ? THEME.colors.success 
              : dqsScore >= 60 
              ? THEME.colors.warning 
              : THEME.colors.error
          }
        ]}>
          <Text style={styles.dqsTitle}>
            Calidad de datos: {dqsScore}%
          </Text>
          <Text style={styles.dqsMessage}>
            {dqsScore >= 70 
              ? '✅ Excelente. Tu diagnóstico será preciso 92%.' 
              : dqsScore >= 60 
              ? '⚠️ Necesitamos aclarar 2-3 datos en call.' 
              : '🔴 Datos incompletos. Call 15min gratis para validar.'}
          </Text>
        </View>

        {/* Botón Submit */}
        <TouchableOpacity
          style={[
            styles.submitButton,
            {
              backgroundColor: isCurrentData ? THEME.colors.gold : '#6B7280',
              opacity: isCurrentData ? 1 : 0.6,
            }
          ]}
          onPress={handleSubmit}
          disabled={!isCurrentData}
        >
          <Text style={styles.submitButtonText}>
            {dqsScore >= 70 ? '✨ Generar Análisis Ahora' : '📞 Agendar Call 15min (Gratis)'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.disclaimer}>
          Este paso garantiza precisión 92% en el diagnóstico
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
  },
  subtitle: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: THEME.typography.body.fontSize,
    color: THEME.colors.mediumGray,
    marginBottom: THEME.spacing.xl,
    lineHeight: THEME.typography.body.lineHeight as any,
  },
  bold: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontWeight: '600' as any,
  },
  fieldContainer: {
    marginBottom: THEME.spacing.lg,
  },
  fieldLabel: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 16,
    fontWeight: '600' as any,
    color: THEME.colors.darkGray,
    marginBottom: THEME.spacing.xs,
  },
  fieldHint: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 14,
    color: THEME.colors.mediumGray,
    marginBottom: THEME.spacing.sm,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: THEME.borderRadius.sm,
    borderWidth: 2,
    marginRight: THEME.spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    marginRight: THEME.spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  checkmark: {
    color: THEME.colors.white,
    fontSize: 16,
  },
  checkboxLabel: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 14,
    color: THEME.colors.darkGray,
    flex: 1,
  },
  radioLabel: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 14,
    color: THEME.colors.darkGray,
    flex: 1,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: THEME.borderRadius.sm,
    padding: THEME.spacing.sm,
    minHeight: 100,
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 14,
    color: THEME.colors.darkGray,
    textAlignVertical: 'top',
  },
  dqsIndicator: {
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.lg,
    marginBottom: THEME.spacing.xl,
  },
  dqsTitle: {
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 18,
    fontWeight: '600' as any,
    color: THEME.colors.white,
    marginBottom: THEME.spacing.xs,
  },
  dqsMessage: {
    fontFamily: THEME.typography.body.fontFamily,
    fontSize: 14,
    color: THEME.colors.white,
    lineHeight: 20,
  },
  submitButton: {
    paddingVertical: 16,
    borderRadius: THEME.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: THEME.spacing.md,
    ...THEME.shadows.soft,
  },
  submitButtonText: {
    textAlign: 'center',
    color: THEME.colors.white,
    fontFamily: THEME.typography.bodyBold.fontFamily,
    fontSize: 16,
    fontWeight: '600' as any,
  },
  disclaimer: {
    fontFamily: THEME.typography.caption.fontFamily,
    fontSize: 12,
    color: THEME.colors.mediumGray,
    textAlign: 'center',
  },
});
