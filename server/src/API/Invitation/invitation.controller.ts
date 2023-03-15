import { InvitationService } from './invitation.service';
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Invitation } from 'src/schema/invitation.schema';
// import { FileModel } from 'src/Models/file.model';

@Controller('invitation')
export class InvitationController {

    constructor(private invitationService: InvitationService) {}


    @Post('send/:id')
    send(@Body() invitation: Invitation, @Param('id') idReceiver: string) {
        return this.invitationService.send(invitation, idReceiver);
    }

    @Get('get/:id')
    getInvitations(@Param('id') idReceiver: string){
        return this.invitationService.getInvitations(idReceiver);
    }

    @Put('accept/:idFile/:idReceiver/:idInvitation')
    acceptInvitation(@Param('idFile') idFile: string, @Param('idReceiver') idReceiver: string, @Param('idInvitation') idInvitation: string, @Body() invitation: Invitation) {
       return this.invitationService.acceptInvitation(idFile, idReceiver, idInvitation, invitation);
    }

    @Put('reject/:idInvitation')
    rejectInvitation(@Param('idInvitation') idInvitation: string) {
        return this.invitationService.rejectInvitation(idInvitation);
    }

}
