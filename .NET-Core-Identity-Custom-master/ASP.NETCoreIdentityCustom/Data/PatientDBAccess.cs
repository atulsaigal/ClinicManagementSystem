using ASP.NETCoreIdentityCustom.Models;
using Microsoft.Data.SqlClient;
using System.Data;

namespace ASP.NETCoreIdentityCustom.Data
{
    public class PatientDBAccess
    {

        string connectionString = "Server=192.168.1.250\\SQL2019INT; Database=CMS_42; User Id=uttam; Password=uttam; Trusted_Connection=false; MultipleActiveResultSets=true";

        SqlConnection con = null;
        SqlCommand cmd = null;


        public PatientDBAccess()
        {
            con = new SqlConnection(connectionString);
            con.Open();
        }

        public int AddPatient(PatientModel model)
        {
            if (model.PatientId == 0)
            {
                using (con)
                {
                    SqlCommand cmd = new SqlCommand("AddNewPatient", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@CreatedAt", SqlDbType.VarChar).Value = DateTime.Now.ToString("dd/MM/yyyy | hh:mm:ss tt");
                    cmd.Parameters.AddWithValue("@PFName", model.Firstname);
                    cmd.Parameters.AddWithValue("@PLName", model.Lastname);
                    cmd.Parameters.AddWithValue("@PEmail", model.EmailID);
                    cmd.Parameters.AddWithValue("@PAddress", model.Address);
                    cmd.Parameters.AddWithValue("@Symptoms", model.Symptoms);
                    cmd.Parameters.AddWithValue("@PContactNo", model.ContactNo);
                    cmd.Parameters.AddWithValue("@PIsFollowUp", model.IsFollowUp);
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
            }
            return 1;
        }

        public int UpdatePatient(PatientModel model)
        {
            using (con)
            {
                cmd = new SqlCommand("UpdatePatient_SP", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@PID", SqlDbType.VarChar).Value = model.PatientId;

                cmd.Parameters.AddWithValue("@EditedAt", SqlDbType.VarChar).Value = DateTime.Now.ToString("dd/MM/yyyy | hh:mm:ss tt");
                cmd.Parameters.AddWithValue("@Firstname", SqlDbType.VarChar).Value = model.Firstname;
                cmd.Parameters.AddWithValue("@Lastname", SqlDbType.VarChar).Value = model.Lastname;
                cmd.Parameters.AddWithValue("@EmailId", SqlDbType.VarChar).Value = model.EmailID;
                cmd.Parameters.AddWithValue("@Address", SqlDbType.VarChar).Value = model.Address;
                cmd.Parameters.AddWithValue("@symptoms", SqlDbType.VarChar).Value = model.Symptoms;
                cmd.Parameters.AddWithValue("@ContactNo", SqlDbType.VarChar).Value = model.ContactNo;
                cmd.Parameters.AddWithValue("@IsFollowUp", SqlDbType.VarChar).Value = model.IsFollowUp;

                cmd.ExecuteNonQuery();
                con.Close();
            }
            return 1;
        }



        public List<PatientModel> GetPatientData(string orderby, string whereclause)
        {
            List<PatientModel> ULst = new List<PatientModel>();
            using (con)
            {
                cmd = new SqlCommand("GetPatient", con);
                cmd.Parameters.AddWithValue("@orderby", SqlDbType.VarChar).Value = orderby;
                cmd.Parameters.AddWithValue("@whereclause", SqlDbType.VarChar).Value = whereclause;
                cmd.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    PatientModel U = new PatientModel();
                    U.PatientId = Convert.ToInt32(rdr["PID"]);
                    U.Firstname = rdr["P_FName"].ToString();
                    U.Lastname = rdr["P_LName"].ToString();
                    U.EmailID = rdr["P_Email"].ToString();
                    U.Address = rdr["P_Address"].ToString();
                    U.ContactNo = rdr["P_ContactNo"].ToString();
                    U.Symptoms = rdr["Symptoms"].ToString();
                    U.IsFollowUp = Convert.ToChar(rdr["P_IsFollowUp"]);
                    ULst.Add(U);
                }
                con.Close();
            }
            return ULst;
        }

        public int DeleteRecord(PatientModel user)
        {
            if (user.PatientId != 0)
            {
                using (con)
                {
                    cmd = new SqlCommand("DeletePatient", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Id", SqlDbType.Int).Value = user.PatientId;
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
            }
            return 1;
        }

    }
}
