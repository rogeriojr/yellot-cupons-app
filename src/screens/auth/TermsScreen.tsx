import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../types/navigation";
import { Ionicons } from "@expo/vector-icons";

/**
 * Props para a tela de termos de uso
 */
type TermsScreenProps = NativeStackScreenProps<AuthStackParamList, "Terms">;

/**
 * Tela de termos de uso e privacidade
 * Exibe os termos de uso e política de privacidade da aplicação
 */
const TermsScreen: React.FC<TermsScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Termos de Uso e Privacidade
        </Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.contentContainer}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Termos de Uso
          </Text>
          <Text style={[styles.paragraph, { color: theme.secondaryText }]}>
            Ao acessar e utilizar o aplicativo Yellot Cupons, você concorda com
            os seguintes termos e condições. Por favor, leia atentamente antes
            de continuar a usar nossos serviços.
          </Text>

          <Text style={[styles.subTitle, { color: theme.text }]}>
            1. Aceitação dos Termos
          </Text>
          <Text style={[styles.paragraph, { color: theme.secondaryText }]}>
            Ao utilizar o aplicativo Yellot Cupons, você concorda com estes
            Termos de Uso. Se você não concordar com qualquer parte destes
            termos, não deverá utilizar o aplicativo.
          </Text>

          <Text style={[styles.subTitle, { color: theme.text }]}>
            2. Uso do Serviço
          </Text>
          <Text style={[styles.paragraph, { color: theme.secondaryText }]}>
            O Yellot Cupons oferece um serviço de cupons de desconto para
            diversos estabelecimentos. Você concorda em utilizar este serviço
            apenas para fins legais e de acordo com estes termos.
          </Text>

          <Text style={[styles.subTitle, { color: theme.text }]}>
            3. Contas de Usuário
          </Text>
          <Text style={[styles.paragraph, { color: theme.secondaryText }]}>
            Para utilizar determinadas funcionalidades do aplicativo, você
            precisará criar uma conta. Você é responsável por manter a
            confidencialidade de suas credenciais de login e por todas as
            atividades que ocorrerem em sua conta.
          </Text>

          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Política de Privacidade
          </Text>
          <Text style={[styles.paragraph, { color: theme.secondaryText }]}>
            A sua privacidade é importante para nós. Esta política de
            privacidade explica como coletamos, usamos e protegemos suas
            informações pessoais.
          </Text>

          <Text style={[styles.subTitle, { color: theme.text }]}>
            1. Coleta de Informações
          </Text>
          <Text style={[styles.paragraph, { color: theme.secondaryText }]}>
            Coletamos informações que você nos fornece diretamente, como nome,
            endereço de e-mail, CPF e data de nascimento durante o registro.
            Também coletamos informações sobre como você utiliza nosso
            aplicativo.
          </Text>

          <Text style={[styles.subTitle, { color: theme.text }]}>
            2. Uso das Informações
          </Text>
          <Text style={[styles.paragraph, { color: theme.secondaryText }]}>
            Utilizamos suas informações para fornecer, manter e melhorar nossos
            serviços, personalizar sua experiência e enviar comunicações
            relacionadas ao serviço.
          </Text>

          <Text style={[styles.subTitle, { color: theme.text }]}>
            3. Compartilhamento de Informações
          </Text>
          <Text style={[styles.paragraph, { color: theme.secondaryText }]}>
            Não compartilhamos suas informações pessoais com terceiros, exceto
            conforme descrito nesta política de privacidade ou quando exigido
            por lei.
          </Text>

          <Text style={[styles.subTitle, { color: theme.text }]}>
            4. Segurança
          </Text>
          <Text style={[styles.paragraph, { color: theme.secondaryText }]}>
            Implementamos medidas de segurança para proteger suas informações
            contra acesso não autorizado, alteração, divulgação ou destruição.
          </Text>

          <Text style={[styles.subTitle, { color: theme.text }]}>
            5. Seus Direitos (LGPD)
          </Text>
          <Text style={[styles.paragraph, { color: theme.secondaryText }]}>
            De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem o
            direito de acessar, corrigir, atualizar ou solicitar a exclusão de
            suas informações pessoais. Você também pode se opor ao processamento
            de suas informações ou solicitar a portabilidade de seus dados.
          </Text>

          <Text
            style={[
              styles.paragraph,
              { color: theme.secondaryText, marginTop: 20 },
            ]}
          >
            Ao utilizar o aplicativo Yellot Cupons, você concorda com estes
            termos de uso e política de privacidade. Reservamo-nos o direito de
            atualizar ou modificar estes termos a qualquer momento, e tais
            alterações entrarão em vigor imediatamente após serem publicadas.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#333333",
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 24,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
});

export default TermsScreen;
