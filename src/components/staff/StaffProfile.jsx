import { useNavigate } from "react-router-dom";
import { useStaff } from "../../contexts/StaffContext.jsx";

function StaffProfile() {
  const navigate = useNavigate();
  const { staff } = useStaff();

  return (
    <div className="min-h-screen bg-[#FFF5F8] flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">
        {/* Profile Image */}
        <div className="flex flex-col items-center">
          <h2 className="mt-4 text-2xl font-bold text-[#AB274F]">
            {staff.fullname}
          </h2>
        </div>

        {/* Details Section */}
        <div className="mt-6 space-y-4">
          <div className="bg-[#FFF0F4] p-4 rounded-lg">
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium text-gray-800">{staff.email}</p>
          </div>

          <div className="bg-[#FFF0F4] p-4 rounded-lg">
            <p className="text-sm text-gray-500">Role</p>
            <p className="font-medium text-gray-800">Staff Member</p>
          </div>
        </div>

        {/* Go to Dashboard Button */}
        <button
          onClick={() => navigate("/staff-dashboard")}
          className="w-full mt-6 py-3 rounded-xl 
          bg-[#AB274F] 
          hover:bg-[#8e1f42] 
          text-white font-semibold tracking-wide 
          transition-all duration-300 
          shadow-md hover:shadow-[#AB274F]/40 
          hover:scale-[1.02]"
        >
          Go to Dashboard
        </button>

        {/* to see all the data enterd by students  */}
        <button
          onClick={() => navigate("/staff-total-data")}
          className="w-full mt-6 py-3 rounded-xl 
          bg-[#AB274F] 
          hover:bg-[#8e1f42] 
          text-white font-semibold tracking-wide 
          transition-all duration-300 
          shadow-md hover:shadow-[#AB274F]/40 
          hover:scale-[1.02]"
        >
          Today's Total Data
        </button>

        <button
          onClick={() => navigate("/change-staff-password")}
          className="w-full mt-6 py-3 rounded-xl 
          bg-[#AB274F] 
          hover:bg-[#8e1f42] 
          text-white font-semibold tracking-wide 
          transition-all duration-300 
          shadow-md hover:shadow-[#AB274F]/40 
          hover:scale-[1.02]"
        >
          change Password
        </button>

        <button
          onClick={() => navigate("/staff-update-profile")}
          className="w-full mt-6 py-3 rounded-xl 
          bg-[#AB274F] 
          hover:bg-[#8e1f42] 
          text-white font-semibold tracking-wide 
          transition-all duration-300 
          shadow-md hover:shadow-[#AB274F]/40 
          hover:scale-[1.02]"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
}

export default StaffProfile;
