import React from 'react'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderBottom: 1,
    paddingBottom: 10,
  },
  headerSection: {
    width: '30%',
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
    fontWeight: 'bold',
  },
  formRow: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  label: {
    width: '15%',
  },
  input: {
    flex: 1,
    borderBottom: 1,
    marginLeft: 5,
  },
  checkbox: {
    width: 12,
    height: 12,
    border: 1,
    marginRight: 5,
  },
  signature: {
    marginTop: 50,
    alignItems: 'center',
  },
  signatureLine: {
    width: '60%',
    borderBottom: 1,
    marginBottom: 5,
  },
})

const PoliceMilitaryForm = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      

        <View style={styles.headerSection}>
          <Text>POLÍCIA MILITAR DA BAHIA</Text>
          <Text>CPR/L- 6ª CIPM</Text>
        </View>



      <Text style={styles.title}>
        REQUERIMENTO DE CARGA PESSOAL DE ARMA DE FOGO DA PMBA
      </Text>

      <View style={styles.formRow}>
        <Text style={styles.label}>Eu,</Text>
        <View style={styles.input} />
      </View>

      <View style={styles.formRow}>
        <Text style={styles.label}>GH.:</Text>
        <View style={styles.input} />
      </View>

      <View style={styles.formRow}>
        <Text style={styles.label}>MAT:</Text>
        <View style={styles.input} />
      </View>

      <View style={styles.formRow}>
        <Text style={styles.label}>CPF:</Text>
        <View style={styles.input} />
      </View>

      <View style={styles.formRow}>
        <Text style={styles.label}>RG:</Text>
        <View style={styles.input} />
      </View>

      <View style={styles.formRow}>
        <Text style={styles.label}>Solicito:</Text>
        <View style={styles.input} />
      </View>

      <View style={styles.signature}>
        <View style={styles.signatureLine} />
        <Text>REQUERENTE</Text>
      </View>
    </Page>
  </Document>
)

export default PoliceMilitaryForm
