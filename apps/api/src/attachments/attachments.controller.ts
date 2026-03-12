import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AttachmentsService } from './attachments.service';

@UseGuards(JwtAuthGuard)
@Controller('attachments')
export class AttachmentsController {
  constructor(private readonly attachmentsService: AttachmentsService) {}

  @Post('tasks/:taskId')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueName = `${Date.now()}-${file.originalname}`;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  uploadAttachment(
    @Param('taskId') taskId: string,
    @UploadedFile() file: Express.Multer.File,
    @Req() req,
  ) {
    return this.attachmentsService.uploadAttachment(taskId, file, req.user.id);
  }

  @Get('tasks/:taskId')
  getTaskAttachments(@Param('taskId') taskId: string) {
    return this.attachmentsService.getTaskAttachments(taskId);
  }

  @Delete(':id')
  deleteAttachment(@Param('id') id: string) {
    return this.attachmentsService.deleteAttachment(id);
  }
}
