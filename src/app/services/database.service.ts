import { Injectable } from '@angular/core';
import { Firestore, WithFieldValue, addDoc, collection, getDocs } from '@angular/fire/firestore';
import { DocumentData } from 'firebase/firestore';

@Injectable({
	providedIn: 'root'
})
export class DatabaseService {
	constructor(private firestore: Firestore) { }

	async traerDatos<T>(dbPath: string): Promise<Array<T>> {
		const col = collection(this.firestore, dbPath);

		const querySnapshot = await getDocs(col);
		const arrAux: Array<T> = [];

		querySnapshot.forEach((doc) => {
			arrAux.push(doc.data() as T);
		});

		return arrAux;
	}

	agregarDatos(dbPath: string, datos: any) {
		const col = collection(this.firestore, dbPath);
		addDoc(col, { ...datos });
	}
}
