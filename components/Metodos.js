import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Dimensions, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

const { width: windowWidth } = Dimensions.get('window');

const darkColors = {
  backgroundColor: '#091015',
  primaryColor: '#4682B4',
  textColor: '#faffd6',
  inputBackground: '#1e2a35',
  placeholderColor: '#ccc',
  selectedBorderColor: '#faffd6',
};

const lightColors = {
  backgroundColor: '#fdfff2',
  primaryColor: '#4682B4',
  textColor: '#091015',
  inputBackground: '#c2c2c2',
  placeholderColor: '#091015',
  selectedBorderColor: '#faffd6',
};

export default function Metodos({ navigation }) {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [cardType, setCardType] = useState(null);
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [boletoEmail, setBoletoEmail] = useState('');
  const [pixKey, setPixKey] = useState('');

  const { isDarkMode } = useTheme();
  const colors = isDarkMode ? darkColors : lightColors;

  const renderMethodForm = () => {
    switch (selectedMethod) {
      case 'creditCard':
        return (
          <View style={styles.formContainer}>
            <Text style={[styles.label, { color: colors.textColor }]}>Tipo do Cartão</Text>
            <View style={styles.cardTypeContainer}>
              <TouchableOpacity
                style={[styles.cardTypeButton, cardType === 'visa' && { borderColor: colors.selectedBorderColor, borderWidth: 2 }]}
                onPress={() => setCardType('visa')}
              >
                <FontAwesome name="cc-visa" size={24} color={colors.textColor} />
                <Text style={[styles.cardTypeText, { color: colors.textColor }]}>Visa</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.cardTypeButton, cardType === 'mastercard' && { borderColor: colors.selectedBorderColor, borderWidth: 2 }]}
                onPress={() => setCardType('mastercard')}
              >
                <FontAwesome name="cc-mastercard" size={24} color={colors.textColor} />
                <Text style={[styles.cardTypeText, { color: colors.textColor }]}>MasterCard</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.cardTypeButton, cardType === 'amex' && { borderColor: colors.selectedBorderColor, borderWidth: 2 }]}
                onPress={() => setCardType('amex')}
              >
                <FontAwesome name="cc-amex" size={24} color={colors.textColor} />
                <Text style={[styles.cardTypeText, { color: colors.textColor }]}>Amex</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.textColor }]}
              placeholder="Número do Cartão"
              placeholderTextColor={colors.placeholderColor}
              value={cardNumber}
              onChangeText={setCardNumber}
              keyboardType="numeric"
            />
            <TextInput
              style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.textColor }]}
              placeholder="Nome no Cartão"
              placeholderTextColor={colors.placeholderColor}
              value={cardName}
              onChangeText={setCardName}
            />
            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.halfInput, { backgroundColor: colors.inputBackground, color: colors.textColor }]}
                placeholder="Validade (MM/AA)"
                placeholderTextColor={colors.placeholderColor}
                value={expiryDate}
                onChangeText={setExpiryDate}
                keyboardType="numeric"
              />
              <TextInput
                style={[styles.input, styles.halfInput, { backgroundColor: colors.inputBackground, color: colors.textColor }]}
                placeholder="CVV"
                placeholderTextColor={colors.placeholderColor}
                value={cvv}
                onChangeText={setCvv}
                keyboardType="numeric"
                secureTextEntry
              />
            </View>
          </View>
        );
      case 'boleto':
        return (
          <View style={styles.formContainer}>
            <TextInput
              style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.textColor }]}
              placeholder="Email para Envio do Boleto"
              placeholderTextColor={colors.placeholderColor}
              value={boletoEmail}
              onChangeText={setBoletoEmail}
              keyboardType="email-address"
            />
          </View>
        );
      case 'pix':
        return (
          <View style={styles.formContainer}>
            <TextInput
              style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.textColor }]}
              placeholder="Chave Pix (Email, CPF, ou Telefone)"
              placeholderTextColor={colors.placeholderColor}
              value={pixKey}
              onChangeText={setPixKey}
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.backgroundColor }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={24} color={colors.textColor} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.textColor }]}>Métodos de Pagamento</Text>
      </View>
      <ScrollView contentContainerStyle={styles.methodsContainer}>
        <TouchableOpacity
          style={[styles.method, selectedMethod === 'creditCard' && { borderColor: colors.selectedBorderColor, borderWidth: 2 }]}
          onPress={() => setSelectedMethod('creditCard')}
        >
          <FontAwesome name="credit-card" size={24} color={colors.textColor} />
          <Text style={[styles.methodText, { color: colors.textColor }]}>Cartão de Crédito</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.method, selectedMethod === 'boleto' && { borderColor: colors.selectedBorderColor, borderWidth: 2 }]}
          onPress={() => setSelectedMethod('boleto')}
        >
          <FontAwesome name="barcode" size={24} color={colors.textColor} />
          <Text style={[styles.methodText, { color: colors.textColor }]}>Boleto</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.method, selectedMethod === 'pix' && { borderColor: colors.selectedBorderColor, borderWidth: 2 }]}
          onPress={() => setSelectedMethod('pix')}
        >
          <FontAwesome name="money" size={24} color={colors.textColor} />
          <Text style={[styles.methodText, { color: colors.textColor }]}>Pix</Text>
        </TouchableOpacity>
      </ScrollView>
      {renderMethodForm()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  methodsContainer: {
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  method: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: darkColors.primaryColor, // Replace this with colors.primaryColor
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: windowWidth * 0.9,
  },
  methodText: {
    fontSize: 18,
    marginLeft: 10,
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  input: {
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  cardTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  cardTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  selectedCardType: {
    borderWidth: 2,
  },
  cardTypeText: {
    marginLeft: 5,
  },
});
