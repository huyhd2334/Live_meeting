import MainNavigator from "@/components/cpMainNavigator/MainNavigator";
import SideBarRAG from "@/components/cpRAG/SideBarRAG";
import ChatSiteRAG from "@/components/cpRAG/ChatSiteRAG";

import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { toast } from "sonner";

const PageRAG = () => {
  const { workspace_id, project_id } = useParams();

  const location = useLocation();
  const attachments = location.state?.attachments || [];

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
        />
        <ChatSiteRAG />
      </div>
    </div>
  );
};

export default PageRAG;