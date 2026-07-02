import MainNavigator from "@/components/cpMainNavigator/MainNavigator";
import SideBarRAG from "@/components/cpRAG/SideBarRAG.jsx";
import ChatSiteRAG from "@/components/cpRAG/ChatSiteRAG.jsx";

import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { useChat } from "@/hooks/useChat.js";

const PageRAG = () => {
  console.log("PageRAG render");
  const { workspace_id, project_id } = useParams();
  const {fetchConversations} = useChat()
  const [conversations, setConversations] = useState([])

  const location = useLocation();
  const attachments = location.state?.attachments || [];
 
  const [selectedFiles, setSelectedFiles] = useState([])
  const [selectedConversation, setSelectedConversation] = useState(null)

  useEffect(() => {
    console.log("MOUNT OK:", { project_id, workspace_id });

    if (workspace_id && project_id) {
      toast.info(`workspace: ${workspace_id}, project: ${project_id}`);
    }
  }, []);

  useEffect(() => {
      const handleFetchConversations = async() => {
      const res = await fetchConversations({workspace_id});
      setConversations(res);
      console.log("Conversations: ", res)
      };
      handleFetchConversations();
  }, []);

  return (
    <div>
      <MainNavigator />
      <div className="flex flex-row">
        <SideBarRAG
          project_id={project_id}
          workspace_id={workspace_id}
          attachments={attachments}
          setSelectedFiles={setSelectedFiles}
          setSelectedConversation={setSelectedConversation}
          selectedConversation={selectedConversation} 
          conversations={conversations}
        />
        <ChatSiteRAG 
          selectedFiles={selectedFiles} 
          selectedConversation={selectedConversation} 
          workspace_id={workspace_id}
          setSelectedConversation={setSelectedConversation}
          setConversations={setConversations}
          />
      </div>
    </div>
  );
};

export default PageRAG;