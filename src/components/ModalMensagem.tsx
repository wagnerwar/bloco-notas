import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import { Tema } from '../domain/enums';

interface ModalMensagemProps {
    visivel: boolean;
    titulo?: string;
    mensagem: string;
    textoBotaoConfirmar?: string;
    textoBotaoCancelar?: string;
    aoConfirmar: () => void;
    aoCancelar?: () => void;
}

export function ModalMensagem({
    visivel,
    titulo,
    mensagem,
    textoBotaoConfirmar = 'OK',
    textoBotaoCancelar,
    aoConfirmar,
    aoCancelar,
}: ModalMensagemProps) {
    return (
        <Modal
            visible={visivel}
            transparent
            animationType="fade"
            onRequestClose={aoCancelar ?? aoConfirmar}>
            <View style={estilos.sobreposicao}>
                <View style={estilos.caixa}>
                    {titulo ? (
                        <Text style={estilos.titulo}>{titulo}</Text>
                    ) : null}
                    <Text style={estilos.mensagem}>{mensagem}</Text>
                    <View style={estilos.botoes}>
                        {aoCancelar && textoBotaoCancelar ? (
                            <Pressable style={[estilos.botao, estilos.botaoCancelar]} onPress={aoCancelar}>
                                <Text style={estilos.textoBotao}>{textoBotaoCancelar}</Text>
                            </Pressable>
                        ) : null}
                        <Pressable style={[estilos.botao, estilos.botaoConfirmar]} onPress={aoConfirmar}>
                            <Text style={estilos.textoBotao}>{textoBotaoConfirmar}</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const estilos = StyleSheet.create({
    sobreposicao: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    caixa: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 24,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Tema.corTexto,
        marginBottom: 10,
        textAlign: 'center',
    },
    mensagem: {
        fontSize: 15,
        color: Tema.corTexto,
        textAlign: 'center',
        marginBottom: 20,
    },
    botoes: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
    },
    botao: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        minWidth: 80,
    },
    botaoConfirmar: {
        backgroundColor: Tema.corPrimaria,
        borderWidth: 1,
        borderColor: Tema.corSecundaria,
    },
    botaoCancelar: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: Tema.corTexto,
    },
    textoBotao: {
        fontSize: 15,
        color: Tema.corTexto,
        fontWeight: '600',
    },
});
