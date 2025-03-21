import { Categoria, Constantes, Nota } from "../domain/enums"
import {openDatabase, SQLiteDatabase, enablePromise} from 'react-native-sqlite-storage';

enablePromise(true);

const getDBConnection = async () => {
    return openDatabase({name: 'notas.db', location: 'default'});
};

const createTable = async (db: SQLiteDatabase) => {
    const qrCategoria = `CREATE TABLE IF NOT EXISTS categoria(
        id integer primary key AUTOINCREMENT,
        nome TEXT NOT NULL,
        conteudo TEXT NOT NULL,
        ativo INTEGER NOT NULL
    );`;  
    await db.executeSql(qrCategoria);

    const query = `CREATE TABLE IF NOT EXISTS nota(
        id integer primary key AUTOINCREMENT,
        conteudo TEXT NOT NULL,
        titulo text not null,
        id_categoria INTEGER,
        FOREIGN KEY(id_categoria) REFERENCES categoria(id)
    );`;
  await db.executeSql(query);
};

const incluirItem = async (db: SQLiteDatabase, nota: Nota) => {
console.log(nota);
const insertQuery =
    'INSERT INTO nota(conteudo, titulo, id_categoria) values' +
    `('${nota.conteudo}', '${nota.titulo}', '${nota.id_categoria}')`;
return db.executeSql(insertQuery);
};

const excluirItem = async (db: SQLiteDatabase, id: number) => {
    const deleteQuery =
    'delete from nota where id = ' +
    `'${id}'`;
    return db.executeSql(deleteQuery);
};

const atualizarItem = async (db: SQLiteDatabase, nota: Nota) => {
    const updateQuery =
        'UPDATE nota set conteudo = ' 
        + `'${nota.conteudo}'` 
        + ', titulo = ' + `'${nota.titulo}'` 
        + ', id_categoria = ' + `'${nota.id_categoria}'` 
        +  ' where id = ' + `'${nota.id}'`;
    return db.executeSql(updateQuery);
};

const Incluir = async(nota:Nota):Promise<boolean> => {
    try{
        const conn = await getDBConnection();
        await createTable(conn);
        await incluirItem(conn, nota);
        return true;
    }catch(ex){
        console.log(ex);
        throw ex;
    }
}

const Excluir = async(id:number):Promise<boolean> => {
    try{
        const conn = await getDBConnection();
        await createTable(conn);
        await excluirItem(conn, id);
        return true;
    }catch(ex){
        console.log(ex);
        throw ex;
    }
}

const GetNotas = async (pagina:number): Promise<Nota[]> => {
    try {
        const db = await getDBConnection();
        await createTable(db);
        const todoItems: Nota[] = [];
        const inicio = ( pagina > 1 ? ( ( pagina - 1 ) * Constantes.limite ) : 0 );
        const query = `SELECT id, titulo, conteudo, id_categoria FROM nota limit ${inicio}, ${Constantes.limite}`;
        console.log(query);
        const results = await db.executeSql(query);
        if(results !== undefined){
            results.forEach(result => {
                for (let index = 0; index < result.rows.length; index++) {
                    todoItems.push(result.rows.item(index))
                }
            });
        }
        return todoItems;
    } catch (error) {
        console.error(error);
        throw Error('Failed to get notas !!!');
    }
};

const GetNota = async (id: number): Promise<Nota | null> => {
    try {
        const db = await getDBConnection();
        await createTable(db);
        const todoItems: Nota[] = [];
        const results = await db.executeSql(`SELECT id, titulo, conteudo, id_categoria FROM nota where id = ${id}`);
        if(results !== undefined){
            results.forEach(result => {
                for (let index = 0; index < result.rows.length; index++) {
                    todoItems.push(result.rows.item(index))
                }
            });
        }
        console.log(todoItems);        
        if(todoItems.length > 0){
            return todoItems[0];
        }else{
            return null;
        }        
    } catch (error) {
        console.error(error);
        throw Error('Failed to get notas !!!');
    }
};

const Atualizar = async(nota:Nota):Promise<boolean> => {
    try{
        const conn = await getDBConnection();
        await createTable(conn);
        await atualizarItem(conn, nota);
        return true;
    }catch(ex){
        console.log(ex);
        throw ex;
    }
}

const FiltrarNotas = async (termo:string, pagina: number): Promise<Nota[]> => {
    try {
        const db = await getDBConnection();
        await createTable(db);
        const todoItems: Nota[] = [];
        const inicio = ( pagina > 1 ? ( ( pagina - 1 ) * Constantes.limite ) : 0 );
        const results = await db.executeSql(`SELECT id, titulo, conteudo FROM nota where titulo like '%${termo}%' limit ${inicio}, ${Constantes.limite}`);
        if(results !== undefined){
            results.forEach(result => {
                for (let index = 0; index < result.rows.length; index++) {
                    todoItems.push(result.rows.item(index))
                }
            });
        }        
        return todoItems;
    } catch (error) {
        console.error(error);
        throw Error('Failed to get notas !!!');
    }
};

const ObterQuantidadeNotas = async (): Promise<number> => {
    try {
        const db = await getDBConnection();
        await createTable(db);
        let quantidade: number = 0;
        const results = await db.executeSql(`SELECT count(*) as qtde FROM nota`);
        if(results !== undefined){
            if(results !== undefined){
                results.forEach(result => {
                    for (let index = 0; index < result.rows.length; index++) {
                        quantidade = result.rows.item(index)['qtde'];
                    }
                });
            }
        }
        return quantidade;
    } catch (error) {
        console.error(error);
        throw Error('Failed to get notas !!!');
    }
};

const ObterQuantidadeNotasFiltro = async (termo:string): Promise<number> => {
    try {
        const db = await getDBConnection();
        await createTable(db);
        let quantidade: number = 0;
        const results = await db.executeSql(`SELECT count(*) as qtde FROM nota where titulo like '%${termo}%'`);
        if(results !== undefined){
            if(results !== undefined){
                results.forEach(result => {
                    for (let index = 0; index < result.rows.length; index++) {
                        quantidade = result.rows.item(index)['qtde'];
                    }
                });
            }
        }
        return quantidade;
    } catch (error) {
        console.error(error);
        throw Error('Failed to get notas !!!');
    }
};

const GetCategorias = async (pagina:number): Promise<Categoria[]> => {
    try {
        const db = await getDBConnection();
        await createTable(db);
        const todoItems: Categoria[] = [];
        const inicio = ( pagina > 1 ? ( ( pagina - 1 ) * Constantes.limite ) : 0 );
        const query = `SELECT id, nome, conteudo, ativo FROM categoria limit ${inicio}, ${Constantes.limite}`;
        console.log(query);
        const results = await db.executeSql(query);
        if(results !== undefined){
            results.forEach(result => {
                for (let index = 0; index < result.rows.length; index++) {
                    todoItems.push(result.rows.item(index))
                }
            });
        }        
        return todoItems;
    } catch (error) {
        console.error(error);
        throw Error('Failed to get notas !!!');
    }
};

const GetCategoria = async (id: number): Promise<Categoria | null> => {
    try {
        const db = await getDBConnection();
        await createTable(db);
        const todoItems: Categoria[] = [];
        const results = await db.executeSql(`SELECT id, nome, conteudo, ativo FROM categoria where id = ${id}`);
        if(results !== undefined){
            results.forEach(result => {
                for (let index = 0; index < result.rows.length; index++) {
                    todoItems.push(result.rows.item(index))
                }
            });
        }        
        if(todoItems.length > 0){
            return todoItems[0];
        }else{
            return null;
        }        
    } catch (error) {
        console.error(error);
        throw Error('Failed to get notas !!!');
    }
};

const incluirItemCategoria = async (db: SQLiteDatabase, categoria: Categoria) => {
    const insertQuery =
        'INSERT INTO categoria(nome, conteudo, ativo) values' +
        `('${categoria.nome}', '${categoria.conteudo}', '${categoria.ativo}')`;
    return db.executeSql(insertQuery);
};

const IncluirCategoria = async(categoria:Categoria):Promise<boolean> => {
    try{
        const conn = await getDBConnection();
        await createTable(conn);
        await incluirItemCategoria(conn, categoria);
        return true;
    }catch(ex){
        console.log(ex);
        throw ex;
    }
}

const atualizarItemCategoria = async (db: SQLiteDatabase, categoria: Categoria) => {
    const updateQuery =
        'UPDATE categoria set conteudo = ' 
        + `'${categoria.conteudo}'` 
        + ', nome = ' + `'${categoria.nome}'`
        + ', ativo = ' + `'${categoria.ativo}'`
        + ' where id = ' + `'${categoria.id}'`;
    return db.executeSql(updateQuery);
};

const AtualizarCategoria = async(categoria:Categoria):Promise<boolean> => {
    try{
        const conn = await getDBConnection();
        await createTable(conn);
        await atualizarItemCategoria(conn, categoria);
        return true;
    }catch(ex){
        console.log(ex);
        throw ex;
    }
}

const GetCategoriasAtivas = async (): Promise<Categoria[]> => {
    try {
        const db = await getDBConnection();
        await createTable(db);
        const todoItems: Categoria[] = [];
        const results = await db.executeSql(`SELECT id, nome, conteudo, ativo FROM categoria where ativo = ${Constantes.ativo}`);
        if(results !== undefined){
            results.forEach(result => {
                for (let index = 0; index < result.rows.length; index++) {
                    todoItems.push(result.rows.item(index))
                }
            });
        }
        console.log(todoItems)
        return todoItems;
    } catch (error) {
        console.error(error);
        throw Error('Failed to get notas !!!');
    }
};

const ObterQuantidadeCategorias = async (): Promise<number> => {
    try {
        const db = await getDBConnection();
        await createTable(db);
        let quantidade: number = 0;
        const results = await db.executeSql(`SELECT count(*) as qtde FROM categoria`);
        if(results !== undefined){
            if(results !== undefined){
                results.forEach(result => {
                    for (let index = 0; index < result.rows.length; index++) {
                        quantidade = result.rows.item(index)['qtde'];
                    }
                });
            }
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
