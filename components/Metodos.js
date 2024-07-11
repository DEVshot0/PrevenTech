import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Dimensions, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const { width: windowWidth } = Dimensions.get('window');

export default function Metodos({ navigation }) {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [cardType, setCardType] = useState(null);
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [boletoEmail, setBoletoEmail] = useState('');
  const [pixKey, setPixKey] = useState('');

  const renderMethodForm = () => {
    switch (selectedMethod) {
      case 'creditCard':
        return (
          <View style={styles.formContainer}>
            <Text style={styles.label}>Tipo do Cartão</Text>
            <View style={styles.cardTypeContainer}>
              <TouchableOpacity
                style={[styles.cardTypeButton, cardType === 'visa' && styles.selectedCardType]}
                onPress={() => setCardType('visa')}
              >
                <FontAwesome name="cc-visa" size={24} color="#faffd6" />
                <Text style={styles.cardTypeText}>Visa</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.cardTypeButton, cardType === 'mastercard' && styles.selectedCardType]}
                onPress={() => setCardType('mastercard')}
              >
                <FontAwesome name="cc-mastercard" size={24} color="#faffd6" />
                <Text style={styles.cardTypeText}>MasterCard</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.cardTypeButton, cardType === 'amex' && styles.selectedCardType]}
                onPress={() => setCardType('amex')}
              >
                <FontAwesome name="cc-amex" size={24} color="#faffd6" />
                <Text style={styles.cardTypeText}>Amex</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Número do Cartão"
              placeholderTextColor="#ccc"
              value={cardNumber}
              onChangeText={setCardNumber}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Nome no Cartão"
              placeholderTextColor="#ccc"
              value={cardName}
              onChangeText={setCardName}
            />
            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="Validade (MM/AA)"
                placeholderTextColor="#ccc"
                value={expiryDate}
                onChangeText={setExpiryDate}
                keyboardType="numeric"
              />
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="CVV"
                placeholderTextColor="#ccc"
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
              style={styles.input}
              placeholder="Email para Envio do Boleto"
              placeholderTextColor="#ccc"
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
              style={styles.input}
              placeholder="Chave Pix (Email, CPF, ou Telefone)"
              placeholderTextColor="#ccc"
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
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={24} color="#faffd6" />
        </TouchableOpacity>
        <Text style={styles.title}>Métodos de Pagamento</Text>
      </View>
      <ScrollView contentContainerStyle={styles.methodsContainer}>
        <TouchableOpacity
          style={[styles.method, selectedMethod === 'creditCard' && styles.selectedMethod]}
          onPress={() => setSelectedMethod('creditCard')}
        >
          <FontAwesome name="credit-card" size={24} color="#faffd6" />
          <Text style={styles.methodText}>Cartão de Crédito</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.method, selectedMethod === 'boleto' && styles.selectedMethod]}
          onPress={() => setSelectedMethod('boleto')}
        >
          <FontAwesome name="barcode" size={24} color="#faffd6" />
          <Text style={styles.methodText}>Boleto</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.method, selectedMethod === 'pix' && styles.selectedMethod]}
          onPress={() => setSelectedMethod('pix')}
        >
          <FontAwesome name="money" size={24} color="#faffd6" />
          <Text style={styles.methodText}>Pix</Text>
        </TouchableOpacity>
      </ScrollView>
      {renderMethodForm()}
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#091015',
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
    color: '#faffd6',
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
    backgroundColor: '#4682B4',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: windowWidth * 0.9,
  },
  selectedMethod: {
    borderWidth: 2,
    borderColor: '#faffd6',
  },
  methodText: {
    color: '#faffd6',
    fontSize: 18,
    marginLeft: 10,
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  input: {
    backgroundColor: '#1e2a35',
    color: '#faffd6',
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
    color: '#faffd6',
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
    backgroundColor: '#4682B4',
    borderRadius: 5,
  },
  selectedCardType: {
    borderWidth: 2,
    borderColor: '#faffd6',
  },
  cardTypeText: {
    color: '#faffd6',
    marginLeft: 5,
  },
});
