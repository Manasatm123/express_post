import { Router } from "express";

import * as rh from './requesthandler.js'
import Auth from "./middleware/Auth.js";


const router=Router();
router.route('/adduser').post(rh.adduser)
router.route('/login').post(rh.login)
router.route('/getUser').get(Auth,rh.getUser)
router.route('/getuserdata').get(Auth,rh.getuserdata)
router.route('/addpost').post(Auth,rh.addPost)
router.route('/showPost/:id').get(rh.showPost)
router.route('/update/:id').put(Auth,rh.update)
router.route('/deleteUser/:id').delete(rh.deleteUser)
router.route('/deletepost/:id').delete(rh.deletepost)




export default router;