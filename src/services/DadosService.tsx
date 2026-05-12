import { Categoria, Constantes, Nota } from "../domain/enums"
import {openDatabase, SQLiteDatabase, enablePromise} from 'react-native-sqlite-storage';

enablePromise(true);

let dbPromise: Promise<SQLiteDatabase> | null = null;

const getDB = (): Promise<SQLiteDatabase> => {
    if (!dbPromise) {
        dbPromise = openDatabase({ name: 'notas.db', location: 'default' }).then(async (db) => {
            await createTables(db);
            return db;
        }).catch((error) => {
            dbPromise = null;
            throw error;
        });
    }
    return dbPromise;
};

const createTables = async (db: SQLiteDatabase) => {
    await db.executeSql(`CREATE TABLE IF NOT EXISTS categoria(
        id integer primary key AUTOINCREMENT,
        nome TEXT NOT NULL,
        conteudo TEXT NOT NULL,
        ativo INTEGER NOT NULL
    );`);
    await db.executeSql(`CREATE TABLE IF NOT EXISTS nota(
        id integer primary key AUTOINCREMENT,
        conteudo TEXT NOT NULL,
        titulo text not null,
        id_categoria INTEGER,
        FOREIGN KEY(id_categoria) REFERENCES categoria(id)
    );`);
};

const Incluir = async (nota: Nota): Promise<boolean> => {
    const db = await getDB();
    await db.executeSql(
        'INSERT INTO nota(conteudo, titulo, id_categoria) VALUES (?, ?, ?)',
        [nota.conteudo, nota.titulo, nota.id_categoria]
    );
    return true;
};

const Excluir = async (id: number): Promise<boolean> => {
    const db = await getDB();
    await db.executeSql('DELETE FROM nota WHERE id = ?', [id]);
    return true;
};

const GetNotas = async (pagina: number): Promise<Nota[]> => {
    try {
        const db = await getDB();
        const items: Nota[] = [];
        const offset = pagina > 1 ? (pagina - 1) * Constantes.limite : 0;
        const results = await db.executeSql(
            'SELECT id, titulo, conteudo, id_categoria FROM nota LIMIT ? OFFSET ?',
            [Constantes.limite, offset]
        );
        if (results !== undefined) {
            results.forEach(result => {
                for (let index = 0; index < result.rows.length; index++) {
                    items.push(result.rows.item(index));
                }
            });
        }
        return items;
    } catch (error) {
        console.error(error);
        throw Error('Failed to get notas !!!');
    }
};

const GetNota = async (id: number): Promise<Nota | null> => {
    try {
        const db = await getDB();
        const items: Nota[] = [];
        const results = await db.executeSql(
            'SELECT id, titulo, conteudo, id_categoria FROM nota WHERE id = ?',
            [id]
        );
        if (results !== undefined) {
            results.forEach(result => {
                for (let index = 0; index < result.rows.length; index++) {
                    items.push(result.rows.item(index));
                }
            });
        }
        return items.length > 0 ? items[0] : null;
    } catch (error) {
        console.error(error);
        throw Error('Failed to get notas !!!');
    }
};

const Atualizar = async (nota: Nota): Promise<boolean> => {
    const db = await getDB();
    await db.executeSql(
        'UPDATE nota SET conteudo = ?, titulo = ?, id_categoria = ? WHERE id = ?',
        [nota.conteudo, nota.titulo, nota.id_categoria, nota.id]
    );
    return true;
};

const FiltrarNotas = async (termo: string, pagina: number): Promise<Nota[]> => {
    try {
        const db = await getDB();
        const items: Nota[] = [];
        const offset = pagina > 1 ? (pagina - 1) * Constantes.limite : 0;
        const results = await db.executeSql(
            'SELECT id, titulo, conteudo, id_categoria FROM nota WHERE titulo LIKE ? LIMIT ? OFFSET ?',
            [`%${termo}%`, Constantes.limite, offset]
        );
        if (results !== undefined) {
            results.forEach(result => {
                for (let index = 0; index < result.rows.length; index++) {
                    items.push(result.rows.item(index));
                }
            });
        }
        return items;
    } catch (error) {
        console.error(error);
        throw Error('Failed to get notas !!!');
    }
};

const ObterQuantidadeNotas = async (): Promise<number> => {
    try {
        const db = await getDB();
        let quantidade = 0;
        const results = await db.executeSql('SELECT count(*) as qtde FROM nota');
        if (results !== undefined) {
            results.forEach(result => {
                for (let index = 0; index < result.rows.length; index++) {
                    quantidade = result.rows.item(index)['qtde'];
                }
            });
        }
        return quantidade;
    } catch (error) {
        console.error(error);
        throw Error('Failed to get notas !!!');
    }
};

const ObterQuantidadeNotasFiltro = async (termo: string): Promise<number> => {
    try {
        const db = await getDB();
        let quantidade = 0;
        const results = await db.executeSql(
            'SELECT count(*) as qtde FROM nota WHERE titulo LIKE ?',
            [`%${termo}%`]
        );
        if (results !== undefined) {
            results.forEach(result => {
                for (let index = 0; index < result.rows.length; index++) {
                    quantidade = result.rows.item(index)['qtde'];
                }
            });
        }
        return quantidade;
    } catch (error) {
        console.error(error);
        throw Error('Failed to get notas !!!');
    }
};

const GetCategorias = async (pagina: number): Promise<Categoria[]> => {
    try {
        const db = await getDB();
        const items: Categoria[] = [];
        const offset = pagina > 1 ? (pagina - 1) * Constantes.limite : 0;
        const results = await db.executeSql(
            'SELECT id, nome, conteudo, ativo FROM categoria LIMIT ? OFFSET ?',
            [Constantes.limite, offset]
        );
        if (results !== undefined) {
            results.forEach(result => {
                for (let index = 0; index < result.rows.length; index++) {
                    items.push(result.rows.item(index));
                }
            });
        }
        return items;
    } catch (error) {
        console.error(error);
        throw Error('Failed to get notas !!!');
    }
};

const GetCategoria = async (id: number): Promise<Categoria | null> => {
    try {
        const db = await getDB();
        const items: Categoria[] = [];
        const results = await db.executeSql(
            'SELECT id, nome, conteudo, ativo FROM categoria WHERE id = ?',
            [id]
        );
        if (results !== undefined) {
            results.forEach(result => {
                for (let index = 0; index < result.rows.length; index++) {
                    items.push(result.rows.item(index));
                }
            });
        }
        return items.length > 0 ? items[0] : null;
    } catch (error) {
        console.error(error);
        throw Error('Failed to get notas !!!');
    }
};

const IncluirCategoria = async (categoria: Categoria): Promise<boolean> => {
    const db = await getDB();
    await db.executeSql(
        'INSERT INTO categoria(nome, conteudo, ativo) VALUES (?, ?, ?)',
        [categoria.nome, categoria.conteudo, categoria.ativo]
    );
    return true;
};

const AtualizarCategoria = async (categoria: Categoria): Promise<boolean> => {
    const db = await getDB();
    await db.executeSql(
        'UPDATE categoria SET conteudo = ?, nome = ?, ativo = ? WHERE id = ?',
        [categoria.conteudo, categoria.nome, categoria.ativo, categoria.id]
    );
    return true;
};

const ExcluirCategoria = async (id: number): Promise<boolean> => {
    const db = await getDB();
    await db.executeSql('DELETE FROM categoria WHERE id = ?', [id]);
    return true;
};

const GetCategoriasAtivas = async (): Promise<Categoria[]> => {
    try {
        const db = await getDB();
        const items: Categoria[] = [];
        const results = await db.executeSql(
            'SELECT id, nome, conteudo, ativo FROM categoria WHERE ativo = ?',
            [Constantes.ativo]
        );
        if (results !== undefined) {
            results.forEach(result => {
                for (let index = 0; index < result.rows.length; index++) {
                    items.push(result.rows.item(index));
                }
            });
        }
        return items;
    } catch (error) {
        console.error(error);
        throw Error('Failed to get notas !!!');
    }
};

const ObterQuantidadeCategorias = async (): Promise<number> => {
    try {
        const db = await getDB();
        let quantidade = 0;
        const results = await db.executeSql('SELECT count(*) as qtde FROM categoria');
        if (results !== undefined) {
            results.forEach(result => {
                for (let index = 0; index < result.rows.length; index++) {
                    quantidade = result.rows.item(index)['qtde'];
                }
            });
        }
        return quantidade;
    } catch (error) {
        console.error(error);
        throw Error('Failed to get notas !!!');
    }
};

export const DadosService = {
    Incluir,
    GetNotas,
    Excluir,
    ExcluirCategoria,
    GetNota,
    Atualizar,
    FiltrarNotas,
    GetCategorias,
    GetCategoria,
    IncluirCategoria,
    AtualizarCategoria,
    GetCategoriasAtivas,
    ObterQuantidadeNotas,
    ObterQuantidadeNotasFiltro,
    ObterQuantidadeCategorias,
};
