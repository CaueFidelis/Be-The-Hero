// Importando o React
import React, { useState, useEffect } from 'react';

// Importando Icones
import { Feather } from '@expo/vector-icons';

// Importar useNavigation
import { useNavigation } from '@react-navigation/native';

// Importando o React Nactive
import { View, Image, Text, TouchableOpacity, FlatList }  from 'react-native';

// Importando o API
import api from '../../services/api';

// Importando a Logo
import logoImg from '../../assets/logo.png';

// Importando Estilos
import styles from './styles';

// Criando a função
export default function Incidents() {
    // Criar estados para API
    const [incidents, setIncidents] = useState([]);
    
    // Criar Estado para Total de Casos através do API do back-end
    const [total, setTotal] = useState(0);

    // Criar um Estado para controlar a pagina em que eu estou no momento
    const [page, setPage] = useState(1);

    // Criar um Estado de Loading para armazenar uma informação, para evitar que estes dados sejam buscados novamente.
    const [loading, setLoading] = useState(false);
 
    // Criar uma variavel para extrair o useNavigaton
    const navigation = useNavigation();
    
    // Fazer a Navegação de uma pagina para outra
    function navigateToDetail(incident) {
        navigation.navigate('Detail', { incident });
    }

    // Carregar os Casos através de API
    async function loadIncidents() {
        // Se o loading estiver como true, assim evitando enquanto outra requisição está em uso, mais uma resquisição venha a ser usada
        if (loading) {
            return;
        }

        // Se o total for maior que 0 e igual ao total, não faz sentido buscar mais informações se ja buscou todas
        if (total > 0 && incidents.length == total) {
            return;
        }

        setLoading(true);

        // Variavel para extrair o incidents do back-end
        const response = await api.get('incidents', {
            params: { page }
        });

        // Variavel para colocar o valor dos casos (nome, preço e ONG)
        setIncidents([...incidents, ...response.data]);

        // Variavel para colocar o Total de Casos
        setTotal(response.headers['x-total-count']);

        // Pular para a proxima pagina
        setPage(page + 1);

        setLoading(false);
    }

    // É uma função que vai ser disparado quando as variaveis que estiverem dentro do Array mudarem.
    useEffect(() => {
        loadIncidents();
    }, [])

    return(
        //  Pagina de Casos
        <View style={styles.container}> 
            {/*  Logo e Total de Casos */}
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} Casos</Text>.
                </Text>
            </View>
            {/* /Logo e Total de Casos */}

            {/* Bem vindo e Legenda */}
            <Text style={styles.title}>Bem-Vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

            {/*  Listagem de Casos */}
            <FlatList 
                data={incidents} // Dados - Array de Dados que vai montar a lista
                style={styles.incidentList}
                keyExtractor={incident => String(incident.id)} // Vai receber cada um dos Casos, e precisa retornar a informação unica de cada Caso
                showsVerticalScrollIndicator={false} // Tirar a barrinha vertical do Scroll
                // Função separada de forma automatica quando o usuario chegar ao final da lista
                onEndReached={loadIncidents}
                // Essa propriedade fala quantos % do final da lista o usuario precisa estar para carregar novos itens
                onEndReachedThreshold={0.2}
                //  Casos - A função Responsavel por renderzar cada um dos itens (casos)
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', { 
                                style: 'currency', 
                                currency: 'BRL' 
                            }).format(incident.value)}
                        </Text>
                        
                        <TouchableOpacity 
                        style={styles.detailsButton} 
                        onPress={() => navigateToDetail(incident)}>
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>
                )}
                // /Casos  
            />
            {/* /Listagem de Casos */}
        </View>
    );
}