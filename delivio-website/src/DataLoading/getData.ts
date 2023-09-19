import localforage from "localforage";
import { matchSorter, rankings } from "match-sorter";
import { LoaderFunction, LoaderFunctionArgs } from "react-router-dom";
import { convertToObject } from "typescript";
import { URLSearchParams } from "url";
import { IIDataItem } from "../components/Utils/utils.d";
import { II_Basket_Data, II_Basket_Entry } from "../routes/Basket/Basket";

interface II_LoadData {
   search?: string;
   sortBy?: string;
   trending?: boolean;
   productsPerPage: number;
}

export async function dataSet(): Promise<IIDataItem[]> {

   const data: IIDataItem[] = await fetch("/data/?mainSearch=''")
      .then((data) => data.json())
   console.log(data);
   await localforage.setItem("database", data);
   return data;
}

export async function smartDataSet() : Promise<Map<string, IIDataItem>> {
   const data = await dataSet().then(data => {
      const map : Map<string, IIDataItem> = new Map();
      for(const entry of data) {
         map.set(entry.id, entry);
      }
      return map
   });
   await localforage.setItem("smartDatabse", data);
   return data;

}

export async function loadData(params: II_LoadData, page: number) {
   const data : IIDataItem[] = await fetch(`/data/?mainSearch=${params.search}`).then(data => data.json()) ;
   //const data = matchSorter(_data, params.search|| "", {keys:["category", "name", "id"]})
    
   

   if (data == null) throw new Error("Our data is null");
   const size = Math.ceil(data.length / params.productsPerPage);
   const pages: Array<IIDataItem[]> = Array.from({ length: size }).map(() => []);

   for (let i = 0; i < data.length; ++i) {
      pages[Math.floor(i / params.productsPerPage)].push(data[i]);
   }

   if (page > pages.length) {
      throw new Error("Page is too big");
   }

   return { page: pages[page - 1], maxPage: pages.length };
}

export async function setBasket(data?: II_Basket_Data) {
   if(data == null) {
      await localforage.setItem("basketData", new Map())
      return;
   };
   await localforage.setItem("basketData", data);
}

export async function updateEntry(id: string, data: II_Basket_Entry) {
   const basketData = (await localforage.getItem("basketData")) as II_Basket_Data;
   const smartSet = await smartDataSet();

   if(data.itemData == null) {
      const newData = smartSet.get(id);
      if (newData == null) throw Error("We have a null elemenet in dataset");
      data.itemData = newData;
   }
   
   if (!basketData.has(id)) {
      basketData.set(id, data);
      await localforage.setItem("basketData", basketData);
   }


   const item = basketData.get(id);
   if (item == null) throw new Error("Null item in database");

   if (item?.quantity == null) item.quantity = 1;

   item.quantity = data.quantity;

   await localforage.setItem("basketData", basketData);

}

export async function addBucket(entry: II_Basket_Entry) {
   console.log(entry, "cur");
   if(entry.itemData == null) throw Error("null data muie")
   const id = entry.itemData.id;
   const basketData = (await localforage.getItem("basketData")) as II_Basket_Data;

   if (basketData.has(id)) {
      const item = basketData.get(id);
      if (item == null) throw Error("Null item in database");
      item.quantity = item.quantity + entry.quantity;

      await localforage.setItem("basketData", basketData);
      return;
   }

   basketData.set(id, entry);

   await localforage.setItem("basketData", basketData);
}
export async function getTotalPrice() {
   const basketData = (await localforage.getItem("basketData")) as II_Basket_Data;
   if(basketData == null) return;
   let total = 0;
   for (const key of basketData.keys()) {
      const entry = basketData.get(key);
      if (entry == null) throw Error("Null element in database getTotal function");
      if (entry.itemData == null) throw Error("Null element in database getTotal function");
      total += entry?.quantity * entry?.itemData.price;
   }
   return total;
}
export async function getTotalItems() {
   const basketData = (await localforage.getItem("basketData")) as II_Basket_Data;
   if(basketData == null) return 0;
   let total = 0;
   for (const key of basketData.keys()) {
      const entry = basketData.get(key);
      if (entry == null) throw Error("Null element in database getTotal function");
      total += entry?.quantity; 
   }
   return total;

}

export async function getQuantity(id : string) {
   const basketData = (await localforage.getItem("basketData")) as II_Basket_Data;

   return basketData.get(id)?.quantity;


}

export async function getBasket() {
   const basket = await localforage.getItem("basketData") as II_Basket_Data;
   if (basket == null) return await setBasket(); 
   return basket;

}

export async function removeItem(key: string) {
   const basket = await getBasket();
   if(!basket?.delete(key)) throw Error("The key doesn't exist or wasn't deleted");

   await localforage.setItem("basketData", basket);
}

