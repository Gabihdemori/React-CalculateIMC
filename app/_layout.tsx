import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: "#ecf0f1",
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  text: {
    fontSize: 20,
    color: "#ecf0f1",
    textAlign: "center",
    marginTop: 20,
    lineHeight: 30,
  },
  input: {
    width: "90%",
    borderColor: "#34495e",
    borderWidth: 1,
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#34495e",
    color: "#ecf0f1",
    marginBottom: 15,
    fontSize: 18,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: "#ecf0f1",
    marginBottom: 5,
    alignSelf: "flex-start",
    marginLeft: "5%",
  },
  buttonContainer: {
    width: "90%",
    marginTop: 10,
  },
});

export default function Index() {
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const [resultado, setResultado] = useState("");

  const calcularImc = () => {
    const alturaValue = parseFloat(altura.replace(',', '.'));
    const pesoValue = parseFloat(peso.replace(',', '.'));

    if (isNaN(alturaValue) || isNaN(pesoValue) || alturaValue <= 0 || pesoValue <= 0) {
      setResultado("Por favor, preencha todos os campos corretamente com valores válidos e maiores que zero.");
      return;
    }

    const imc = (pesoValue / (alturaValue * alturaValue));
    const imcArredondado = imc.toFixed(2);
    let mensagem;

    if (imc < 18.5) {
      mensagem = "Abaixo do peso";
    } else if (imc >= 18.5 && imc < 24.9) {
      mensagem = "Peso normal";
    } else if (imc >= 25 && imc < 29.9) {
      mensagem = "Sobrepeso";
    } else if (imc >= 30 && imc < 34.9) {
      mensagem = "Obesidade grau 1";
    } else if (imc >= 35 && imc < 39.9) {
      mensagem = "Obesidade grau 2";
    } else {
      mensagem = "Obesidade grau 3";
    }
    
    setResultado(
      `Seu IMC é: ${imcArredondado}\n` +
      `Classificação: ${mensagem}`
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora de IMC</Text>
      
      <Text style={styles.label}>Digite sua altura (metros):</Text>
      <TextInput
        placeholder="Ex: 1.75"
        placeholderTextColor="#95a5a6"
        value={altura}
        onChangeText={setAltura}
        keyboardType="numeric"
        style={styles.input}
      />
      
      <Text style={styles.label}>Digite seu peso (kg):</Text>
      <TextInput
        placeholder="Ex: 70"
        placeholderTextColor="#95a5a6"
        value={peso}
        onChangeText={setPeso}
        keyboardType="numeric"
        style={styles.input}
      />
      
      <View style={styles.buttonContainer}>
        <Button
          title="Calcular IMC"
          onPress={calcularImc}
          color="#3498db"
        />
      </View>
      
      {resultado ? (
        <View style={{ marginTop: 20 }}>
          <Text style={styles.text}>{resultado}</Text>
        </View>
      ) : null}
    </View>
  );
}