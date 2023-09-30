export class SearchRequestViewModel {
   region: string;
   year: string;
   sector: string;
   category: string;

   constructor(region: string, year: string, sector: string, category: string) {
      this.region = region;
      this.year = year;
      this.sector = sector;
      this.category = category;
   }

}
