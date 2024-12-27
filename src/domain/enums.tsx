interface TemaProps{
    corPrimaria: string,
    corSecundaria: string,
    corTexto: string,
    corTextoSecundario: string
}

export const Tema:TemaProps = {
    corPrimaria: '#B0C4DE',
    corSecundaria: '#ADD8E6',
    corTexto: '#708090',
    corTextoSecundario: '#708090',
}

export interface Nota{
    id: number,
    titulo: string,
    conteudo: string
}