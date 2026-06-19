import MainNavigator from "@/components/cpMainNavigator/MainNavigator";
import SideBarRAG from "@/components/cpRAG/SideBarRAG.jsx";
import ChatSiteRAG from "@/components/cpRAG/ChatSiteRAG.jsx";

import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { toast } from "sonner";

const PageRAG = () => {
  const { workspace_id, project_id } = useParams();

  const location = useLocation();
  const attachments = location.state?.attachments || [];
 
  const [selectedFiles, setSelectedFiles] = useState([])
  const [selectedConversations, setSelectedConversations] = useState([])
  
  useEffect(() => {
    console.log("MOUNT OK:", { project_id, workspace_id });

    if (workspace_id && project_id) {
      toast.info(`workspace: ${workspace_id}, project: ${project_id}`);
    }
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
          setSelectedConversations={setSelectedConversations}
        />
        <ChatSiteRAG 
          selectedFiles={selectedFiles} 
          selectedConversations={selectedConversations} 
          workspace_id={workspace_id}
          setSelectedConversations={setSelectedConversations}
          />
      </div>
    </div>
  );
};

export default PageRAG;