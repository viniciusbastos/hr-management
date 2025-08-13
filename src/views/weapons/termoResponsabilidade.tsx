import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  Note,
} from '@react-pdf/renderer'
import pmba from '../../assets/pmba2.png'

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  headerGrid: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  section: {
    fontSize: 14,
    textAlign: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
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
    marginVertical: 10,
    marginBottom: 10,

    lineHeight: 1.5,
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

const ResponsabilityTermPDF = ({ weapon }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.headerGrid}>
        {/* Center Section */}
        <View style={styles.section}>
          <Image style={styles.logo} src={pmba} />
          <Text>POLÍCIA MILITAR DA BAHIA </Text>
          <Text>CPR/L- 6ª CIPM</Text>
        </View>
      </View>

      <Text style={styles.title}>
        TERMO DE RESPONSABILIDADE Nº {weapon.id}/SMP/2025
      </Text>

      <Text style={styles.requerimento} wrap={false}>
        {weapon.name}, {weapon.posto}, matrícula {weapon.mat}, ora servindo
        no(a) 6ª CIPM - RIO REAL, assumo total responsabilidade pelo uso e
        manutenção da arma de fogo, marca{' '}
        <Text style={{ fontWeight: 'bold' }}>{weapon.brand}</Text>, modelo{' '}
        <Text style={{ fontWeight: 'bold' }}>{weapon.model}</Text> n° de série{' '}
        <Text style={{ fontWeight: 'bold' }}>{weapon.serialNumber}</Text>,
        espécie <Text style={{ fontWeight: 'bold' }}>{weapon.weaponType}</Text>,{' '}
        <Text style={{ fontWeight: 'bold' }}> {weapon.Caliber}</Text> E{' '}
        <Text style={{ fontWeight: 'bold' }}>____ MUNIÇÕES</Text> DA MARCA CBC,{' '}
        <Text style={{ fontWeight: 'bold' }}>LOTE: _________</Text>,{' '}
        <Text style={{ fontWeight: 'bold' }}>CALIBRE: .40</Text>, MODELO:{' '}
        <Text style={{ fontWeight: 'bold' }}>ETPP 180GR</Text>, LOCALIZADOR:{' '}
        <Text style={{ fontWeight: 'bold' }}>_______</Text>.
      </Text>
      <Text style={styles.requerimento}>
        <Text style={{ textAlign: 'left', fontSize: 12, marginTop: 5 }}>
          1. Deve portar o referido equipamento de acordo com as normas
          estabelecidas pela Portaria Nº 131-CG/2024 de 04 de dezembro de 2024 ;
          {'\n'}
        </Text>
        <Text
          style={{
            textAlign: 'left',
            fontSize: 12,
            marginTop: 5,
            lineHeight: 1.5,
          }}
        >
          2. Deve devolver imediatamente o equipamento quando:
          {'\n'} I. Exonerado do cargo permanente:
          {'\n'} II. Afastado legalmente por mais de trinta dias, excetuando
          férias e licença prêmio;
          {'\n'} III. Afastado por aposentadoria, anterior à publicação no
          D.O.E;
          {'\n'} IV. Ou, por qualquer outro motivo, a critério de Autoridade
          Policial a que estiver imediatamente subordinado.
          {'\n'}
        </Text>
        <Text
          style={{
            textAlign: 'left',
            fontSize: 12,
            marginTop: 5,
            lineHeight: 1.5,
          }}
        >
          3. O servidor deverá apresentar a arma anualmente ao chefe imediato,
          juntamente com o registro.
          {'\n'}
        </Text>
        <Text style={{ textAlign: 'left', fontSize: 12, marginTop: 5 }}>
          4. Em caso de furto, roubo ou extravio deverá registrar o B.O e
          informar imediatamente a Unidade policial de origem.
          {'\n'}
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

      <View>
        <Text style={{ textAlign: 'center', marginTop: 10 }}>
          __________________________________
        </Text>
        <Text style={{ textAlign: 'center', fontSize: 12, marginTop: 5 }}>
          PAULO HENRIQUE DE MATOS – SUB TEN PM
        </Text>
        <Text style={{ textAlign: 'center', fontSize: 12, marginTop: 5 }}>
          ALMOXARIFE
        </Text>
      </View>
    </Page>
  </Document>
)

export default ResponsabilityTermPDF
