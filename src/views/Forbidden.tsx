import { Card } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useRoleBasedAccess } from "../contexts/rbac/RoleBasedAccessContext";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/authContext";

export default function Forbidden() {
  const { userRole, permissions, hasPermission, hasSufficientRole } = useRoleBasedAccess();
  const { user } = useContext(AuthContext);
  const [roleInfo, setRoleInfo] = useState<string | null>(null);
  const [permissionInfo, setPermissionInfo] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      // Check role level
      const requiredRole = "ADMIN";
      const hasSufficient = hasSufficientRole(requiredRole);
      
      // Check permissions
      const requiredPermission = "manage_users";
      const hasPermissionCheck = hasPermission(requiredPermission);
      
      setRoleInfo(hasSufficient ? "Sufficient role level" : "Insufficient role level");
      setPermissionInfo(hasPermissionCheck ? "Sufficient permissions" : "Missing required permission");
    }
  }, [user, hasPermission, hasSufficientRole]);

  return (
    <Card className="mt-8 p-8">
      <h1 className="text-4xl font-bold text-center text-red-600">Access Denied</h1>
      <h2 className="text-2xl text-center mb-6">You don't have permission to access this resource</h2>
      
      <div className="bg-gray-100 p-4 rounded mb-6">
        <h3 className="text-lg font-semibold mb-2">Role Information:</h3>
        <p className="mb-1"><span className="font-medium">Current Role:</span> {userRole || "Not assigned"}</p>
        <p className="mb-1"><span className="font-medium">Required Role:</span> ADMIN</p>
        <p><span className="font-medium">Status:</span> {roleInfo || "Checking..."}</p>
      </div>

      <div className="bg-gray-100 p-4 rounded mb-6">
        <h3 className="text-lg font-semibold mb-2">Permission Information:</h3>
        <p className="mb-1"><span className="font-medium">Required Permission:</span> manage_users</p>
        <p><span className="font-medium">Status:</span> {permissionInfo || "Checking..."}</p>
      </div>

      <div className="text-center">
        <h3 className="text-lg font-semibold mb-4">Available Actions:</h3>
        <div className="flex flex-col items-center space-y-2">
          <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Return to Home
          </Link>
        </div>
      </div>
    </Card>
  );
}
