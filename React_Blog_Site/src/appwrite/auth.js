import conf from "../conf/conf";

import {Client , Account , ID } from "appwrite";

export class authService {
    Client = new Client();
    account;

    constructor(){
        this.Client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.Client);
    }

    // ACCOUNT CREATION METHOD

    async createAccount({email , password , name}){
        try {
            const userAccount = await this.account.create(ID.unique() , email , password , name);
            if(userAccount){
                //call another method
                return this.login({email , password});
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    // ACCOUNT LOGIN METHOD

    async login({email , password}) {
        try {
            return await this.account.createEmailSession(email , password);
        } catch (error) {
            throw error;
        }
    }

    // CURRENT STATUS IS_LOGIN OR NOT METHOD 

    async getCurrentUser () {
        try{
            return await this.account.get();
        }catch (error){
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }

        return null;
    }


    // ACCOUNT LOGOUT METHOD

    async logout () {
        try{
            await this.account.deleteSessions();
        }catch (error){
            console.log("Appwrite service :: error", error);

        }
    }



}

const authService = new authService();

export default authService;