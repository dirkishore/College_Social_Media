import React from "react";
import PlacementOfficerProfileBar from "../../components/PlacementOfficerComponents/PlacementOfficerProfilebar/PlacementOfficerProfileBar";
import PlacementOfficerWritepad from "../../components/PlacementOfficerComponents/PlacementOfficerWritepad/PlacementOfficerWritepad";
import Topbar from "../../components/Topbar/Topbar";
import WriteArticle from "../../components/WriteArticlePage/WriteArticle";

export default function PlacementOfficerHomePage({ placementOfficerDetails }) {
  return (
    <div className="placementOfficerHome">
      <Topbar placementOfficerDetails={placementOfficerDetails} />
      <PlacementOfficerProfileBar
        placementOfficerDetails={placementOfficerDetails}
      />
      <PlacementOfficerWritepad
        placementOfficerDetails={placementOfficerDetails}
      />
    </div>
  );
}
