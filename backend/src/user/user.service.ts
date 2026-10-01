import { InjectModel} from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";

import { User,UserDocument,UserSchema } from "./schema/user.schema";

@Injectable()
export class userService{
    constructor(
        @InjectModel(User.name)
        private usermodel : Model<UserDocument>
    ){}
    
    async create(userData : Partial<User>){
        const user = new this.usermodel(userData);
        return user.save();
    }

   async findbyEmail(email : string){
      return this.usermodel.findOne({email});
   }

}

