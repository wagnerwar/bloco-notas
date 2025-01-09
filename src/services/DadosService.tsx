import { Nota } from "../domain/enums"
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
  };

  const incluirItem = async (db: SQLiteDatabase, nota: Nota) => {
    console.log(nota);
    const insertQuery =
      'INSERT INTO nota(conteudo, titulo) values' +
      `('${nota.conteudo}', '${nota.titulo}')`;
    return db.executeSql(insertQuery);
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

export const DadosService = {
    Incluir, 
    GetNotas
}