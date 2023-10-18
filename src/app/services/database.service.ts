import { Injectable } from '@angular/core';
import { Firestore, QuerySnapshot, addDoc, collection, getDocs, onSnapshot } from '@angular/fire/firestore';
import { DocumentData, DocumentReference, Timestamp, getDoc, query } from 'firebase/firestore';
import { Message } from '../classes/message';
import { User } from '../classes/user';

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

	async traerObjPorRef<T>(docRef: DocumentReference<DocumentData>) {
		const docSnap = await getDoc(docRef);
		return docSnap.data() as T;
	}

	traerNuevosMensajes(messages: Array<Message> = []) {
		const col = collection(this.firestore, 'messages');
		const q = query(col);
		
		onSnapshot(q, (addSnap: QuerySnapshot) => {
			addSnap.docChanges().forEach((change) => {
				if (change.type === 'added'){
					const data = change.doc.data();
					const newMsg = new Message(data['user'] as User, data['message'], data['time'].toDate());
					messages.push(newMsg);
					messages.sort((m1, m2) => m1.time > m2.time ? 1 : -1);
				}
			})
		});
	}
}
