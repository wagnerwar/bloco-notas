interface TemaProps{
    corPrimaria: string,
    corSecundaria: string,
    corTexto: string,
    corTextoSecundario: string
}

interface ConstantesProps{
    ativo: number,
    inativo: number
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
    conteudo: string,
    id_categoria: number
}

export interface Categoria{
    id: number,
    nome: string,
    conteudo: string,
    ativo: number,
}

export const Constantes:ConstantesProps = {
    ativo: 1,
    inativo: 0
}