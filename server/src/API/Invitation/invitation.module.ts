import { Module } from '@nestjs/common';
import { InvitationController } from './invitation.controller';
import { InvitationService } from './invitation.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Invitation, InvitationSchema } from 'src/schema/invitation.schema';
import { FileService } from '../file/file.service';
// import { FileService } from '../File/file.service'

@Module({
  imports:[
    MongooseModule.forFeature([{ name: Invitation.name, schema: InvitationSchema }]),
  ],

  controllers: [InvitationController],
  providers: [InvitationService, FileService],

})
export class InvitationModule {

}
