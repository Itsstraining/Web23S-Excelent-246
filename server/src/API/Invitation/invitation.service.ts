import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InvitationModel } from 'src/Models/invitation.model';
import { Invitation, InvitationDocument } from 'src/schema/invitation.schema';
import { FileService } from '../file/file.service';

@Injectable()
export class InvitationService {

    constructor(@InjectModel(Invitation.name) private invitationModel: Model<InvitationDocument>,  private fileService: FileService,) { }


    async send(invitation: Invitation, idReceiver: string) {
        if(invitation.to == idReceiver) {
            return{
                message: 'The user is already a member of the file',
            }
        }
        let createdInvitation = new this.invitationModel(invitation);
        console.log(createdInvitation);
        return await createdInvitation.save();
    }

    async getInvitations(id: string) {
        return await this.invitationModel.find({to: id});
    }


    async acceptInvitation(idFile: string, idReceiver: string, idInvitation: string, invitation: InvitationModel) {
        let file = await this.fileService.getById(idFile);
            file.members.push(idReceiver);
        await this.fileService.update(idFile,file);
        await this.invitationModel.findOneAndUpdate({id: idInvitation}, {status: 'accepted'}, {new: true});
    }

    async rejectInvitation(idInvitation: string) {
        return await this.invitationModel.findOneAndUpdate({id: idInvitation}, {status: 'rejected'});
    }
}



