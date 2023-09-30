import { Guid } from "guid-typescript";

export class SearchRequestViewModel {
    id: string;
   region: string;
   year: string;
   sector: string;
   category: string;

   constructor(region: string, year: string, sector: string, category: string) {
      this.id = `climatiqSearch${Guid.create().toString()}`;
      this.region = region;
      this.year = year;
      this.sector = sector;
      this.category = category;
   }

}
