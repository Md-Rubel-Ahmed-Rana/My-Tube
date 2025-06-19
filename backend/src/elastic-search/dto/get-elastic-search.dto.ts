export class GetElasticSearchDto {
  id: string;
  title: string;
  description: string;
  tags: string[];

  constructor(id: string, title: string, description: string, tags: string[]) {
    (this.id = id), (this.title = title), (this.description = description);
    this.tags = tags;
  }
}
