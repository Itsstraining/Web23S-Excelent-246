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
        let file = await this.fileService.getById(invitation.fileId);
        let index = file.members.findIndex((ele) => ele == idReceiver);
        if(index == -1){
            let createdInvitation = new this.invitationModel(invitation);
            console.log(createdInvitation);
            return await createdInvitation.save();
        }else{
            return;
        }
        
    }

    async getInvitations(id: string) : Promise<Invitation[]>{
        let result = await this.invitationModel.find({to: id});
        return result as Invitation[];
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



