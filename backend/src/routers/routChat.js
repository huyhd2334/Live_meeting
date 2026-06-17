import express from 'express';
import { getConversationsController, getMessagesController } from '../controller/chatController.js';

const chatRouter = express.Router();

chatRouter.get('/messages/:conversation_id/:workspace_id', getMessagesController);
chatRouter.get('/conversations/:workspace_id',getConversationsController);
chatRouter.post('/send-message/:conversation_id/:workspace_id')

export default chatRouter;