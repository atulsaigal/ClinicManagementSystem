using ASP.NETCoreIdentityCustom.Models;
using Microsoft.Data.SqlClient;
using System.Data;

namespace ASP.NETCoreIdentityCustom.Data
{
    public class DBAccessLayer
    {

        string connectionString = "Server=192.168.1.250\\SQL2019INT; Database=CMS_42; User Id=uttam; Password=uttam; Trusted_Connection=false; MultipleActiveResultSets=true";

        SqlConnection con = null;
        SqlCommand cmd = null;
        public DBAccessLayer()
        {
            con = new SqlConnection(connectionString);
            con.Open();

        }

        public void AddData(UserManagementModel model)
        {
            using (con)
            {
                SqlCommand cmd = new SqlCommand("AddNewUser", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@FirstName", model.FirstName);
                cmd.Parameters.AddWithValue("@LastName", model.LastName);
                cmd.Parameters.AddWithValue("@EmailId", model.Email);
                cmd.Parameters.AddWithValue("@Password", model.Password);
                cmd.Parameters.AddWithValue("@UserRole", model.UserRole);
                cmd.Parameters.AddWithValue("@IsActive", 'Y');


                cmd.ExecuteNonQuery();
                con.Close();
            }
        }

        public List<UserManagementModel> GetUserData(string orderby, string whereclause)
        {
            List<UserManagementModel> lstUser = new List<UserManagementModel>();

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                cmd = new SqlCommand("GetUserRecords", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("orderby", SqlDbType.VarChar).Value = orderby;
                cmd.Parameters.AddWithValue("whereclause", SqlDbType.VarChar).Value = whereclause;
                con.Open();
                SqlDataReader sdr = cmd.ExecuteReader();
                while (sdr.Read())
                {
                    UserManagementModel U = new UserManagementModel();
                    U.UID = Convert.ToInt32(sdr["UID"]);
                    U.FirstName = sdr["FirstName"].ToString();
                    U.LastName = sdr["LastName"].ToString();
                    U.Email = sdr["Email"].ToString();
                    U.UserRole = Convert.ToChar(sdr["UserRole"]);
                    U.IsActive = Convert.ToChar(sdr["IsActive"]);
                    lstUser.Add(U);


                }
                con.Close();
            }
            return lstUser;
        }

        public int UpdateUserStatus(UserManagementModel UM)
        {
            if (UM.UID != 0)
            {
                using (con)
                {
                    cmd = new SqlCommand("UpdateUserStatus_SP", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Id", SqlDbType.Int).Value = UM.UID;
                    cmd.Parameters.AddWithValue("@Status", SqlDbType.Char).Value = UM.IsActive;
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
            }
            return 1;
        }

        public void UpdateData(UserManagementModel model)
        {
            using (con)
            {
                SqlCommand cmd = new SqlCommand("UpdateRecord_SP", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Id", model.UID);
                cmd.Parameters.AddWithValue("@FirstName", model.FirstName);
                cmd.Parameters.AddWithValue("@LastName", model.LastName);
                cmd.Parameters.AddWithValue("@Email", model.Email);
                cmd.Parameters.AddWithValue("@Role", model.UserRole);


                cmd.ExecuteNonQuery();
                con.Close();
            }


        }

        public int Login(UserManagementModel uM)
        {
            using (con)
            {
                SqlCommand cmd = new SqlCommand("LoginUser_Sp", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@Email", SqlDbType.VarChar).Value = uM.Email;
                cmd.Parameters.Add("@Password", SqlDbType.VarChar).Value = uM.Password;
                SqlParameter oblogin = new SqlParameter("@IsValid", SqlDbType.Int);
                oblogin.Direction = ParameterDirection.Output;
                cmd.Parameters.Add(oblogin);
                oblogin.ParameterName = "@Isvalid";
                cmd.ExecuteNonQuery();
                int res = (int)cmd.Parameters["@return"].Value;
                con.Close();
                return res;
            }
        }

    }
}
