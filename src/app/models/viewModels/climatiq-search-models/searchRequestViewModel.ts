export class SearchRequestViewModel {
   id: string;
   region: string;
   year: string;
   sector: string;
   category: string;

   constructor(region: string, year: string, sector: string, category: string) {
      this.region = region;
      this.year = year;
      this.sector = sector;
      this.category = category;
      this.id = `climatiqSearch:region:${region}~year:${year}~sector:${sector}~category:${category}`;
   }

}
