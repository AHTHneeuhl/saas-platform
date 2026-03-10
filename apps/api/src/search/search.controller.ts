import { Controller, Get, Query } from '@nestjs/common';
import { SearchDto } from './dto/search.dto';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}

  @Get('/projects')
  searchProjects(@Query() dto: SearchDto, @Query('orgId') orgId: string) {
    return this.searchService.searchProjects(
      orgId,
      dto.query,
      dto.page ?? 1,
      dto.limit ?? 10,
    );
  }

  @Get('/tasks')
  searchTasks(@Query() dto: SearchDto, @Query('orgId') orgId: string) {
    return this.searchService.searchTasks(
      orgId,
      dto.query,
      dto.page ?? 1,
      dto.limit ?? 10,
    );
  }

  @Get('/comments')
  searchComments(@Query() dto: SearchDto, @Query('orgId') orgId: string) {
    return this.searchService.searchComments(
      orgId,
      dto.query,
      dto.page ?? 1,
      dto.limit ?? 10,
    );
  }
}
