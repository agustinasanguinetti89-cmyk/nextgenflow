import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { THEME } from '@/constants/theme';

export const InputField = ({ label, placeholder, value, onChangeText, secureTextEntry = false }) => (
  <View style={styles.inputContainer}>
    <Text style={[THEME.typography.body, { color: THEME.colors.dark, marginBottom: THEME.spacing.sm }]}>
      {label}
    </Text>
    <View style={styles.inputWrapper}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={THEME.colors.gray}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: THEME.spacing.lg,
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: THEME.colors.primary,
    borderRadius: THEME.borderRadius.base,
    paddingHorizontal: THEME.spacing.md,
    paddingVertical: THEME.spacing.sm,
    backgroundColor: THEME.colors.white,
  },
  input: {
    fontSize: 16,
    color: THEME.colors.text,
    fontFamily: 'Inter',
  },
});
