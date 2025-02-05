import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from '@react-pdf/renderer'
import pmba from '../../assets/pmba2.png'

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  headerGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  section: {
    fontSize: 12,
    textAlign: 'left',
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 5,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    textTransform: 'uppercase',
  },
  checkboxContainer: {
    marginVertical: 10,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  requerimento: {
    fontSize: 12,
    textAlign: 'justify',
    marginVertical: 10,
    textTransform: 'uppercase',
  },
  table: {
    marginTop: 10,
    fontSize: 12,
    borderWidth: 1,
    borderColor: '#000',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  tableCell: {
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: '#000',
  },
  signature: {
    marginTop: 30,
    borderTopWidth: 1,
    borderTopColor: '#000',
    paddingTop: 5,
    textAlign: 'center',
  },
  corregedoria: {
    display: 'flex',
    border: 1,
    borderColor: 'black',
    borderStyle: 'solid',
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
  },
  leftAlignedText: {
    fontSize: 12,
    textAlign: 'right',
    marginLeft: 30,
    marginBottom: 5,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    fontSize: 12,
  },
})

const WeaponRequestPDF = ({ weapon }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.headerGrid}>
        {/* Left Section */}
        <View style={styles.section}>
          <Text>Chefe ALMOXARIFADO</Text>
          <Text>Ao: Sr Comandante Da OPM</Text>
          <View style={styles.checkboxContainer}>
            <View style={styles.checkboxRow}>
              <Text>( ) Há Viabilidade</Text>
            </View>
            <View style={styles.checkboxRow}>
              <Text>( ) Não Há Viabilidade</Text>
            </View>
          </View>
          <Text>Rio Real ___/____/2025</Text>
          <Text style={styles.signature}>Almoxarife 6ªCIPM</Text>
        </View>

        {/* Center Section */}
        <View style={styles.section}>
          <Image style={styles.logo} src={pmba} />
          <Text>POLÍCIA MILITAR DA BAHIA </Text>
          <Text>CPR/L- 6ª CIPM</Text>
        </View>

        {/* Right Section */}
        <View style={styles.section}>
          <Text>6ª CIPM - CMT OPM</Text>
          <Text>Ao: Chefe DO ALMOX</Text>
          <View style={styles.checkboxContainer}>
            <View style={styles.checkboxRow}>
              <Text>( □ ) Defiro</Text>
            </View>
            <View style={styles.checkboxRow}>
              <Text>( □ ) Indefiro</Text>
            </View>
            <View style={styles.checkboxRow}>
              <Text>( □ ) Publique-se</Text>
            </View>
            <View style={styles.checkboxRow}>
              <Text>( □ ) Arquive-se</Text>
            </View>
            <View style={styles.checkboxRow}>
              <Text>( □ ) Informar</Text>
            </View>
          </View>
          <Text>Rio Real ___/____/2025</Text>
          <Text style={styles.signature}>Cmt 6ªCIPM</Text>
        </View>
      </View>

      <Text style={styles.title}>
        Requerimento de Carga Pessoal de Arma de Fogo da PMBA
      </Text>

      <Text style={styles.requerimento}>
        Eu, {weapon.name}, {weapon.posto}, Mat:{weapon.mat}.
      </Text>
      <Text style={styles.requerimento}>
        <Text style={{ textAlign: 'left', fontSize: 12, marginTop: 5 }}>
          Solicito:___________________________________________________________________{' '}
        </Text>
        <Text style={{ textAlign: 'left', fontSize: 12, marginTop: 5 }}>
          ____________________________________________________________________________{' '}
        </Text>
        <Text style={{ textAlign: 'left', fontSize: 12, marginTop: 5 }}>
          ____________________________________________________________________________{' '}
        </Text>
      </Text>
      <Text style={styles.leftAlignedText}>6ª CIPM/PM </Text>
      <Text style={styles.leftAlignedText}>RIO REAL – BA, ___/____/2025 </Text>
      <View>
        <Text style={{ textAlign: 'center', marginTop: 10 }}>
          __________________________________
        </Text>
        <Text style={{ textAlign: 'center', fontSize: 12, marginTop: 5 }}>
          {weapon.posto} - {weapon.name} Mat:{weapon.mat}
        </Text>
      </View>

      <View style={styles.corregedoria}>
        <Text style={{ textAlign: 'left', fontSize: 12 }}>
          Do Chefe da Corregedoria Setorial
        </Text>
        <Text style={{ textAlign: 'right', fontSize: 12 }}>
          Rio Real, ___/____/2025
        </Text>
        <Text style={{ textAlign: 'left', fontSize: 12 }}>
          Ao: Senhor Comandante da OPM
        </Text>
        <Text style={{ textAlign: 'left', fontSize: 12, marginTop: 5 }}>
          Informo a V.S.a que requerente
          ____________________________________________________________________________{' '}
        </Text>
        <Text style={{ textAlign: 'left', fontSize: 12, marginTop: 5 }}>
          ____________________________________________________________________________{' '}
        </Text>
        <Text style={{ textAlign: 'left', fontSize: 12, marginTop: 5 }}>
          ____________________________________________________________________________{' '}
        </Text>

        <Text style={{ textAlign: 'center', marginTop: 5, fontSize: 12 }}>
          __________________________________
        </Text>
        <Text style={{ textAlign: 'center', fontSize: 12, marginTop: 5 }}>
          Chefe da Corregedoria Setorial
        </Text>
      </View>
      <View style={styles.table}>
        <View style={[styles.tableRow, { backgroundColor: '#f0f0f0' }]}>
          <Text style={[styles.tableCell, { width: '10%' }]}>#</Text>
          <Text style={[styles.tableCell, { width: '70%' }]}>Descrição</Text>
          <Text style={[styles.tableCell, { width: '20%' }]}>
            Número de Série
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, { width: '10%' }]}>{weapon.id}</Text>
          <Text style={[styles.tableCell, { width: '70%' }]}>
            {weapon.weaponType} {weapon.model}
          </Text>
          <Text style={[styles.tableCell, { width: '20%' }]}>
            {weapon.serialNumber}
          </Text>
        </View>
      </View>

      <Text style={styles.footer}>BIR Nº _______ de ___ / ___ / ___</Text>
    </Page>
  </Document>
)

export default WeaponRequestPDF
