// Importando o React
import React from 'react';

// Importando Icones
import { Feather } from '@expo/vector-icons';

// Importar useNavigation, useRoute - Serve para pegar informações especificas da pagina atual da nossa aplicação
import { useNavigation, useRoute } from '@react-navigation/native';

// Importando o React Nactive
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';

// Importando o MailComposer
import * as MailComposer from 'expo-mail-composer';

// Importando a Logo
import logoImg from '../../assets/logo.png';

// Importando Estilos
import styles from './styles';

// Criando a função
export default function Detail() {
    // Criar uma variavel para extrair o useNavigaton
    const navigation = useNavigation();

    // Armazenar o useRoute em uma variavel
    const route = useRoute();

    // Verificar se as informações estão sendo enviadas corretamente
    const incident = route.params.incident;

    // Mensagem que será enviada ao E-mail para ONG
    const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no Caso "${incident.title}" com o valor de ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}`
    
    // Fazer a Navegação de uma pagina para outra
    function navigateBack() {
        navigation.goBack();
    }

    // Enviar E-mail
    function sendMail() {
        MailComposer.composeAsync({
            subject: `Herói do Caso: ${incident.title}`,
            recipients: [incident.email],
            body: message,
        })
    }

    // Enviar WhatsApp
    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
    }


    return(
        <View style={styles.container}>
            {/*  Logo e Total de Casos */}
            <View style={styles.header}>
                <Image source={logoImg} />
                
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#E82041" />
                </TouchableOpacity>
            </View>
            {/* /Logo e Total de Casos */}

            {/*  Detalhe do Caso */}
            <View style={styles.incident}>
                <Text style={styles.incidentProperty, { marginTop: 0 }}>ONG:</Text>
    <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

                <Text style={styles.incidentProperty}>CASO:</Text>
                <Text style={styles.incidentValue}>{incident.title}</Text>

                <Text style={styles.incidentProperty}>VALOR:</Text>
                <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', { 
                        style: 'currency', 
                        currency: 'BRL' 
                    }).format(incident.value)}
                </Text>
            </View>
            {/* /Detalhe do Caso */}

            {/*  Contato */}
            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o Dia!</Text>
                <Text style={styles.heroTitle}>Seja o Heroi desse Caso.</Text>

                <Text style={styles.heroDescription}>Entre em Contato:</Text>

                <View style={styles.actions}>
                    {/*  Whatsapp */}
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>
                    {/* /Whatsapp */}

                    {/*  E-mail */}
                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                    {/* /E-mail */}
                </View>
            </View>
            {/* /Contato */}
        </View>
    );
}