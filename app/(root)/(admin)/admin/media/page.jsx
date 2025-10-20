import React from "react";
import BreadCrumb from "@/components/Application/Admin/BreadCrumb";
import UploadMedia from "@/components/Application/Admin/UploadMedia";
import { ADMIN_DASHBOARD } from "@/routes/AdminPanelRoute";

const breadcrumbData = [
  { href: ADMIN_DASHBOARD, label: "Home" },
  { href: "", label: "Media" },
];

const MediaPage = () => {
  return (
    <div className="space-y-4">
      <BreadCrumb breadcrumbData={breadcrumbData} />
      <div className="bg-white dark:bg-neutral-900 p-4 rounded-xl shadow-sm">
        <UploadMedia />
      </div>
    </div>
  );
};

export default MediaPage;
