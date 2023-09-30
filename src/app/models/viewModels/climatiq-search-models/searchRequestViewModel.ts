export class SearchRequestViewModel {
   region: string;
   year: string;
   sector: string;
   category: string;

   constructor() {
      this.region = '';
      this.year = '';
      this.sector = '';
      this.category = '';
   }
}
