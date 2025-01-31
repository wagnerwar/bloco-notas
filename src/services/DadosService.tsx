import { Categoria, Nota } from "../domain/enums"
import {openDatabase, SQLiteDatabase, enablePromise} from 'react-native-sqlite-storage';

enablePromise(true);

const getDBConnection = async () => {
    return openDatabase({name: 'notas.db', location: 'default'});
};

const createTable = async (db: SQLiteDatabase) => {
    // create table if not exists
    const query = `CREATE TABLE IF NOT EXISTS nota(
          id integer primary key AUTOINCREMENT,
          conteudo TEXT NOT NULL,
          titulo text not null
      );`;  
    await db.executeSql(query);

    const qrCategoria = `CREATE TABLE IF NOT EXISTS categoria(
        id integer primary key AUTOINCREMENT,
        nome TEXT NOT NULL,
        conteudo TEXT NOT NULL,
        ativo INTEGER NOT NULL
    );`;  
    await db.executeSql(qrCategoria);
  };

const incluirItem = async (db: SQLiteDatabase, nota: Nota) => {
console.log(nota);
const insertQuery =
    'INSERT INTO nota(conteudo, titulo) values' +
    `('${nota.conteudo}', '${nota.titulo}')`;
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
        + ', titulo = ' + `'${nota.titulo}'` + ' where id = ' + `'${nota.id}'`;
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

const GetNotas = async (): Promise<Nota[]> => {
    try {
        const db = await getDBConnection();
        await createTable(db);
        const todoItems: Nota[] = [];
        const results = await db.executeSql(`SELECT id, titulo, conteudo FROM nota`);
        console.log(results);
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
        const results = await db.executeSql(`SELECT id, titulo, conteudo FROM nota where id = ${id}`);
        console.log(results);
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

const FiltrarNotas = async (termo:string): Promise<Nota[]> => {
    try {
        const db = await getDBConnection();
        await createTable(db);
        const todoItems: Nota[] = [];
        const results = await db.executeSql(`SELECT id, titulo, conteudo FROM nota where titulo like '%${termo}%'`);
        console.log(results);
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

const GetCategorias = async (): Promise<Categoria[]> => {
    try {
        const db = await getDBConnection();
        await createTable(db);
        const todoItems: Categoria[] = [];
        const results = await db.executeSql(`SELECT id, nome, conteudo, ativo FROM categoria`);
        console.log(results);
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
        console.log(results);
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
    console.log(nota);
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
    AtualizarCategoria
};
