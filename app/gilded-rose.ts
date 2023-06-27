// export class Item {
//   name: string;
//   sellIn: number;
//   quality: number;

//   constructor(name, sellIn, quality) {
//     this.name = name;
//     this.sellIn = sellIn;
//     this.quality = quality;
//   }
// }

// export class GildedRose {
//   items: Array<Item>;

//   constructor(items = [] as Array<Item>) {
//     this.items = items;
//   }

//   updateQuality() {
//     for (let i = 0; i < this.items.length; i++) {
//       if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
//         if (this.items[i].quality > 0) {
//           if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
//             this.items[i].quality = this.items[i].quality - 1
//           }
//         }
//       } else {
//         if (this.items[i].quality < 50) {
//           this.items[i].quality = this.items[i].quality + 1
//           if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
//             if (this.items[i].sellIn < 11) {
//               if (this.items[i].quality < 50) {
//                 this.items[i].quality = this.items[i].quality + 1
//               }
//             }
//             if (this.items[i].sellIn < 6) {
//               if (this.items[i].quality < 50) {
//                 this.items[i].quality = this.items[i].quality + 1
//               }
//             }
//           }
//         }
//       }
//       if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
//         this.items[i].sellIn = this.items[i].sellIn - 1;
//       }
//       if (this.items[i].sellIn < 0) {
//         if (this.items[i].name != 'Aged Brie') {
//           if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
//             if (this.items[i].quality > 0) {
//               if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
//                 this.items[i].quality = this.items[i].quality - 1
//               }
//             }
//           } else {
//             this.items[i].quality = this.items[i].quality - this.items[i].quality
//           }
//         } else {
//           if (this.items[i].quality < 50) {
//             this.items[i].quality = this.items[i].quality + 1
//           }
//         }
//       }
//     }

//     return this.items;
//   }
// }





// Dat fiind faptul ca existau forate multe if-uri care se subordonau ,am ales sa folosesc switch case
//pentru a face codul de mai sus mult mai usor de inteles, respectand cateva caracteristici de baza
//ale clean code-ului:
// 1. Nume semnificative: Variabilele și metodele sunt denumite într-un mod intuitiv și sugestibil.
// 2. Funcțiile scurte și simple: Metodele sunt relativ scurte și se concentrează pe un singur scop
// 3. Evitarea duplicării (Principiul DRY, adica Don't Repeat Yourself): Unele fragmente de cod duplicat au
// fost eliminate prin folosirea buclelor.
// 4. Adaugarea comentariilor relevante pentru anumite sectiuni din cod.

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Item[];

  constructor(items: Item[] = []) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      const { name, sellIn, quality } = item;

      // Se verificam tipul elementului și se actualizam calitatea și vânzarea lui.
      switch (name) {
        case 'Aged Brie':
          if (quality < 50) {
            item.quality++;
          }
          break;

        case 'Backstage passes to a TAFKAL80ETC concert':
          // Pentru Backstage passes, crestem calitatea dacă este sub 50.
          if (quality < 50) {
            item.quality++;

            if (sellIn < 11 && quality < 50) {
              item.quality++;
            }
            if (sellIn < 6 && quality < 50) {
              item.quality++;
            }
          }

          // Daca evenimentul s-a încheiat, calitatea este 0
          if (sellIn < 0) {
            item.quality = 0;
          }
          break;

        case 'Sulfuras, Hand of Ragnaros':
          break;

        default:
          // Pentru toate celelalte elemente,calitatea scade daca aceasta este mai mare decât 0
          if (quality > 0) {
            item.quality--;
          }

          // Daca perioada de vanzare a trecut , calitatea elementului scade
          if (sellIn < 0 && quality > 0) {
            item.quality--;
          }
          break;
      }

      // Diminuam perioada de vânzare a elementelor, cu exceptia Sulfuras, Hand of Ragnaros
      if (name !== 'Sulfuras, Hand of Ragnaros') {
        item.sellIn--;
      }
    }

    return this.items;
  }
}
